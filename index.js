var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Ball = require('./game_objects/ball').Ball;
var Player = require('./game_objects/player.js').Player;
//test
const areaHeight = 660, areaWidth = 940, playerSize = 10, ballSize = 5, goalWidth = 240;

var gameData = {
  area: {
    size: {
      width: areaWidth,
      height: areaHeight
    },
    goals: [
      {
        teamId: 0,
        end: "left",
        size: goalWidth,
      },
      {
        teamId: 1,
        end: "right",
        size: goalWidth,
      }
    ]
  },
  ball: {
    size: ballSize,
    pos: {
      x: areaWidth/2,
      y: areaHeight/2
    },
    color: '#000000'
  },
  teams: [
    {
      id: 0,
      name: 'Junttaajat',
      color: '#00ff00',
      players: [
        // game area 900x660
        { id: 11, name: "Ndumiso Nkadimeng", pos: { x: areaWidth/4, y: 1*areaHeight/6 }, },
        { id: 12, name: "Emlyn Hukkes", pos: { x: areaWidth/4, y: 2*areaHeight/6 } },
        { id: 13, name: "Sossermaster", pos: { x: areaWidth/4, y: 3*areaHeight/6 } },
        { id: 14, name: "Player 4a", pos: { x: areaWidth/4, y: 4*areaHeight/6 } },
        { id: 15, name: "Player 5a", pos: { x: areaWidth/4, y: 5*areaHeight/6 } },
      ]
    },
    {
      id: 1,
      name: 'Sandibar',
      color: '#ff0000',
      players: [
        { id: 21, name: "Player 1b", pos: { x: 3*areaWidth/4, y: 1*areaHeight/6 } },
        { id: 22, name: "Player 2b", pos: { x: 3*areaWidth/4, y: 2*areaHeight/6 } },
        { id: 23, name: "Player 3b", pos: { x: 3*areaWidth/4, y: 3*areaHeight/6 } },
        { id: 24, name: "Player 4b", pos: { x: 3*areaWidth/4, y: 4*areaHeight/6 } },
        { id: 25, name: "Player 5b", pos: { x: 3*areaWidth/4, y: 5*areaHeight/6 } },
      ]
    }
  ]
};

const players = [];

gameData.teams.forEach(team => {
  team.players.forEach(player => {
    players.push(new Player(player.id, player.id[0], player.name, player.pos, 33, 33, 33));
  });
});

setInterval(() => {
  io.emit('new positions', JSON.stringify(gameData.teams));
  io.emit('ball data', JSON.stringify(gameData.ball));
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
