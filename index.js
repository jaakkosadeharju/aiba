var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Ball = require('./game_objects/ball').Ball;
var Team = require('./game_objects/team.js').Team;
var Player = require('./game_objects/player.js').Player;
var Goal = require('./game_objects/goal.js').Goal;
var Position = require('./game_objects/position.js').Position;
var GameClock = require('./game_objects/game_clock.js').GameClock;
var GameLogic = require('./game_objects/game_logic.js').GameLogic;


const areaHeight = 660, areaWidth = 940, playerSize = 40, ballSize = 5, goalWidth = 74, goalDepth = 20;

var gameArea = {
  size: {
    width: areaWidth,
    height: areaHeight
  },
  goals: []
};

var ball = new Ball(ballSize, new Position(areaWidth/2, areaHeight/2), 0, '#000000', gameArea);

var gameData = {
  clock: new GameClock(),
  area: gameArea,
  ball: ball,
  teams: [
    new Team({
      id: 1,
      name: 'Junttaajat',
      color: '#00ff00',
      matchPlace: "home",
      players: [
        // game area 900x660
        new Player({id: 11, name: "Ndumiso Nkadimeng", size: playerSize, position: new Position(areaWidth/4, 1*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 12, name: "Emlyn Hukkes", size: playerSize, position: new Position(areaWidth/4, 2*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 13, name: "Sossermaster", size: playerSize, position: new Position(areaWidth/4, 3*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 14, name: "Player 4a", size: playerSize, position: new Position(areaWidth/4, 4*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 15, name: "Player 5a", size: playerSize, position: new Position(areaWidth/4, 5*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
      ]
    }),
    new Team({
      id: 2,
      name: 'Sandibar',
      color: '#ff0000',
      matchPlace: "away",
      players: [
        new Player({id: 21, name: "Player 1b", size: playerSize, position: new Position(3*areaWidth/4, 1*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 22, name: "Player 2b", size: playerSize, position: new Position(3*areaWidth/4, 2*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 23, name: "Player 3b", size: playerSize, position: new Position(3*areaWidth/4, 3*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 24, name: "Player 4b", size: playerSize, position: new Position(3*areaWidth/4, 4*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
        new Player({id: 25, name: "Player 5b", size: playerSize, position: new Position(3*areaWidth/4, 5*areaHeight/6), speed: 34, stamina: 33, power: 33, gameArea }),
      ]
    })
  ],
};
var gameLogic = new GameLogic(gameData, 2, 10);


//Initialize goals
gameArea.goals[0] = new Goal({team: gameData.teams[0], 
                            sides: {left: -goalDepth, bottom: (gameArea.size.height+goalWidth)/2, right: 0, top: (gameArea.size.height-goalWidth)/2}, 
                            position: {x: 0, y: gameArea.size.height/2}});
gameArea.goals[1] = new Goal({team: gameData.teams[1], 
                            sides: {left: gameArea.size.width, bottom: (gameArea.size.height+goalWidth)/2, right: gameArea.size.width+goalDepth, top: (gameArea.size.height-goalWidth)/2},
                            position: {x:gameArea.size.width, y: gameArea.size.height/2}});

setInterval(() => {
  const dt = gameData.clock.getFrame();

  // Move each player
  gameData.teams.forEach(team =>
    team.players.forEach(player =>
      player.move(dt, { force: Math.random()*30, direction: Math.random()*2*Math.PI })));

  // Get closest player to the ball
  // this supports more than two teams
  const closestByTeam = gameData.teams.map(team => team.closestPlayer(ball.position));
  const closestPlayer = closestByTeam.sort((p1, p2) => 
    p1.position.distanceTo(ball.position) <= p2.position.distanceTo(ball.position) ? -1 : 1
  )[0];

  // Move the ball
  ball.move(dt, closestPlayer, ball.direction, Math.sqrt(Math.pow(ball.speed.x, 2) + Math.pow(ball.speed.y, 2)));
  if(gameArea.goals.some(goal => goal.isInside(ball.position))) {
    let goal = gameArea.goals.find(goal => goal.isInside(ball.position));
    console.log(gameLogic.scoreGoal(goal.team));
    gameLogic.resetPositions();
  }

  io.emit('new positions', JSON.stringify({
    teams: gameData.teams.map(team => ({
      ...team,
      players: team.players.map(player => ({
        position: player.position,
        size: playerSize
      }))
    })),
    ball: {
      position: gameData.ball.position,
      color: gameData.ball.color,
      size: gameData.ball.size
    }
  }));
}, 100);

//test kicks. remove when AI's get added to players
setInterval(() => {
  const dt = gameData.clock.getFrame();
  if(ball.controlledBy != null)
    ball.controlledBy.kick(ball, dt, ball.controlledBy.position.directionTo(gameArea.goals.filter(goal => !goal.team.players.includes(ball.controlledBy))[0].position), 30);
}, 5000);

// serve static files
app.use(express.static(__dirname + '/public'));

// get index
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/front/index.html');
});

io.on('connection', function (socket) {
  console.log('a user sonnested');
  socket.emit('area data', JSON.stringify({      
    size: {
        height: gameArea.size.height,
        width: gameArea.size.width
      },
    goals: gameArea.goals.map(goal => ({
        sides: goal.sides,
        size: goalWidth
      })),
    }));
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
