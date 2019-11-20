var Position = require('./position.js').Position;

class Player {
    constructor({id, name, position, speed, stamina, power, gameArea}) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.speed = {
            speedX: (Math.random() - 0.5),
            speedY: (Math.random() - 0.5)
        };
        this.mass = 1; // We use same mass for all players
        this.skill = {
            speed,
            stamina,
            power
        };
        this.target = {
            power: 0,      // power applied to the player into target direction
            direction: 0   // players desired direction in radians?
        }
        this.gameArea = gameArea;

        if (speed + stamina + power > 100) {
            throw "Overskilled player";
        }
        if (!position.x || !position.y) {
            throw "Player must have a position";
        }
    }

	setPosition(position) {
		this.position = position;
    }

	//Request to move the player. 
	//Returns the closest possible position and updates stamina left.
	move(dt) {
        const dx = this.speed.speedX * dt;
        const dy = this.speed.speedY * dt;
        let newX = this.position.x + dx;
        let newY = this.position.y + dy;

        // limit x coordinate to game area
        if (newX > this.gameArea.size.width) {
            newX = this.gameArea.size.width;
        }
        else if (newX < 0) {
            newX = 0
        }

        // limit y coordinate to game area
        if (newY > this.gameArea.size.height) {
            newY = this.gameArea.size.height;
        }
        else if (newY < 0) {
            newY = 0;
        }

        this.setPosition(new Position(newX, newY));
	}

    

	//Kicks ball to desired direction with desired force. Not sure if this method is needed, but this is an action of a player's.
	kick(force, direction) {

	}

}

exports.Player = Player;
