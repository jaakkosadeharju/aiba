import React, { Component } from 'react';

class GameArea extends Component {
    constructor(props) {
        super(props);
        
        // reference to canvas element
        this.canvas = React.createRef();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');
        const area = this.props.area;
        const teams = this.props.teams;
        const ball = this.props.ball;

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
        teams.forEach(team => {
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