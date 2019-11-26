class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Euclidean distance between two positions
  distanceTo(target) {
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    
    return Math.sqrt(dx * dx + dy * dy);
  }

  directionTo(target){
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    
    return Math.atan2(dy, dx);
  }

  add(delta) {
    return new Position(this.x + delta.x, this.y + delta.y)
  }

  addPolar(r, phi) {
    const dx = r * Math.cos(phi);
    const dy = r * Math.sin(phi);
    //console.log(r,phi,dx,dy);
    
    return new Position(this.x + dx, this.y + dy);
  }
}

exports.Position = Position;
