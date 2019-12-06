class Team {
  constructor({ id, name, color, players, goal}) {
      this.id = id;
      this.name = name || "-";
      this.color = color || '#999999';
      this.players = players || [];
      this.goal = goal;
      this.score = 0;
    }

  closestPlayer(point) {
    return this.players.sort((p1, p2) =>
      p1.position.distanceTo(point) < p2.position.distanceTo(point) ? -1 : 1)[0];
  }
}

exports.Team = Team;
