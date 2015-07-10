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

var header;
var date;
var contentType;
var contentLength;
var connection;
var statusCode;
var methodInput;
var requestMethod;
var theUri;
var requestURL = process.argv[process.argv.length-1];
var clientInput = process.argv;



function connectedToServer(){


  //Gets the method client requested
  getsMethodInput(clientInput)

  //sets the method in the header
  setsMethod (methodInput)

  //Gets the URI from the client input
  uriCreator(requestURL);

  //
  createHeader();
  client.write(header)

  client.on('data', readsincoming)

}

function readsincoming(data) {
  process.stdout.write(data);
  //console.log(data);
}

function uriCreator (requestURL){
  console.log(requestURL)
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


function getsMethodInput(clientInput) {

  var methodInputReg = /\-[a-zA-Z]{1}\b/g;
  var methodInputprocess =  methodInputReg.exec(clientInput);

  if(methodInputprocess){
    methodInput = methodInputprocess[0].charAt(1);
  }else{
    //sets the default request type
    methodInput = 'G'
  }

}

function setsMethod (methodInput){

  switch(methodInput){

    case 'I':
    case 'i':
      requestMethod = 'HEAD';
    break;

    case 'H':
    case 'h':
      requestMethod = 'HEAD';
    break;


    case 'G':
    case 'g':
      requestMethod = 'GET';
    default:

  }
}










  // process.stdin.pipe(socket);

  // socket.on('data', function(data){
  //   process.stdout.write(data);
  // })