var net = require('net');
var source = require('./sources');
var PORT = 8080;
var HOST = '0.0.0.0';
var STATUS_OK = 200;
var STATUS_NO_CHANGE = 304;
var STATUS_NOT_FOUND = 404;
var SERVER_NAME = 'A Box';
var serverTime = new Date(); //numbers format

var server = net.createServer(onConnect);

var resourceList = {
  '/' : source.home,
  '/hydrogen.html' : source.hydrogen,
  '/helium.html': source.helium,
  '/404.html': source.fourOfour,
  '/css/styles.css': source.styles
}

var status;
var server;
var date;
var contentType;
var contentLength;
var connection;
var statusCode;
var requestType;
var theUri;
var header;
var bodyMessage;
var modifiedDateRequest;
var resourceLength;

server.listen(PORT, function() {
  process.stdout.write('Server Listening on ' + HOST + ':' + PORT + '\n');
});


function onConnect(socket){
  socket.setEncoding('utf8');
  console.log('you have a new connection');
  dataListener(socket)
}

function dataListener(socket){

  socket.on('data', function(data){

    readInput(data);
    requestReader(data, requestType, theUri);

    if(header){
      socket.write(header);
    }
    if(bodyMessage){
      socket.write(bodyMessage);
    }

    socket.end();
  });
}


function readInput(data){

  console.log(data);

  var reg1 = /^\w+/g;
  var firstWord = reg1.exec(data);
  requestType = firstWord[0];



  var dataArray = data.split(' ');
  theUri = dataArray[1];

  var reg2 = /(If-Modified-Since): (\w+, \d{1,2} \w{3} \d{4} \d{1,2}:\d{1,2}:\d{1,2} \w{3})/g;
  var modifiedIf = reg2.exec(data);

  if(modifiedIf){
    modifiedDateRequest = Date.parse(modifiedIf[2]);
  }

}

function requestReader(data, requestType, theUri){
  if(checkFourOFour(theUri)){
    modifiedFilter(data, theUri, modifiedDateRequest)
  };

  switch (requestType){

    case 'GET':
      headerBuildWrite(data, theUri);
      bodyBuildWrite(data, theUri);
    break;

    case 'HEAD':
      headerBuildWrite(data, theUri);
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
}

function headerBuildWrite (data, theUri){
  var dateTime = new Date();

  if(resourceList[theUri]){
    resourceLength = resourceList[theUri].length;
  }else{
    resourceLength = 0;
  }


  status = 'HTTP/1.1 ' + statusCode + '\n';
  server = 'Server: ' + SERVER_NAME + '\n';
  date = 'Date: ' + dateTime.toUTCString() + '\n';
  //if they are looking for css make it text/css
  //contentType = 'Content-Type: ' + 'text/html; charset=utf-8' + '\n';
  contentLength = 'Content Length: ' + resourceLength + '\n';
  connection = 'Connection: ' + 'keep-alive';

  header = status + server + date + contentType + contentLength + connection;

}

function bodyBuildWrite (data, theUri){

  var resourceCheck;

  if(!resourceList.hasOwnProperty(theUri)){

    resourceCheck = resourceList['/404.html'];
  }else{
    resourceCheck = resourceList[theUri];
  }

  bodyMessage = '\n\n' + resourceCheck;
}

function checkFourOFour (theUri){
  if(!resourceList.hasOwnProperty(theUri)){
    statusCode = STATUS_NOT_FOUND;
    resourceLength = 0;
    return false;
  }else{
    return true;
  }
}

function modifiedFilter(data, theUri, modifiedDateRequest){

  //there is a request for modified
  if(modifiedDateRequest){
    //if servertime is > date on modified request
    if(serverTime - modifiedDateRequest > 0){
      statusCode = STATUS_NO_CHANGE;
      resourceLength = resourceList[theUri].length
    }else{
      //if they want a new copy they go here
      statusCode = STATUS_OK;
      resourceLength = resourceList[theUri].length
    }
  }else{
  //no modified request
    statusCode = STATUS_OK;
    resourceLength = resourceList[theUri].length
  }

}