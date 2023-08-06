// post.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js'); // 注意适当的路径
const authenticate = require('../middlewares/authMiddleware'); // 根据实际路径更改

router.post('/create', authenticate, postController.createPost);
router.get('/browse', postController.getPosts);

module.exports = router;

