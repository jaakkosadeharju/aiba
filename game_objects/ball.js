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
    move(dt, closestPlayer) {
        // TODO: Calculate the movement if ball is free
        
        if (closestPlayer.position.distanceTo(this.position) < closestPlayer.size * 6) {
            console.log("HEHEHEHE", closestPlayer.size * 6);
            
            this.takeControl(closestPlayer);
        }

        if (this.controlledBy !== null) {
            this.position = this.controlledBy.position.addPolar(closestPlayer.size, closestPlayer.target.direction);
        }
    }

}

exports.Ball = Ball;