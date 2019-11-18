var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var gameData = {
  area: {
    size: {
      width: 1000,
      height: 1000
    }
  },
  teams: [
    {
      name: 'Junttaajat',
      color: '#00ff00',
      players: [
        // game area 1000x1000
        { id: 1, name: "Player 1a", pos: { x: 250, y: 300 } },
        { id: 2, name: "Player 2a", pos: { x: 250, y: 400 } },
        { id: 3, name: "Player 3a", pos: { x: 250, y: 500 } },
        { id: 4, name: "Player 4a", pos: { x: 250, y: 600 } },
        { id: 5, name: "Player 5a", pos: { x: 250, y: 700 } },
      ]
    },
    {
      name: 'Sandibar',
      color: '#ff0000',
      players: [
        { id: 11, name: "Player 1b", pos: { x: 750, y: 300 } },
        { id: 12, name: "Player 2b", pos: { x: 750, y: 400 } },
        { id: 13, name: "Player 3b", pos: { x: 750, y: 500 } },
        { id: 14, name: "Player 4b", pos: { x: 750, y: 600 } },
        { id: 15, name: "Player 5b", pos: { x: 750, y: 700 } },
      ]
    }
  ]
};

setInterval(() => {
  io.emit('new positions', JSON.stringify(gameData.teams));
}, 1000);

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
