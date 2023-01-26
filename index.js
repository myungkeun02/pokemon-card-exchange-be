require('dotenv').config();
const express = require('express');
const bodyParser = require('body-Parser')
const maria = require('./database/connect/mariadb')
const app = express()
const db = maria.connect();
const jwt = require('./jwt');
const session = require('express-session');

app.use((bodyParser).json())


//로그인
app.post('/', function (req, res) {
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

//회원가입
app.post('/qwe', function (req, res) {
  let user_id = req.body.user_id;
  let user_pw = req.body.user_pw;
  let nickname = req.body.nickname;
  let phone = req.body.phone;

  const sql = "INSERT INTO user (user_id, user_pw, nickname, phone) VALUES (?,?,?,?);"

  if (user_id && user_pw && nickname && phone) {
      maria.query(sql, [user_id, user_pw, nickname, phone], function(err, rows, fields) { 
         if(err) {
          console.log("회원가입실패")
         }else {
          console.log("회원가입성공")
         }
      });
  } else {
  console.log("아이디 비밀번호 닉네임 휴대폰번호 입력 실패")    
  }
});

// id 중복확인

app.post('/',function (req,res){

})


app.listen(3000)
