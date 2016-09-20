console.log("hello world!");
var socket = io();
socket.emit('client_emit', 'hello world');
