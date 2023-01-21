const express = require('express');
const bodyParser = require('body-Parser')
const maria = require('./database/connect/mariadb')
const app = express()
const db = maria.connect();
const jwt = require('./utils/jwt');
app.use((bodyParser).json())

app.post('/login_process', function (req, res) {
  let user_id = req.body.user_id;
  let user_pw = req.body.user_pw;
  const sql = "SELECT * FROM user WHERE user_id = ? AND user_pw = ?"

  if (user_id && user_pw) {
      maria.query(sql, [user_id, user_pw], function(err, rows, fields) {
         if(err) {
          console.log("로그인 실패")
         }else {
          console.log("로그인 성공")
          const accessToken = jwt.sign(user_id);
         }
      });
  } else {
  console.log("아이디 비밀번호 입력 실패")    
  }
});


app.listen(3000)
