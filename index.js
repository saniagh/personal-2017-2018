const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use('/public', express.static(__dirname + '/res/index'));
app.use('/public', express.static(__dirname + '/public'));

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/res' + '/index' + '/index.html');
});

server.listen(8080);
