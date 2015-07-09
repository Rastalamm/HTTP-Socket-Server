var net = require('net');
var source = require('./sources');
var PORT = 8080;
var HOST = '0.0.0.0';
var STATUS_OK = 200;
var STATUS_NO_CHANGE = 304;
var STATUS_NOT_FOUND = 400;
var SERVER_NAME = 'Always A Box';
var serverTime = new Date(); //numbers format

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


function headerBuilder (data){




}

function bodyBuilder (data){

}



function dataListener(socket){

  socket.on('data', function(data){

    var reg1 = /^\w+/g;
    var firstWord = reg1.exec(data);

    var dataArr = data.split(' ');
    var dateTime = new Date();


    var reg2 = /(If-Modified-Since): (\w+, \d{1,2} \w{3} \d{4} \d{1,2}:\d{1,2}:\d{1,2} \w{3})/g;

    var modifiedIf = reg2.exec(data);
    var modDate = Date.parse(modifiedIf[2]);



    //unsure how modified since data comes in, numbers or string number date combo
    // need to add to if statement below the check the date

    if(!modifiedIf && (dateTime-modDate) > 0){

      switch(firstWord[0]) {
        case 'GET':
          switch (dataArr[1]){
            case '/':
              socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.home.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
              socket.write('\n\n' + source.home);
            break;

            case '/hydrogen.html':
              socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.hydrogen.length + '\n' + 'Connection: ' + 'keep-alive');
              socket.write('\n\n' + source.hydrogen);
            break;

            case '/helium.html':
              socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.helium.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
              socket.write('\n\n' + source.helium);
            break;

            case '/404.html':
              socket.write('HTTP/1.01 ' + STATUS_NOT_FOUND + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.fourOfour.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
              socket.write('\n\n' + source.fourOfour);
            break;

            case '/css/styles.css':
              socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.styles.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
              socket.write('\n\n' + source.styles);
            break;
          }
        break;

        case 'HEAD':
          switch (dataArr[1]){
            case '/':
              socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.home.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
            break;

            case '/hydrogen.html':
              socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.hydrogen.length + '\n' + 'Connection: ' + 'keep-alive');
            break;

            case '/helium.html':
              socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.helium.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
            break;

            case '/404.html':
              socket.write('HTTP/1.01 ' + STATUS_NOT_FOUND + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.fourOfour.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
            break;

            case '/css/styles.css':
              socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.styles.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
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
    }else{
      //no change to info, they only get body
      switch (dataArr[1]){
        case '/':
          socket.write('HTTP/1.01 ' + STATUS_NO_CHANGE + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString()  + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.home.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
        break;

        case '/hydrogen.html':
          socket.write('HTTP/1.01 ' + STATUS_NO_CHANGE + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.hydrogen.length + '\n' + 'Connection: ' + 'keep-alive');
        break;

        case '/helium.html':
          socket.write('HTTP/1.01 ' + STATUS_NO_CHANGE + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.helium.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
        break;

        case '/404.html':
          socket.write('HTTP/1.01 ' + STATUS_NOT_FOUND + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.fourOfour.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
        break;

        case '/css/styles.css':
          socket.write('HTTP/1.01 ' + STATUS_NO_CHANGE + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + dateTime.toUTCString() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + source.styles.length + '\n' + 'Connection: ' + 'keep-alive' + '\n');
        break;
      }

    }

    socket.end();
  });
}