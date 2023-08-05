//db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'admin',
  password: 'mzw72099027',
  database: 'PetCommunity'
});

connection.connect();

module.exports = connection;
