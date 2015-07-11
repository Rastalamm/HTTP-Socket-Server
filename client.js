var net = require('net');
var source = require('./sources');
var PORT = 8080;
var HOST = '0.0.0.0';

//Const: .30
//Kawika: .3
//Dan: .6
//Jason: .23
//Judah: .24

if(process.argv.length < 3){
  process.stdout.write('You enetered it wrong');
  process.exit();
};

var portSelected = portChecker(process.argv);
var hostSelected = hostCreator(process.argv);

var client = net.connect({host : hostSelected, port : portSelected}, connectedToServer);

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



//Error if host cannot be reached
client.on('error', function(e){

  switch(e.message){

    case 'ECONNREFUSED':
      process.stdout.write('connection refused' + e);
    break;

    case 'EADDRNOTAVAIL':
      process.stdout.write('Wrong port guy' + e);
    break;

    default:
      process.stdout.write('This is the error' + e);
    break;
  };
  process.exit();

})

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

function hostCreator (input){

  var hostStripper = input.join(' ');
  var hostCheckReg = /(www.\w+.\w+)|(localhost)/g;
  var hostCheckProcess = hostCheckReg.exec(hostStripper);

  if(hostCheckProcess){
    hostSelected = hostCheckProcess[0];
  }else{
    process.stdout.write('bad host');
    process.exit();
  }

  return hostSelected;
}

function connectedToServer(){




  //Gets the method client requested
  getsMethodInput(clientInput);

  //sets the method in the header
  setsMethod (methodInput)

  //Gets the URI from the client input
  uriCreator(requestURL);

  //
  createHeader();
  client.write(header)

  client.on('data', readsincoming)

}

//Check the info being passed in - if its not a proper header, fail it
function checkForHeader (data) {
  data.toString();

  var dataStripper = /^(http)|(HTTP)/g;
  var dataProcess = dataStripper.exec(data);

  if(dataProcess[0] !== 'HTTP'){
    process.stdout.write('Invalid header being returned');
  }else{
    process.stdout.write(data)
  }
}


function readsincoming(data) {
  checkForHeader (data)
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


function getsMethodInput(clientInput) {

  var methodStripper = clientInput.join(' ')

  var methodInputReg = /\s\-([a-zA-Z]{1,4})\b/g;
  var methodInputprocess =  methodInputReg.exec(methodStripper);


  if(methodInputprocess){

    methodInput = methodInputprocess[1];
  }else{
    //sets the default request type
    methodInput = 'G'
  }
}

function setsMethod (methodInput){

  switch(methodInput){

    case 'HELP':
    case 'help':
      process.stdout.write('You need help \n i & h for HEAD \n g for GET \n p for POST');
      process.exit();
    break;

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

    case 'P':
    case 'p':
      requestMethod = 'POST';
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