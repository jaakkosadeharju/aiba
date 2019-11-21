var Position = require('./position.js').Position;

class Ball {
    constructor(size, position, direction, speed, color, gameArea) {
    	this.size = size;
        this.position = position;
        this.direction = direction;
        this.speed = speed;
        this.color = color;
        this.gameArea = gameArea;
        this.controlledBy = null;
    }

    takeControl(player) {
        this.controlledBy = player;
    }

    //Kick action resulting movment
    //direction: direction of the kick
    //power: desired power to kick.
    kick(direction, power) {

    }

	//Set the new position
	//TODO: Apply slowing forces if not controlled
	move(dt) {
		if (this.controlledBy != null) {
			this.position = new Position(this.controlledBy.position.x + (this.size+this.controlledBy.size)/2, this.controlledBy.position.y);
		}
	}

}

exports.Ball = Ball;