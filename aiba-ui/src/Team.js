import React from 'react';
import { Box, Paper, Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PlayerList from "./PlayerList";

const useStyles = makeStyles({
    team: {
        background: 'white',
        borderRadius: 4,
        color: '#333',
        padding: '0.5em 1em',
        margin: '0.5em'
    },
    clear: {
        clear: 'both',
        overflow: 'auto'
    },
    teamNameContainer: {
        padding: '1em', 
    },
    teamName: {
        lineHeight: '1.5em',
        fontSize: '1.7em',
        paddingLeft: '2em',
    },
    avatar: {
        float: "left",
        color: '#999',
    }
});

const Team = ({ team }) => {
    const classes = useStyles();

    return (
        team
            ? <Box>
                <Box className={classes.teamNameContainer}>
                    <Avatar aria-label="team name" className={classes.avatar}
                        style={{ backgroundColor: team.color }}>
                        {team.name[0]}
                    </Avatar>
                    <Box className={classes.teamName}>{team.name}</Box>
                </Box>
                <Paper m={1} key={team.id} className={classes.team}>
                    <Box className={classes.clear}>
                        <PlayerList players={team.players}></PlayerList>
                    </Box>
                </Paper>
            </Box>
            : null
    );
}

export default Team;