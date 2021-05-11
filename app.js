let express = require("express"); //express를 요청하면 함수값이 반환된다. 
let app = express(); //이런식으로 사용한다.
let path = require('path');

//할것  DB연동, 

app.set('view engine', 'jade');
app.set('views', './views');
app.locals.pretty = true;

let db = require('mysql');

const conn = db.createConnection({  // mysql 접속 설정
  host: '175.115.144.55',
  port: 3306,
  user: 'psj',
  password: '123456',
  database: 'coupang'
});
 
conn.query('SELECT * FROM user', function (error, results, fields) {
  if (error){
      console.log(error);
  }
  console.log(results);
});
 
conn.end();
 

app.use(express.static(path.join(__dirname,'public')));
//*****************html, css, js, 이미지 파일 등은 public폴더 안에 있는 폴더에 각각 넣고 경로지정하면 될듯.****************

//get은 라우터이다. 라우터는 들어온 요청이 길을 찾게 해주는 것이다.
//길을 찾게해주는 과정을 라우팅이라고 부른다. 
//밑에 코드는 '/'이 url로 접속한다면 res.send를 실행하겠다는 뜻이다. 응답하겠다는뜻이다.
app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/public/html/login.html");
});

//로그인이니까 post방식으로 바꿔야함 html파일도 
app.get('/login',(req,res)=>{
    res.send("<p>login Success!</p>");//이런식으로 태그로 생성할 수도 있다.
})
app.listen(3000, ()=> console.log('3000 port!'));//3000포트를 리슨하게 하는것이다.

app.get('/join.html', (req, res) =>{
    res.sendFile(__dirname+"/public/html/join.html")
})

// 승준 페이지 테스트 중
app.get('/jun', (req, res) => {
  res.render('jun');
})