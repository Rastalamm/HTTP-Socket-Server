var net = require('net');
var PORT = 8080;
var HOST = '0.0.0.0';
var STATUS_OK = 200;
var SERVER_NAME = 'Always A Box';

var server = net.createServer(onConnect);

server.listen(PORT, HOST, function() {
  process.stdout.write('Server Listening on ' + HOST + ':' + PORT + '\n');
});


function onConnect(socket, data){
  socket.setEncoding('utf8');

  socket.write('Status: ' + STATUS_OK + ' Date: ' + Date.now() + ' Name: ' + SERVER_NAME);
  socket.end()

}

// function dataListener(socket){

//   socket.on('data', function(data){

//     if(clientConnectedList[socket.remotePort].username === null){
//       userNameCheck(socket, data);
//     }else{
//       autoRemove(socket, data)
//       // writeMessages(socket, data);
//     }
//   })

//   socket.on('end', function(data){
//    userExits(socket);
//   });
// }