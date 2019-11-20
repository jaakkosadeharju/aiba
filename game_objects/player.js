class Player {
    constructor({id, name, position, speed, stamina, power}) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.skill = {
            speed,
            stamina,
            power
        };
        this.targetSpeed = 0; // Shoud we set current power instead of target speed?
        this.direction = 0; // players direction in radians?

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
	move() {
        // TODO: calculate the next position from targetSpeed and direction
	}

	//Kicks ball to desired direction with desired force. Not sure if this method is needed, but this is an action of a player's.
	kick(force, direction) {

	}

}

exports.Player = Player;
