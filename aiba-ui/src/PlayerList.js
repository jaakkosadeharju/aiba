import React from 'react';
import Player from "./Player";

const PlayerList = ({players}) => {
    return (
        players.map(player => <Player key={player.id} player={player}></Player>)
    );
}

export default PlayerList;