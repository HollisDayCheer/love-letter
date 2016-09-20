var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

app.get('/', function(req, res){
    res.sendfile(path.join(__dirname, '../web/public/index.html'));
});

io.on('connection', function(socket){
    console.log('Got connection');
});

http.listen(3000, function(){
    console.log('listening 3000 for new sockets');
});
