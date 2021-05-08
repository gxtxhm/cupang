let express = require("express"); //express를 요청하면 함수값이 반환된다. 
let app = express(); //이런식으로 사용한다.


//get은 라우터이다. 라우터는 들어온 요청이 길을 찾게 해주는 것이다.
//길을 찾게해주는 과정을 라우팅이라고 부른다. 
//밑에 코드는 '/'이 url로 접속한다면 res.send를 실행하겠다는 뜻이다. 응답하겠다는뜻이다.
app.get('/', (req, res)=>{

    res.send('Hello Home Page');
});

app.get('/login',(req,res)=>{
    res.send("<p>i'm surrounded p tag!</p>");//이런식으로 태그로 생성할 수도 있다.
})
app.listen(3000, ()=> console.log('3000 port!'));//3000포트를 리슨하게 하는것이다.