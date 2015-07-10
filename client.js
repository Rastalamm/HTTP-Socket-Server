var net = require('net');
var PORT = 8080;
var HOST = '0.0.0.0';

//Const: .30
//Kawika: .3
//Dan: .6
//Jason: .23
//Judah: .24

var client = net.connect({host : HOST, port : PORT}, connectedToServer);

var httpVersion = 'HTTP/1.1';
var requestURL;
var header;
var date;
var contentType;
var contentLength;
var connection;
var statusCode;
var requestMethod = 'HEAD';
var theUri;

function connectedToServer(){

  requestURL = process.argv[process.argv.length-1];

  console.log(requestURL);

  //Grabs the URI from the input
  uriCreator(requestURL);
  createHeader();
  client.write(header)

  client.on('data', readsincoming)
}
  function readsincoming(data) {
    process.stdout.write(data);
    //console.log(data);
  }

  function uriCreator (requestURL){
    var uriReg = /\/[^:\/\/www](([A-z0-9\-\%]+\/)*[A-z0-9\-\%]+)?/gm;
    var uriProcess = uriReg.exec(requestURL);

    if(!uriProcess){
      theUri = '/'
    }else{
      theUri = uriProcess[0];
    }
  }

  function createHeader () {
    header = requestMethod + ' ' + theUri +' ' +httpVersion;
  }












  // process.stdin.pipe(socket);

  // socket.on('data', function(data){
  //   process.stdout.write(data);
  // })