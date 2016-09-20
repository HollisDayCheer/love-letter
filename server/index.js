var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

app.get('/', function(req, res){
    res.sendfile(path.join(__dirname, '../web/index.html'));
});

app.use(express.static(path.join(__dirname, '../web')))

io.on('connection', function(socket){
    console.log('Got connection');
    socket.on('client_emit', console.log);
});

http.listen(3000, function(){
    console.log('listening 3000 for new sockets');
});
