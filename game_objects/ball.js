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
    }

    takeControl(player) {
        this.controlledBy = player;
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
        }
	}

}

exports.Ball = Ball;