var net = require('net');
var source = require('./sources');
var PORT = 8080;
var HOST = '0.0.0.0';
var STATUS_OK = 200;
var STATUS_NOT_FOUND = 400;
var SERVER_NAME = 'Always A Box';

var server = net.createServer(onConnect);

server.listen(PORT, function() {
  process.stdout.write('Server Listening on ' + HOST + ':' + PORT + '\n');
});


function onConnect(socket){
  socket.setEncoding('utf8');

  //socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + Date.now() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + 'INSERT LENGTH HERE' + '\n' + 'Connection: ' + 'keep-alive' + '\n');


  dataListener(socket)

  // socket.end()

}

function dataListener(socket){

  socket.on('data', function(data){

    var reg1 = /^\w+/g;
    var firstWord = reg1.exec(data);

    var dataArr = data.split(' ');
    var dateTime = new Date();

    console.log();

    switch(firstWord[0]) {
      case 'GET':
        switch (dataArr[1]){
          case '/':
            socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.home.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
            socket.write('\n\n' + source.home);
          break;

          case '/hydrogen.html':
            socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.hydrogen.length + '\n' + 'Connection: ' + 'keep-alive');
            socket.write('\n\n' + source.hydrogen);
          break;

          case '/helium.html':
            socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.helium.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
            socket.write('\n\n' + source.helium);
          break;

          case '/404.html':
            socket.write('HTTP/1.01 ' + STATUS_NOT_FOUND + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.fourOfour.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
            socket.write('\n\n' + source.fourOfour);
          break;

          case '/css/styles.css':
            socket.write('HTTP/1.01 ' + STATUS_NOT_FOUND + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.styles.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
            socket.write('\n\n' + source.styles);
          break;
        }
      break;

      case 'HEAD':
        switch (dataArr[1]){
          case '/':
            socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.home.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
          break;

          case '/hydrogen.html':
            socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.hydrogen.length + '\n' + 'Connection: ' + 'keep-alive');
          break;

          case '/helium.html':
            socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.helium.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
          break;

          case '/404.html':
            socket.write('HTTP/1.01 ' + STATUS_NOT_FOUND + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.fourOfour.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
          break;

          case '/css/styles.css':
            socket.write('HTTP/1.01 ' + STATUS_NOT_FOUND + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.styles.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
          break;
        }
      break;

      case 'POST':
        //'I want to send you data';
      break;

      case 'PUT':
        //'I want to change a resource';
      break;

      case 'DELETE':
        //'I want to delete a resource';
      break;

      case 'OPTIONS':
        //'What methods can I use?'
      break;
      default:
        //'Default message'
      break;
    }
    socket.end();
  });
}