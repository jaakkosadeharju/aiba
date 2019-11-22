class GameClock {
  constructor() {
    this.baseTime = 0; // ms
    this.startTime = null;
    this.lastCalculationTime = 0;
  }

  getTime() {
    return this.gameTime + this.runningTime();
  }

  // set calculation time and get time delta 
  getFrame() {
    let dt = Date.now() - this.lastCalculationTime; 
    this.lastCalculationTime = Date.now();
    return dt;
  }

  start() {
    this.startTime = Date.now(); // Time since epoch in ms
  }

  stop() {
    this.gameTime = this.gameTime + (Date.now() - this.startTime);
    this.startTime = null;
  }

  state() {
    return (this.startTime ? 'running' : 'stopped');
  }

  // time in ms since the last starting
  runningTime() {
    return Date.now() - (this.startTime || 0);
  }
}

exports.GameClock = GameClock;
