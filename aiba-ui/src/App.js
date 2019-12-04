import React, { Component } from 'react';
import io from 'socket.io-client';
import {
  Box,
  Grid,
} from "@material-ui/core";
import './App.css';
import GameArea from './GameArea';
import Team from './Team';



class App extends Component {
  constructor(props) {
    super(props);

    this.backendUrl = "http://localhost:3000/";
    this.socket = io(this.backendUrl);

    this.updatePositions = this.updatePositions.bind(this);
    this.updateArea = this.updateArea.bind(this);

    this.state = {
      teams: [],
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
    // update state when server sends new positions
    this.socket.on('new positions', this.updatePositions);
    this.socket.on('area data', this.updateArea);
  }


  updatePositions(positions) {
    const { teams, ball } = JSON.parse(positions);

    // TODO: SET THESE
    // document.getElementById('team1-name').innerHTML = gameData.teams[0].name + " " + gameData.teams[0].score;
    // document.getElementById('team2-name').innerHTML = gameData.teams[1].name + " " + gameData.teams[1].score;
    // document.getElementById('game-time').innerHTML = gameData.time;

    this.setState((state, props) => ({
      teams: { ...state.teams, ...teams },
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

  render() {
    return (
      <Box className="App">
        <header className="App-header">
          AI Ball <i className="material-icons">play_circle_filled</i>

        </header>
        <Grid container>
          <Grid item xs={3}>
            <Team team={this.state.teams[0]}></Team>
          </Grid>
          <Grid item xs={6}>
            <GameArea
              socket={this.socket}
              teams={this.state.teams}
              ball={this.state.ball}
              area={this.state.area}></GameArea>
          </Grid>
          <Grid item xs={3}>
            <Team team={this.state.teams[1]}></Team>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default App;
