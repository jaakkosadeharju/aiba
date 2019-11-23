var Position = require('./position.js').Position;

class Player {
    constructor({id, name, size, position, speed, stamina, power, gameArea, ball}) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.position = position;
        this.speed = { //Lets handle this as m/s
            x: 0,
            y: 0
        };
        this.mass = 10; // something scalable to be used in formulas, if we want to vary this later
        this.skill = {
            speed, // top speed
            stamina, //Find the calculation formula for turning ATP and sugars into power, and if that is slower than power rate used, spend stamina
            power // in Newtons
        };
        this.staminaLeft = this.skill.stamina;

        this.target = {
            force: 0,      // power applied to the player into target direction
            direction: 0   // players desired direction in radians
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
	move(dt, target) {
		//TODO: Add conversions between skill numbers and physical quantites to ease the calculation process and make the movement smooth and realistic

		//meters to pixels conversion factor
		let metersToPixelsRatio = 10;

        //Calculate acceleration
        let xForce = Math.cos(target.direction) * target.force;
        let yForce = Math.sin(target.direction) * target.force;

        let xAcceleration = xForce / this.mass;
        let yAcceleration = yForce / this.mass;

        this.speed.x = this.speed.x + xAcceleration * (dt/1000) * metersToPixelsRatio; //TODO: reduce if out of stamina
        this.speed.y = this.speed.y + yAcceleration * (dt/1000) * metersToPixelsRatio;

        let newX = this.position.x + this.speed.x;
        let newY = this.position.y + this.speed.y;

        // limit x coordinate to game area
        if (newX > this.gameArea.size.width) {
            newX = this.gameArea.size.width;
            this.speed.x = 0; //kill speed in collision to border
        }
        else if (newX < 0) {
            newX = 0;
            this.speed.x = 0; 
        }
        // limit y coordinate to game area
        if (newY > this.gameArea.size.height) {
            newY = this.gameArea.size.height;
            this.speed.y = 0;
        }
        else if (newY < 0) {
            newY = 0;
            this.speed.y = 0;
        }

        //TODO:increase or decrease staminaLeft by the power used

        this.setPosition(new Position(newX, newY));

        if(this.distanceToPoint(this.ball.position) <= (this.ball.size + this.size)) {
        	this.ball.takeControl(this);
        }
	}

    //Kick action resulting movment
    //direction: direction of the kick
    //power: desired power to kick.
    kick(dt, direction, force) {

        //not in control of the player
        if(this.ball.controlledBy != this)
            return;
            
        //meters to pixels conversion factor
        let metersToPixelsRatio = 10;
        let acceleration = force / this.ball.weight;
        let speed = Math.sqrt(Math.pow(this.ball.speed.x, 2)+Math.pow(this.ball.speed.y, 2));
        speed = speed + acceleration * (dt/1000) * metersToPixelsRatio;

        //release ball
        this.ball.controlledBy = null;


        this.ball.move(dt, direction, speed);
        console.log("Kick");
    }

	distanceToPoint(position) {
		return Math.sqrt(Math.pow(position.x-this.position.x,2) + Math.pow(position.y - this.position.y,2))
	}
}

exports.Player = Player;
