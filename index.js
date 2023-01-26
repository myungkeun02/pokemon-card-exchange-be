require('dotenv').config();
const express = require('express');
const bodyParser = require('body-Parser')
const maria = require('./database/connect/mariadb')
const app = express()
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
          const response = {
            status: 401,
            message: "실패!"
          };
          res.status(401).send(response)
         }else {
          if (rows.length > 0) {
            const accessToken = jwt.sign({"user_id" : user_id});
            const response = {
              status: 201,
              message: "데이터 로딩에 성공했습니다.",
              data: {
                token: accessToken,
                user_id: user_id
              }
            }
            res.status(201).send(response);

          } else {
            const response = {
              status: 401,
              message: "로그인 실패"
            };
            res.status(401).send(response);
          }
          
         }
      });
  } else {
    const response = {
      status: 400,
      message: "ID PW 입력실패"
    };
    res.status(400).send(response);  
  }
});

//회원가입
app.post('/qwe', function (req, res) {
  let user_id = req.body.user_id;
  let user_pw = req.body.user_pw;
  let nickname = req.body.nickname;
  let phone = req.body.phone;

  const sql = "INSERT INTO user (user_id, user_pw, nickname, phone) VALUES (?,?,?,?);"

  if (user_id.length < 8) {
    return res.send('아이디는 8글자 이상 작성해야합니다.');
  }

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


app.listen(3000)
