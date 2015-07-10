var net = require('net');
var PORT = 8080;
var HOST = '0.0.0.0';

//Const: .30
//Kawika: .3
//Dan: .6
//Jason: .23
//Judah: .24

var client = net.connect({host : HOST, port : PORT}, connectedToServer);

var requestURL;
var header;
var date;
var contentType;
var contentLength;
var connection;
var statusCode;
var requestType = 'GET';
var theUri;

function connectedToServer(){

  requestURL = process.argv[process.argv.length-1];

  console.log(requestURL);

    var uriReg = /\/[^:\/\/www](([A-z0-9\-\%]+\/)*[A-z0-9\-\%]+)?/gm;
console.log(uriReg);
    theUri = uriReg.exec(requestURL);

    console.log(theUri);
  function uriCreator (requestURL){


  }


  function createHeader () {


    client.write(header)

  }

  client.on('data', readsincoming)


  function readsincoming() {

  }






}








  // process.stdin.pipe(socket);

  // socket.on('data', function(data){
  //   process.stdout.write(data);
  // })