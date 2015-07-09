var net = require('net');
var source = require('./sources');
var PORT = 8080;
var HOST = '0.0.0.0';
var STATUS_OK = 200;
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
    var firstWord = reg1.exec(data)
    console.log(firstWord[0]);
    var dataArr = data.split(' ')
    console.log(dataArr[1]);

    console.log(source.hydrogen);

    switch(firstWord[0]){


      case 'GET':

        switch (dataArr[1]){

          case '/':
          //below is the header, update the content.length
            socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + Date.now() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + 'INSERT LENGTH HERE' + '\n' + 'Connection: ' + 'keep-alive' + '\n');
            socket.write();
          break;

          case '/hydrogen.html':
          //below is the header, update the content.length
            socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + Date.now() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + 'INSERT LENGTH HERE' + '\n' + 'Connection: ' + 'keep-alive');
            //socket.write('\n\n' + '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>The Elements - Hydrogen</title> <link rel="stylesheet" href="/css/styles.css"> </head> <body> <h1>Hydrogen</h1> <h2>H</h2> <h3>Atomic number 1</h3> <p>Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the universe, constituting roughly 75% of all baryonic mass. Non-remnant stars are mainly composed of hydrogen in its plasma state. The most common isotope of hydrogen, termed protium (name rarely used, symbol 1H), has a single proton and zero neutrons.</p> <p><a href="/">back</a></p> </body> </html>');
            socket.write('\n\n' + source.hydrogen);
          break;

          case '/helium.html':
          //below is the header, update the content.length
            socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + Date.now() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + 'INSERT LENGTH HERE' + '\n' + 'Connection: ' + 'keep-alive' + '\n');
            socket.write();
          break;

          case '/404.html':
          //below is the header, update the content.length
            socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + Date.now() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + 'INSERT LENGTH HERE' + '\n' + 'Connection: ' + 'keep-alive' + '\n');
            socket.write();
          break;

          case '/css/styles.css':
            socket.write();
          break;
        }


      // break;

      // case 'POST':
      //   'I want to send you data';
      // break;

      // case 'PUT':
      //   'I want to change a resource';
      // break;

      // case 'DELETE':
      //   'I want to delete a resource';
      // break;

      // case 'HEAD':
      //   'I just want the response headers';
      // break;

      // case 'OPTIONS':
      //   'What methods can I use?'
      // break;
      // default:
      //   'Default message'
      // break;
    }

      // socket.write('HTTP/1.01 ' + STATUS_OK + ' OK' + '\n' + 'Server: ' + SERVER_NAME + '\n' + 'Date: ' + Date.now() + '\n' + 'Content-Type: ' + 'text/html; charset=utf-8' + '\n' + 'Content Length: ' + 'INSERT LENGTH HERE' + '\n' + 'Connection: ' + 'keep-alive' + '\n');

  socket.end();


  });

  // socket.on('end', function(data){
  //  // userExits(socket);
  // });
}