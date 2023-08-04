const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// 创建MySQL连接
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'admin',
  password: 'mzw72099027',
  database: 'PetCommunity'
});

// 连接到数据库
connection.connect();

app.post('/login', (req, res) => {
  const { phonenum, password } = req.body;
  console.log(phonenum);
  // 查询数据库，验证电话号码和密码
  connection.query('SELECT * FROM Users WHERE phone = ? AND password = ?', [phonenum, password], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    } else if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid phone number or password' });
    }
  });
});

app.post('/register', (req, res) => {
    const { phonenum, password } = req.body;
    console.log(phonenum)
    // 检查电话号码是否已经存在
    connection.query('SELECT * FROM Users WHERE phone = ?', [phonenum], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
        return;
      }
      
      console.log(results)
      if (results.length > 0) {
        res.json({ success: false, message: 'Phone number already exists' });
        return;
      }
  
      // 如果电话号码不存在，则插入新用户
      connection.query('INSERT INTO Users (phone, password) VALUES (?, ?)', [phonenum, password], (insertError) => {
        if (insertError) {
          console.error(insertError);
          res.status(500).json({ success: false, message: 'Registration failed' });
          return;
        }
        res.json({ success: true, message: 'Registration successful' });
      });
    });
  });
  

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
