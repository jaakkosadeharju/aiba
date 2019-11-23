class Team {
  constructor({ id, name, color, players, goal}) {
      this.id = id;
      this.name = name || "-";
      this.color = color || '#999999';
      this.players = players || [];
      this.goal = goal;
    }

}

exports.Team = Team;
