class Goal {
    constructor({team, corners, position}) {
    	this.team = team;
        this.corners = corners;
        this.position = position;
    }

    isInside(position) {
    	return position.x > this.corners.topLeft && position.x < this.corners.topRight && position.y > this.corners.topLeft && position.y < this.corners.bottomRight;
    }
}

exports.Goal = Goal;