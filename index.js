var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Ball = require('./game_objects/ball').Ball;
var Team = require('./game_objects/team.js').Team;
var Player = require('./game_objects/player.js').Player;
var Position = require('./game_objects/position.js').Position;
var GameClock = require('./game_objects/game_clock.js').GameClock;

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

var ball = new Ball(ballSize, new Position(areaWidth/2, areaHeight/2), 0, 0, '#000000', gameArea);

var gameData = {
  clock: new GameClock(),
  area: gameArea,
  ball: ball,
  teams: [
    new Team({
      id: 1,
      name: 'Junttaajat',
      color: '#00ff00',
      players: [
        // game area 900x660
        new Player({id: 11, name: "Ndumiso Nkadimeng", size: playerSize, position: new Position(areaWidth/4, 1*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea, ball }),
        new Player({id: 12, name: "Emlyn Hukkes", size: playerSize, position: new Position(areaWidth/4, 2*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea, ball }),
        new Player({id: 13, name: "Sossermaster", size: playerSize, position: new Position(areaWidth/4, 3*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea, ball }),
        new Player({id: 14, name: "Player 4a", size: playerSize, position: new Position(areaWidth/4, 4*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea, ball }),
        new Player({id: 15, name: "Player 5a", size: playerSize, position: new Position(areaWidth/4, 5*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea, ball }),
      ]
    }),
    new Team({
      id: 2,
      name: 'Sandibar',
      color: '#ff0000',
      players: [
        new Player({id: 21, name: "Player 1b", size: playerSize, position: new Position(3*areaWidth/4, 1*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea, ball }),
        new Player({id: 22, name: "Player 2b", size: playerSize, position: new Position(3*areaWidth/4, 2*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea, ball }),
        new Player({id: 23, name: "Player 3b", size: playerSize, position: new Position(3*areaWidth/4, 3*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea, ball }),
        new Player({id: 24, name: "Player 4b", size: playerSize, position: new Position(3*areaWidth/4, 4*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea, ball }),
        new Player({id: 25, name: "Player 5b", size: playerSize, position: new Position(3*areaWidth/4, 5*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea, ball }),
      ]
    })
  ]
};


// TODO: start when both player ready
gameData.clock.start();

setInterval(() => {
  const dt = gameData.clock.getFrame();

  // Move each player
  gameData.teams.forEach(team =>
    team.players.forEach(player =>
      player.move(dt, { force: Math.random()*30, direction: Math.random()*2*Math.PI })));

  // Get closest player to the ball
  // this supports more than two teams!
  const closestByTeam = gameData.teams.map(team => team.closestPlayer(ball.position));
  const closestPlayer = closestByTeam.sort((p1, p2) => 
    p1.position.distanceTo(ball.position) < p2.position.distanceTo(ball.position) ? -1 : 1
  )[0];

  // Move the ball
  ball.move(dt, closestPlayer);

  // this.position = new Position(this.controlledBy.position.x + (this.size+this.controlledBy.size)/2, this.controlledBy.position.y);

  io.emit('new positions', JSON.stringify({
    teams: gameData.teams.map(team => ({
      ...team,
      players: team.players.map(player => ({
        position: player.position
      }))
    })),
    ball: {
      position: gameData.ball.position,
      color: gameData.ball.color,
      size: gameData.ball.size
    }
  }));
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
