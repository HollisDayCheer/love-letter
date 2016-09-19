var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

app.get('/', function(req, res){
    res.sendfile(path.join(__dirname, '../web/index.html'));
});
