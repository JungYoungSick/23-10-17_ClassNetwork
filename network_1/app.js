const http = require('http')
const fs = require('fs');

const server = http.createServer((req,res) => {
  function serverErrorLog(){
    res.writeHead(500);
    return res.end('서버에 문제가 생겼습니다.');
  }
  console.log("어떤 요청이 들어오는지 확인", "url ->",req.url,"method ->", req.method);
  //라우팅처리 제작 두개의 요청 데이터를 확인해야 한다.
  // 1. 요청 url
  // 2. 요청 메서드
if(req.url === '/' && req.method === 'GET'){
  fs.readFile('./static.index.html', 'utf8', (err,data) => {
    if(err) {
    serverErrorLog();
    }
    res.writeHead(200,{'comtent-type':'text/html'});
    res.end(data);
  });
}else if(req.url === '/css/style.css' && req.method === 'GET') {
  fs.readFile('./static/css/style.css','utf8',(ree,data) => {
    if(err) {
      serverErrorLog();
    }
    res.writeHead(200,{'content-type':'text/css'});
    res.end(data);
  });
}else if(req.url === './js/index.js' && req.method === "GET") {
  fs.readFile('./static/js/index.js','utf8', (err,data) => {
    if(err) {
      serverErrorLog();
    }
    res.writeHead(200,{'content-type':'application/javacript'});
    res.end(data);
  });
}else{
  res.writeHead(404);
  res.end('not Found');
  }
});