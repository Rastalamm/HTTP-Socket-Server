var net = require('net');
var PORT = 8080;
var HOST = '0.0.0.0';

//Const: .30
//Kawika: .3
//Dan: .6
//Jason: .23
//Judah: .24

var portSelected = portChecker(process.argv)



var client = net.connect({host : HOST, port : portSelected}, connectedToServer);

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

//function to optionally set the port
function portChecker (input){

  var portStripper = input.join(' ');

  var portCheckReg = /port\s(\d{1,7})/g;
  var portCheckProcess = portCheckReg.exec(portStripper);

  portSelected = portCheckProcess;

  if(!portSelected){
    portSelected = PORT;
  }else{
    portSelected = portSelected[1];
  }

  return portSelected;

}





function connectedToServer(){

  //Gets the method client requested
  getsMethodInput(clientInput);

  //sets the method in the header
  setsMethod (methodInput)
  console.log('requestMethod', requestMethod)

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

  var methodStripper = clientInput.join(' ')

  var methodInputReg = /\s\-([a-zA-Z]{1})\b/g;
  var methodInputprocess =  methodInputReg.exec(methodStripper);

  if(methodInputprocess){

    methodInput = methodInputprocess[1];
  }else{
    //sets the default request type
    methodInput = 'G'
  }

}

function setsMethod (methodInput){

  console.log('methodInput',methodInput);


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
    break;

    //just in case it gets here - always send a get request
    default:
    console.log('why are you always here???');
      requestMethod = 'GET';
    break;

  }
}










  // process.stdin.pipe(socket);

  // socket.on('data', function(data){
  //   process.stdout.write(data);
  // })