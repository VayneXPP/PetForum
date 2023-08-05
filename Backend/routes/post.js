// post.js
// 引入所需的库和模块
const express = require('express');
const router = express.Router();
const connection = require('../database/db.js'); // 注意适当的路径
const authenticate = require('../middlewares/authMiddleware'); // 根据实际路径更改

// 创建帖子路由
router.post('/create', authenticate, (req, res) => {
  // 获取用户ID和帖子内容
  const userId = req.user.userID;
  const { title, content } = req.body;

  // 验证输入
//   if (!title || !content) {
//     return res.status(400).json({ success: false, message: 'Title and content are required.' });
//   }

  // 插入到数据库
  const query = 'INSERT INTO Posts (userId, title, content) VALUES (?, ?, ?)';
  connection.query(query, [userId, title, content], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    res.json({ success: true, message: 'Post created successfully', postId: results.insertId });
  });
});

// 导出路由器
module.exports = router;

