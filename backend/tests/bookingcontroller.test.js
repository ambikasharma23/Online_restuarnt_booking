
const { registerUser } = require('../controllers/customerscontroller');
const { Customer } = require('../models');
const bcrypt = require('bcrypt');

// Mock bcrypt.hash
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

// Mock Customer model methods
jest.mock('../backend/models', () => {
  const actualCustomer = jest.requireActual('../backend/models');
  return {
    ...actualCustomer,
    Customer: {
      ...actualCustomer.Customer,
      findOne: jest.fn(),
      create: jest.fn(),
    },
  };
});

// Define the test cases
describe('registerUser', () => {
  // Test case for successful user registration
  it('should register a new user', async () => {
    // Arrange
    const req = {
      body: {
        name: 'name1',
        email: 'name1@gmail.com',
        password: '1234'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const hashedPassword = 'hashedPassword123'; // Manually set hashed password
    Customer.findOne.mockResolvedValue(null); // Assume no existing user
    bcrypt.hash.mockResolvedValue(hashedPassword); // Mock bcrypt.hash to return hashed password

    // Act
    await registerUser(req, res);

    // Assert
    expect(Customer.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
    expect(Customer.create).toHaveBeenCalledWith({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully', user: undefined });
  });

  // Test case for existing email
  it('should return error if email is already in use', async () => {
    // Arrange
    const req = {
      body: {
        name: 'name1',
        email: 'name1@gmail.com',
        password: '1234'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Customer.findOne.mockResolvedValue({ email: req.body.email }); // Assume existing user

    // Act
    await registerUser(req, res);

    // Assert
    expect(Customer.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email is already in use' });
  });
});



