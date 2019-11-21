var Position = require('./position.js').Position;

class Player {
    constructor({id, name, size, position, speed, stamina, power, gameArea, ball}) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.position = position;
        this.speed = {
            speedX: (Math.random() - 0.5),
            speedY: (Math.random() - 0.5)
        };
        this.mass = 1; // We use same mass for all players unless we implement collisions
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
        this.ball = ball;

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

	//Set the new position and updates stamina left.
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

        var distance = Math.sqrt(Math.pow(this.ball.position.x-this.position.x,2)+Math.pow(this.ball.position.y-this.position.y,2));
        if(distance <= (this.ball.size+this.size)/2) {
        	this.ball.takeControl(this);
        }
	}
}

exports.Player = Player;
