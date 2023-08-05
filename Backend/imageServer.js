const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// 将你的图片路径设置为静态文件夹
app.use(express.static('D:/Projects/PetForum/Backend/avatars'));

app.get('/', (req, res) => {
  res.send('Image Server is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
