// postController.js
const postModel = require('../models/postModel.js');


exports.createPost = async (req, res) => {
    const userId = req.user.userID;
    const { title, content } = req.body;
    const imageName = req.file ? req.file.filename : null;  // Get the uploaded file name
  
    try {
      const postId = await postModel.createPost(userId, title, content, imageName); // Pass the image name to the model
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
