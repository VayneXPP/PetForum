// authController.js
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const SECRET_KEY = 'fgOEC9QpRFOvOUYvd8ZON5d717IOopBs';

exports.login = async (req, res) => {
  const { phonenum, password } = req.body;
  
  try {
    const user = await userModel.getUserByPhoneAndPassword(phonenum, password);
    
    if (!user) {
      return res.json({ success: false, message: 'Invalid phone number or password' });
    }
    
    const avatarUrl = `http://192.168.0.40:8080/avatars/${user.avatar}`;
    const token = jwt.sign({ userID: user.userID }, SECRET_KEY);
    return res.json({ success: true, message: 'Login successful', avatar: avatarUrl, token });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  const { phonenum, password } = req.body;

  try {
    const isExists = await userModel.checkPhoneExists(phonenum);

    if (isExists) {
      return res.json({ success: false, message: 'Phone number already exists' });
    }

    await userModel.createUser(phonenum, password);
    return res.json({ success: true, message: 'Registration successful' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Registration failed' });
  }
};
