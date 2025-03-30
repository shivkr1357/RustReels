import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    Avatar,
    Badge
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import battle from '../../assets/Rustreels/Branding/battle.png';

import card1 from '../../assets/Rustreels/Branding/cards/card1.png';
import card2 from '../../assets/Rustreels/Branding/cards/card2.png';
import card3 from '../../assets/Rustreels/Branding/cards/card3.png';
import card4 from '../../assets/Rustreels/Branding/cards/card4.png';
import card5 from '../../assets/Rustreels/Branding/cards/card3.png';
import card6 from '../../assets/Rustreels/Branding/cards/card2.png';
import card7 from '../../assets/Rustreels/Branding/cards/card1.png';
import card8 from '../../assets/Rustreels/Branding/cards/card4.png';
import card9 from '../../assets/Rustreels/Branding/cards/card3.png';
import card10 from '../../assets/Rustreels/Branding/cards/card2.png';

import avatar1 from '../../assets/Rustreels/Branding/cards/avatar.png';
import avatar2 from '../../assets/Rustreels/Branding/cards/avatar2.png';
import avatar3 from '../../assets/Rustreels/Branding/cards/avatar3.png';
import avatar4 from '../../assets/Rustreels/Branding/cards/avatar4.png';


// Sample card image URLs - replace these with your actual images
const cardImages = [
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card9,
    card10,

];

// Sample player avatars - replace these with your actual avatars
const playerAvatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
];

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#201520',
        borderRadius: 10,
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 150,
        marginTop: 20
    },
    openPanel: {
        backgroundColor: '#231A32',
        borderRadius: 10,
        width: 90,
        height: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'space-around',
        margin: '10px 10px',

        // gap: 10
    },
    crossIcon: {
        color: '#FFFF00',
        position: 'absolute',
        top: 10,
        fontSize: 24,
    },
    openText: {
        color: 'white',
        marginTop: 10,

    },
    fractionText: {
        color: 'white',
        fontSize: 14,
    },
    counterPanel: {
        backgroundColor: '#231A32',
        borderRadius: 10,
        width: 90,
        height: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    counterCircle: {
        width: 60,
        height: 60,
        border: '2px dashed #B8860B',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    counterNumber: {
        color: '#B8860B',
        fontSize: 24,
    },
    cardsContainer: {
        display: 'flex',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardItem: {
        width: 70,
        height: 90,
        backgroundColor: 'transparent',
        borderRadius: 5,
        marginRight: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: theme.spacing(3),

    },
    cardImage: {
        width: 80,
        height: 80,
        objectFit: 'cover',
        padding: 10,

    },
    playersSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: theme.spacing(2),
        gap: 10
    },
    playerAvatar: {
        width: 30,
        height: 30,
        margin: 2,
        border: '2px solid transparent',
    },
    battleSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    battleValueBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: theme.spacing(2),
    },
    battleValueText: {
        color: '#FFA500',
        fontWeight: 'bold',
        fontSize: 18,
    },
    battleLabelText: {
        color: '#808080',
        fontSize: 12,
    },
    joinButton: {
        backgroundColor: '#DAA520',
        color: 'black',
        borderRadius: 10,
        padding: '8px 16px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#B8860B',
        },
    },

    openImage: {
        width: 20,
        height: 20,
        marginTop: 10
    },
    playerAvatarBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerAvatarBox2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    visibilityIconBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#261925',
        borderRadius: '10px',
        padding: "10px",
        marginLeft: theme.spacing(2),
    },
    visibilityIcon: {
        color: '#746574',
        fontSize: 24,
    },
}));

const GameInterface = ({ opacity }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={3} style={{ opacity: opacity }}>
            {/* Open section */}
            <Box className={classes.openPanel}>
                <img src={battle} alt="battle" className={classes.openImage} />
                <Typography className={classes.fractionText}>1/4</Typography>
                <Typography className={classes.openText}>Open</Typography>
            </Box>

            {/* Counter section */}
            <Box className={classes.counterPanel} ml={2}>
                <Box className={classes.counterCircle}>
                    <Typography className={classes.counterNumber}>8</Typography>
                </Box>
            </Box>

            {/* Cards section */}
            <Box className={classes.cardsContainer}>
                {cardImages.map((image, index) => (
                    <Box key={index} className={classes.cardItem}>
                        <img src={image} alt={`Card ${index + 1}`} className={classes.cardImage} />
                    </Box>
                ))}
            </Box>

            {/* Players section */}
            <Box className={classes.playersSection}>
                <Box className={classes.playerAvatarBox}>
                    <Avatar
                        key={0}
                        src={playerAvatars[0]}
                        className={classes.playerAvatar}
                    />
                    <Avatar
                        key={1}
                        src={playerAvatars[1]}
                        className={classes.playerAvatar}
                    />
                </Box>
                <img src={battle} alt="battle" className={classes.openImage} />

                <Box className={classes.playerAvatarBox2}>
                    <Avatar
                        key={2}
                        src={playerAvatars[2]}
                        className={classes.playerAvatar}
                    />
                    <Avatar
                        key={3}
                        src={playerAvatars[3]}
                        className={classes.playerAvatar}
                    />
                </Box>


            </Box>

            {/* Battle section */}
            <Box className={classes.battleSection}>
                <Box className={classes.battleValueBox}>
                    <Typography className={classes.battleValueText}>50.50</Typography>
                    <Typography className={classes.battleLabelText}>Battle Value</Typography>
                </Box>
                <Button variant="contained" className={classes.joinButton} mt={1}>
                    Join Battle
                </Button>

                <Box className={classes.visibilityIconBox}>
                    <VisibilityIcon className={classes.visibilityIcon} />
                </Box>

            </Box>
        </Paper>
    );
};

export default GameInterface;