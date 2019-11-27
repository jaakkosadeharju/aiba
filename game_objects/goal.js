class Goal {
    constructor({team, sides, position}) {
    	this.team = team;
        this.sides = sides;
        this.position = position;
    }

    isInside(position) {
    	return position.x >= this.sides.left && position.x <= this.sides.right && position.y >= this.sides.top && position.y <= this.sides.bottom;
    }
}

exports.Goal = Goal;