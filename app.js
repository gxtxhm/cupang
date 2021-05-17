let express = require("express"); //express를 요청하면 함수값이 반환된다. 
let app = express(); //이런식으로 사용한다.
let path = require('path');
let db = require('mysql');
let msg = require ('dialog')//경고창 띄워주는 모듈
const session = require('express-session');//세션모듈연결
let bodyParser = require("body-parser");
//할것  DB연동, 

app.set('view engine', 'jade');
app.set('views', './views');
app.locals.pretty = true;


app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret :'asdjha!@#@#$dd',
    resave:false,
    saveUninitialized:true
    }))


const conn = db.createConnection({  // mysql 접속 설정
  host: '192.168.35.13',
  port: 3306,
  user: 'psj',
  password: '123456',
  database: 'coupang'
});
 
conn.query('SELECT * FROM user', function (error, results, fields) {
  if (error){
      console.log(error);
  }
  else{
  console.log(results);
  console.log("DB 연결");
  }
});
 

app.use(express.static(path.join(__dirname,'public')));
//*****************html, css, js, 이미지 파일 등은 public폴더 안에 있는 폴더에 각각 넣고 경로지정하면 될듯.****************

//get은 라우터이다. 라우터는 들어온 요청이 길을 찾게 해주는 것이다.
//길을 찾게해주는 과정을 라우팅이라고 부른다. 
//밑에 코드는 '/'이 url로 접속한다면 res.send를 실행하겠다는 뜻이다. 응답하겠다는뜻이다.
app.get('/', (req, res)=>{
  res.render('home');
});
app.get('/login',(req,res)=>{//메인페이지에서 로그인 버튼눌렀을때
  res.sendFile(path.join(__dirname, 'public/html/login.html'),{user_Id : req.session.Id}, (err) => {//세션값추가
    if (err) {
        res.status(500).send('Internal server error!');
        console.log(err);
    }
})
})
//로그인이니까 post방식으로 바꿔야함 html파일도 
app.post('/login',(req,res)=>{
  let Id= req.body.userId;
  let Pw = req.body.password;

  conn.query('SELECT * FROM user where id=? and password=?',[Id,Pw],(err,result)=>{

      
    if (err){
        res.status(500).send('Internal server error!');
        console.log(error);
    }
    console.log(result);
    if(result.length>0)//로그인완료되면
    {
        req.session.Id=Id;//세션값 저장
        
        return req.session.save(()=>{res.render("home");})//<- 메인페이지 연결
        
    }
    else//실패하면 로그인화면으로
    {
        msg.info ("로그인에 실패하였습니다!");  
        res.redirect("/");
    }
})
})
app.listen(3000, ()=> console.log('3000 port!'));//3000포트를 리슨하게 하는것이다.

app.get('/join.html', (req, res) =>{
    res.sendFile(__dirname+"/public/html/join.html")
})

conn.end();