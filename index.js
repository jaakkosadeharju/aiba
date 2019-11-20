var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Ball = require('./game_objects/ball').Ball;
var Team = require('./game_objects/team.js').Team;
var Player = require('./game_objects/player.js').Player;
var Position = require('./game_objects/position.js').Position;

const areaHeight = 660, areaWidth = 940, playerSize = 10, ballSize = 5, goalWidth = 240;

var gameArea = {
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
};

var gameData = {
  area: gameArea,
  ball: {
    size: ballSize,
    pos: {
      x: areaWidth/2,
      y: areaHeight/2
    },
    color: '#000000'
  },
  teams: [
    new Team({
      id: 1,
      name: 'Junttaajat',
      color: '#00ff00',
      players: [
        // game area 900x660
        new Player({id: 11, name: "Ndumiso Nkadimeng", position: new Position(areaWidth/4, 1*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 12, name: "Emlyn Hukkes", position: new Position(areaWidth/4, 2*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 13, name: "Sossermaster", position: new Position(areaWidth/4, 3*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 14, name: "Player 4a", position: new Position(areaWidth/4, 4*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 15, name: "Player 5a", position: new Position(areaWidth/4, 5*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
      ]
    }),
    new Team({
      id: 2,
      name: 'Sandibar',
      color: '#ff0000',
      players: [
        new Player({id: 21, name: "Player 1b", position: new Position(3*areaWidth/4, 1*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 22, name: "Player 2b", position: new Position(3*areaWidth/4, 2*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 23, name: "Player 3b", position: new Position(3*areaWidth/4, 3*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 24, name: "Player 4b", position: new Position(3*areaWidth/4, 4*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 25, name: "Player 5b", position: new Position(3*areaWidth/4, 5*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
      ]
    })
  ]
};

setInterval(() => {
  // Move each player
  gameData.teams.forEach(team =>
    team.players.forEach(player =>
      player.move(10)));
  
  io.emit('new positions', JSON.stringify(gameData.teams));
  io.emit('ball data', JSON.stringify(gameData.ball));
}, 100);

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
