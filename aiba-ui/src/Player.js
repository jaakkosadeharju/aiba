import React from 'react';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar
} from "@material-ui/core";


const Player = ({ player }) => {
    return <List dense={true}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            {player.id}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={player.name}
                    />
                </ListItem>
        </List>
}

export default Player;