const { loginUser } = require('../controllers/customerscontroller');
const { Customer } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('loginUser', () => {
  // Test case for successful login
  it('should log in a user with valid credentials', async () => {
    // Arrange
    const req = {
      body: {
        email: 'name1@gmail.com',
        password: '1234',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockUser = {
      id: 1,
      name: 'name1',
      email: 'name1@gmail.com',
      password: 'hashedPassword123', // Manually set hashed password
    };
    Customer.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mocked-token');

    // Act
    await loginUser(req, res);

    // Assert
    expect(Customer.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
    expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login successful',
      user: {
        email: mockUser.email,
        password: mockUser.password, // Ensure this is what you expect
      },
      customer: {
        customer_id: mockUser.id,
        customer_name: mockUser.name,
      },
      meta: {
        AccessToken: 'mocked-token',
      },
    });
  });

  // Test case for invalid credentials
  it('should return error for invalid credentials', async () => {
    // Arrange
    const req = {
      body: {
        email: 'name1@gmail.com',
        password: 'wrongpassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Customer.findOne.mockResolvedValue(null); // Assume no user found

    // Act
    await loginUser(req, res);

    // Assert
    expect(Customer.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });

  // Test case for internal server error
  it('should handle internal server error', async () => {
    // Arrange
    const req = {
      body: {
        email: 'name1@gmail.com',
        password: '1234',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Customer.findOne.mockRejectedValueOnce(new Error('Some internal error'));

    // Act
    await loginUser(req, res);

    // Assert
    expect(Customer.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
