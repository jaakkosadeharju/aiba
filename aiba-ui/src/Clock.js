import React from 'react';
import { Box, Paper, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    clock: {
        background: 'white',
        borderRadius: 4,
        color: '#333',
        padding: '0.5em 1em',
        margin: '0.5em',
        textAlign: 'center'
    },
    time: {
        fontSize: '2em',
    },
    score: {
        fontSize: '1.3em',
    }
});

const Clock = ({ time, team1Score, team2Score }) => {
    const classes = useStyles();
    const timeInSeconds = Math.round(time / 1000);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    
    return (
        <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Paper m={1} className={classes.clock}>
                    <Box className={classes.time}>
                        {
                            time
                                ? <Box>{minutes}:{seconds < 10 ? '0' : ''}{seconds}</Box>
                                : null
                        }
                    </Box>
                    <Box className={classes.score}>
                        {team1Score} - {team2Score}
                    </Box>

                </Paper>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>

    );
}

export default Clock;