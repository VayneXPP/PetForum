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

// 获取帖子并分页
router.get('/browse', async (req, res) => {
    const page = parseInt(req.query.page) || 1;  // 如果没有提供page参数，默认为1
    const pageSize = 8;  // 修改每页显示的帖子数量为8

    // 计算需要跳过的帖子数量
    const offset = (page - 1) * pageSize;
  
    const query = `SELECT * FROM Posts ORDER BY created_at DESC LIMIT ?, ?`;
    connection.query(query, [offset, pageSize], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      res.json({ success: true, posts: results });
    });
  });
  

// 导出路由器
module.exports = router;

