const {Customer}  = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const verifyToken= require('../middleware/authmiddleware');

const { body,validationResult } = require('express-validator');

const registerUserValidator = [
  // Validate name field
  body('name')
    .notEmpty()
    .withMessage('Name is required'),

  // Validate email field
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  // Validate password field
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await Customer.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Customer.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    console.log(name, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  
const loginUserValidator = [
  // Validate email field
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  // Validate password field
  body('password')
  .notEmpty()
  .withMessage('Password is required')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long')
];

// Your registerUser function remains the same

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await Customer.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        email: user.email,
        password: user.password,
      },
      customer: {
        customer_id: user.id,
        customer_name: user.name
      },
      meta: {
        "AccessToken": token,
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {registerUserValidator,registerUser,loginUserValidator, loginUser};
