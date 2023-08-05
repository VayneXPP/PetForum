// imageServer.js
const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// 将你的头像图片路径和post图片路径设置为静态文件夹
app.use('/avatars', express.static('D:/Projects/PetForum/Backend/avatars'));
app.use('/postImages', express.static('D:/Projects/PetForum/Backend/postImages'));

app.get('/', (req, res) => {
  res.send('Image Server is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
