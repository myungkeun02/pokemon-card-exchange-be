const maria= require('mysql');
const conn = maria.createConnection({
  host     : 'localhost',
  user     : 'audrms',
  password : 'yss00407209',
  database : 'pokemon'
});
module.exports = conn;