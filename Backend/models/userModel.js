// userModel.js
const connection = require('../database/db.js');

exports.getUserByPhoneAndPassword = (phone, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM Users WHERE phone = ? AND password = ?',
      [phone, password],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

exports.checkPhoneExists = (phone) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM Users WHERE phone = ?',
      [phone],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length > 0);
        }
      }
    );
  });
};

exports.createUser = (phone, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO Users (phone, password) VALUES (?, ?)',
      [phone, password],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};
