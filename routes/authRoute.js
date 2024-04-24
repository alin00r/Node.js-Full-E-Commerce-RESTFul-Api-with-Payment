const express = require('express');
const {
  signupValidator,
  loginValidator,
} = require('../utils/validators/authValidator');
const {
  signup,
  login,
  logout,
  forgotPassword,
  verifyPasswordResetCode,
  resetPassword,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPasswordResetCode);
router.put('/resetPassword', resetPassword);

module.exports = router;
