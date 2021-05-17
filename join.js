const express = require("express"); //express를 요청하면 함수값이 반환된다. 
const router = express.Router();
const mysql = require("mysql");

let client = mysql.createConnection({  // mysql 접속 설정
  host: '192.168.35.13',
  port: 3306,
  user: 'psj',
  password: '123456',
  database: 'coupang'
});

module.exports = router;

router.get('/join', function(req, re))