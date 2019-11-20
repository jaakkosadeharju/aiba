class Team {
  constructor({ id, name, color, players}) {
      this.id = id;
      this.name = name || "-";
      this.color = color || '#999999';
      this.players = players || [];
    }

}

exports.Team = Team;
