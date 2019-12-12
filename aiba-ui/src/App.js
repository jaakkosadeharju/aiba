import React, { Component } from 'react';
import io from 'socket.io-client';
import {
  Box,
  Grid,
} from "@material-ui/core";
import './App.css';
import GameArea from './GameArea';
import Clock from './Clock';
import Team from './Team';



class App extends Component {
  constructor(props) {
    super(props);

    this.backendUrl = "http://localhost:3000/";

    this.updatePositions = this.updatePositions.bind(this);
    this.updateArea = this.updateArea.bind(this);
    this.updateTeamData = this.updateTeamData.bind(this);

    this.state = {
      teams: null,
      area: {
        size: {
          height: 0,
          width: 0
        },
        goals: []
      },
      ball: {
        size: 0,
        position: { x: 0, y: 0 },
        color: '#000000'
      },
      clock: null
    };
  }

  componentDidMount() {
    this.socket = io(this.backendUrl);

    // update state when server sends new positions
    this.socket.on('new positions', this.updatePositions);
    this.socket.on('area data', this.updateArea);
    this.socket.on('team details', this.updateTeamData);
  }


  updatePositions(positions) {
    const { teams, ball, time } = JSON.parse(positions);

    // TODO: SET THESE
    // document.getElementById('team1-name').innerHTML = gameData.teams[0].name + " " + gameData.teams[0].score;
    // document.getElementById('team2-name').innerHTML = gameData.teams[1].name + " " + gameData.teams[1].score;
    // document.getElementById('game-time').innerHTML = gameData.time;

    this.setState((state, props) => ({
      teams: state.teams.map(t => ({
          ...t,
          score: teams.find(team => team.id === t.id).score,
          players: t.players.map(p => ({
            ...p,
            position: teams
              .find(team => team.id === t.id)
              .players.find(player => player.id === p.id).position
          })
        )})),
      time: time,
      ball: { ...state.ball, ...ball }
    }));
  }

  updateArea(areaData) {
    const area = JSON.parse(areaData);

    this.setState((state, props) => ({
      area: {
        ...state.area,
        ...area
      }
    }));
  }

  // merge team data from server to the state
  updateTeamData(teamData) {
    const teams = JSON.parse(teamData);

    this.setState((state, props) => {
      return state.teams
      ? {
        teams: state.teams.map(stateTeam => {
          const t = teams.find(t => stateTeam.id === t.id);
          return {
            ...stateTeam,
            ...t,
            players: (stateTeam.players || []).map(statePlayer => ({
              ...statePlayer,
              ...t.players.find(player => player.id === statePlayer.id)
            })),
          }
        }),
      }
      : {teams}
    });
  }

  render() {
    const teams = this.state.teams || [];
    
    return (
      <Box className="App">
        <header className="App-header">
          AI Ball <i className="material-icons">play_circle_filled</i>

        </header>
        <Grid container>
          <Grid item xs={3}>
            <Team team={teams[0]}></Team>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Clock time={this.state.time}
                team1Score={(teams[0] || {}).score}
                team2Score={(teams[1] || {}).score}></Clock>
            </Box>
            <Box><GameArea
              socket={this.socket}
              teams={teams}
              ball={this.state.ball}
              area={this.state.area}></GameArea></Box>
            
          </Grid>
          <Grid item xs={3}>
            <Team team={teams[1]}></Team>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default App;
