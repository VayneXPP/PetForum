// postModel.js
const connection = require('../database/db.js');

exports.createPost = (userId, title, content) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO Posts (userId, title, content) VALUES (?, ?, ?)';
    connection.query(query, [userId, title, content], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
};

exports.getPosts = (offset, pageSize) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Posts ORDER BY created_at DESC LIMIT ?, ?`;
    connection.query(query, [offset, pageSize], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
