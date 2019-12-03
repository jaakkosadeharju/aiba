var GameClock = require('./game_clock.js').GameClock;

class GameLogic {
    constructor(gameData, periods, periodLenght) {
        this.gameData = gameData;
        this.periods = periods;
        this.periodLenght = periodLenght;
        this.gameState = GameState.Init;
    }

    get scores() {
        let scores = new Map();
        this.gameData.teams.forEach(team => {
            scores.set(team, team.score);
        });
        return scores;
      }

    resetPositions() {
        this.gameData.ball.resetPosition();
        this.gameData.teams.forEach(team =>
            team.players.forEach(player =>
              player.resetPosition()
            )
        );
    }

    start() {
        this.gameData.clock.start();
    }

    stop() {
        this.gameData.clock.stop();
    }

    scoreGoal(team) {
        team.score += 1;
        return this.scores;
    }
}

const GameState = {
    Init: 0,
    GameOn: 10,
    Paused: 20,
    End: 30
}

  exports.GameLogic = GameLogic;
  