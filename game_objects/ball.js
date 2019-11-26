var Position = require('./position.js').Position;

class Ball {
    constructor(size, position, direction, color, gameArea) {
    	this.size = size;
        this.weight = 1;
        this.position = position;
        this.direction = direction;
        this.speed = {
            x: 0,
            y: 0
        }
        this.color = color;
        this.gameArea = gameArea;
        this.controlledBy = null;
        this.ignoredPlayers = [];
    }

    takeControl(player) {
        // prevent previous controller to get the ball back immediately
        if (this.controlledBy !== null && this.controlledBy != player) {
            this.ignoredPlayers.push({time: Date.now(), player: this.controlledBy});
        }

        // remove players from quarantine after 1 sec
        this.ignoredPlayers = this.ignoredPlayers.filter(p => p.time > Date.now() - 1000);

        // set new controller if the player not in ignoredPlayers
        if (!this.ignoredPlayers.some(p => p.player === player)) {
            this.controlledBy = player;
        }
    }

	//Set the new position
	//TODO: Apply slowing forces if not controlled
	move(dt, closestPlayer, direction, velocity) {
        
        if (closestPlayer !== null && closestPlayer.position.distanceTo(this.position) < closestPlayer.size+this.size) {
                this.takeControl(closestPlayer);
            }

		if (this.controlledBy !== null) {
            this.speed.x = 0;
            this.speed.y = 0;

            this.position = this.controlledBy.position.addPolar(closestPlayer.size+this.size, closestPlayer.direction);
		}
        else {

            this.direction = direction;
            this.speed.x = Math.cos(direction) * velocity;
            this.speed.y = Math.sin(direction) * velocity;

            let newX = this.position.x + this.speed.x;
            let newY = this.position.y + this.speed.y;

            // limit x coordinate to game area
            if (newX > this.gameArea.size.width && !this.gameArea.goals.some(goal => goal.isInside(this.position))) {
                newX = this.gameArea.size.width;
            }
            else if (newX < 0 && !this.gameArea.goals.some(goal => goal.isInside(this.position))) {
                newX = 0;
            }
            // limit y coordinate to game area
            if (newY > this.gameArea.size.height && !this.gameArea.goals.some(goal => goal.isInside(this.position))) { //toimiiko tämä some?
                newY = this.gameArea.size.height;
            }
            else if (newY < 0 && !this.gameArea.goals.some(goal => goal.isInside(this.position))) {
                newY = 0;
            }

            this.position = new Position(newX, newY);

            if(this.gameArea.goals.some(goal => goal.isInside(this.position))) {
                this.position = new Position(this.gameArea.size.width/2, this.gameArea.size.height/2);
                this.speed = 0;
                console.log("Måååål");
            }

        }
	}
}

exports.Ball = Ball;