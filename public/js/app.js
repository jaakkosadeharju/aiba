// AI Ball
let gameData = {
  teams: [],
  area: {
    size: {
      height: 0,
      width: 0
    },
    goals: []
  },
  ball: {
    size: 0,
    position: { x: 0, y: 0 },
    color: '#000000'
  },
  clock: null
};
const socket = io();
const canvas = document.getElementById('game-area');
const ctx = canvas.getContext('2d');

// convert from game area position to canvas position
const toCanvasX = x => ((canvas.width - 40) * (x / (gameData.area.size.width))) + 20;
const toCanvasY = y => canvas.height * (y / gameData.area.size.height);

const updateCanvas = () => {
  // clear canvas
  ctx.clearRect(toCanvasX(0) - 20, toCanvasY(0), toCanvasX(gameData.area.size.width) + 40, toCanvasY(gameData.area.size.height));
  ctx.beginPath();
  ctx.rect(toCanvasX(0), toCanvasY(0), toCanvasX(gameData.area.size.width - 20), toCanvasY(gameData.area.size.height));
  ctx.stroke();

  // draw goals
  gameData.area.goals.forEach(goal => {
    ctx.beginPath();
    ctx.moveTo(toCanvasX(goal.sides.left), toCanvasY(goal.sides.top));
    ctx.lineTo(toCanvasX(goal.sides.right), toCanvasY(goal.sides.top));
    ctx.lineTo(toCanvasX(goal.sides.right), toCanvasY(goal.sides.bottom));
    ctx.lineTo(toCanvasX(goal.sides.left), toCanvasY(goal.sides.bottom));
    ctx.lineTo(toCanvasX(goal.sides.left), toCanvasY(goal.sides.top));
    ctx.stroke();
  });

  // draw players
  gameData.teams.forEach(team => {
    team.players.forEach(player => {
      ctx.beginPath();
      ctx.arc(toCanvasX(player.position.x), toCanvasY(player.position.y), player.size, 0, 2 * Math.PI);
      ctx.fillStyle = team.color;
      ctx.fill();
    });
  });

  // draw ball
  ctx.beginPath();
  ctx.arc(toCanvasX(gameData.ball.position.x), toCanvasY(gameData.ball.position.y), gameData.ball.size, 0, 2 * Math.PI);
  ctx.fillStyle = gameData.ball.color;
  ctx.fill();

};

// update canvas when server sends new positions
socket.on('new positions', function (positions) {
  var positionData = JSON.parse(positions);
  gameData.teams = positionData.teams;
  gameData.ball = positionData.ball;

  document.getElementById('team1-name').innerHTML = gameData.teams[0].name + " " + gameData.teams[0].score;
  document.getElementById('team2-name').innerHTML = gameData.teams[1].name + " " + gameData.teams[1].score;
  document.getElementById('game-time').innerHTML = gameData.time;
  updateCanvas();
});

socket.on('area data', function (area) {
  gameData.area = JSON.parse(area);
});

updateCanvas();