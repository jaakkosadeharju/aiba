import React from 'react';
import { Paper } from "@material-ui/core";

const Team = ({ team }) => {
    return (
        <Paper m={1}>
            { team ? team.name : null}
        </Paper>
    );
}

export default Team;