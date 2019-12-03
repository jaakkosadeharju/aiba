import React, { Component } from 'react';

class GameArea extends Component {
    constructor(props) {
        super(props);

        this.updatePositions = this.updatePositions.bind(this);
        this.updateArea = this.updateArea.bind(this);

        // reference to canvas element
        this.canvas = React.createRef();

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
        this.props.socket.on('new positions', this.updatePositions);
        this.props.socket.on('area data', this.updateArea);
    }

    componentDidUpdate() {
        this.updateCanvas();
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

    updateCanvas() {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');
        const area = this.state.area;
        const teams = this.state.teams;
        const ball = this.state.ball;

        // convert from game area position to canvas position
        const toCanvasX = x => ((canvas.width - 40) * (x / (area.size.width))) + 20;
        const toCanvasY = y => canvas.height * (y / area.size.height);

        // clear canvas
        ctx.clearRect(toCanvasX(0) - 20, toCanvasY(0), toCanvasX(area.size.width) + 40, toCanvasY(area.size.height));
        ctx.beginPath();
        ctx.rect(toCanvasX(0), toCanvasY(0), toCanvasX(area.size.width - 20), toCanvasY(area.size.height));
        ctx.stroke();

        // draw goals
        area.goals.forEach(goal => {
            ctx.beginPath();
            ctx.moveTo(toCanvasX(goal.sides.left), toCanvasY(goal.sides.top));
            ctx.lineTo(toCanvasX(goal.sides.right), toCanvasY(goal.sides.top));
            ctx.lineTo(toCanvasX(goal.sides.right), toCanvasY(goal.sides.bottom));
            ctx.lineTo(toCanvasX(goal.sides.left), toCanvasY(goal.sides.bottom));
            ctx.lineTo(toCanvasX(goal.sides.left), toCanvasY(goal.sides.top));
            ctx.stroke();
        });

        // draw players
        Object.values(teams).forEach(team => {
            team.players.forEach(player => {
                ctx.beginPath();
                ctx.arc(toCanvasX(player.position.x), toCanvasY(player.position.y), player.size, 0, 2 * Math.PI);
                ctx.fillStyle = team.color;
                ctx.fill();
            });
        });

        // draw ball
        ctx.beginPath();
        ctx.arc(toCanvasX(ball.position.x), toCanvasY(ball.position.y), ball.size, 0, 2 * Math.PI);
        ctx.fillStyle = ball.color;
        ctx.fill();
    }

    render() {
        return (
            <div id="stadium"><canvas ref={this.canvas} id="game-area" width="900" height="660"></canvas></div>
        );
    }
}

export default GameArea;