// postController.js
const postModel = require('../models/postModel.js');

exports.createPost = async (req, res) => {
  const userId = req.user.userID;
  const { title, content } = req.body;

  try {
    const postId = await postModel.createPost(userId, title, content);
    res.json({ success: true, message: 'Post created successfully', postId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 8;
  const offset = (page - 1) * pageSize;

  try {
    const posts = await postModel.getPosts(offset, pageSize);
    res.json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
