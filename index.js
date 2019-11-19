var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var gameData = {
  area: {
    size: {
      width: 900,
      height: 660
    }
  },
  teams: [
    {
      name: 'Junttaajat',
      color: '#00ff00',
      players: [
        // game area 900x660
        { id: 1, name: "Player 1a", pos: { x: 225, y: 110 } },
        { id: 2, name: "Player 2a", pos: { x: 225, y: 220 } },
        { id: 3, name: "Player 3a", pos: { x: 225, y: 330 } },
        { id: 4, name: "Player 4a", pos: { x: 225, y: 440 } },
        { id: 5, name: "Player 5a", pos: { x: 225, y: 550 } },
      ]
    },
    {
      name: 'Sandibar',
      color: '#ff0000',
      players: [
        { id: 11, name: "Player 1b", pos: { x: 675, y: 110 } },
        { id: 12, name: "Player 2b", pos: { x: 675, y: 220 } },
        { id: 13, name: "Player 3b", pos: { x: 675, y: 330 } },
        { id: 14, name: "Player 4b", pos: { x: 675, y: 440 } },
        { id: 15, name: "Player 5b", pos: { x: 675, y: 550 } },
      ]
    }
  ]
};

setInterval(() => {
  io.emit('new positions', JSON.stringify(gameData.teams));
}, 1000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user sonnested');
  socket.emit('area data', JSON.stringify(gameData.area));
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
