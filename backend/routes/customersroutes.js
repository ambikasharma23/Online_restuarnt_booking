const express = require('express'); 
const { registerUser, loginUser, registerUserValidator,loginUserValidator, } = require('../controllers/customerscontroller');
const router = express.Router();
const verifyToken = require('../middleware/authmiddleware'); // Uncomment this line
// const { protectedRouteHandler } = require('../controllers/protectedController');

// router.get('/protected-route', verifyToken, protectedRouteHandler);

router.post('/signup', registerUserValidator, registerUser);
router.post('/signin',loginUserValidator, loginUser);

module.exports = router;
