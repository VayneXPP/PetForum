const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth.js'); // 注意适当的路径
const postRoutes = require('./routes/post.js'); // 注意适当的路径

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('D:\\Projects\\PetForum\\Backend\\uploads'));

app.use('/auth', authRoutes); // 使用 auth 路由
app.use('/posts', postRoutes); // 使用 posts 路由

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
