class Player {
    constructor(id, team, name, position, speed, stamina, acceleration) {
        this.id = id;
        this.team = team;
        this.name = name;
        this.position = position;
        this.speed = speed;
        this.stamina = stamina;
        this.acceleration = acceleration; //Should't this be power?

        //Throw exception or something if speed+stmina+power is on steroids.

    }

	setPosition(position) {
		this._position = position;
	}

	//Request to move the player. 
	//Returns the closest possible position and updates stamina left.
	move(targeSpeed, direction) {

	}

	//Kicks ball to desired direction with desired force. Not sure if this method is needed, but this is an action of a player's.
	kick(force, direction) {

	}

}

exports.Player = Player;
