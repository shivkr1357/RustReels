import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Slider, TextField, Typography, Grid, Card, Box } from '@material-ui/core';
import upgradeBackground from '../../../assets/Rustreels/Branding/BackgroundImagers/upgraderbackground.png';
import gunImage from '../../../assets/Rustreels/Branding/guns/gun1.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        background: 'transparent',
        color: '#FDF8FF',
        borderRadius: 10,
        border: "1px solid #211A20",
        margin: "30px 80px",
        backgroundImage: `url(${upgradeBackground})`,
    },
    leftSection: {
        width: '30%',
        padding: theme.spacing(3),
        // padding: "20px",
        background: '#1B141B',
        borderRadius: 10,
    },
    middleSection: {
        width: '40%',
        textAlign: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: "60px 0 0 0",
    },
    rightSection: {
        width: '30%',
        padding: theme.spacing(2),
        background: '#1B141B',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    slider: {
        color: '#ff00ff',
        '& .MuiSlider-thumb': {
            backgroundColor: '#fff',
            border: '2px solid #ff00ff',
        },
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: theme.spacing(2),
    },
    gunInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "20px 0",
    },
    gunImage: {
        width: '30%',
        height: '40%',
        borderRadius: "70%",
        border: "3px solid #FE49FF",
    },
    rightGunImage: {
        width: '60%',
        height: '60%',

    },
    upgradeButton: {
        background: 'linear-gradient(45deg, #ffc107, #ff9800)',
        color: '#050507',
        // fontWeight: 'bold',
        marginTop: theme.spacing(2),
        padding: "10px 20px",
    },
    rollUnderButton: {
        background: 'linear-gradient(90deg, #6C1855 0%, #431838 49%, #2F172E 100%)',
        color: '#FDF8FF',
        textTransform: 'none',
        padding: '10px 40px',
    },
    rollOverButton: {
        background: 'linear-gradient(90deg, #4A3D4A 0%, #3B2F38 49%, #231D22 100%)',
        color: '#FDF8FF',
        fontWeight: 'bold',
    },
    textField: {
        '& .MuiInputBase-input': {
            color: '#FDF8FF',
            background: 'linear-gradient(90deg, #531542 0%, #32162B 49%, #241723 100%)',
            borderRadius: 4,
        },
        '& .MuiInputBase-input::placeholder': {
            color: '#FDF8FF',
            opacity: 1,
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
    },
    upgradeBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: "10px",
        color: '#FDF8FF',
        margin: "20px 0",

    },
    upgradeText: {
        color: '#FDF8FF',
        fontSize: "14px",
        padding: "5px 10px",
        background: '#2C222C',
        borderRadius: "5px",
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '20px solid #FE49FF',
        position: 'absolute',
        top: -20,
        left: '50%',
        transform: 'translateX(-50%) translateY(-0%)',
    },
    multiplierBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // gap: "10px",
    }
}));

const UpgradeComponent = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* Left Section */}
            <Card className={classes.leftSection}>
                <Typography variant="h6" style={{ color: '#67637B' }}>Amount</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={1000}
                    className={classes.textField}
                    placeholder="Enter amount"
                />
                <Slider className={classes.slider} />
                <Typography variant="h6" style={{ marginTop: '20px', color: '#67637B' }}>Multiplier</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    value="x0.00"
                    className={classes.textField}
                    placeholder="Enter multiplier"
                />
                <Box className={classes.upgradeBox}>
                    <Typography variant="h6" className={classes.upgradeText}>5%</Typography>
                    <Typography variant="h6" className={classes.upgradeText}>10%</Typography>
                    <Typography variant="h6" className={classes.upgradeText}>20%</Typography>
                    <Typography variant="h6" className={classes.upgradeText}>25%</Typography>
                    <Typography variant="h6" className={classes.upgradeText}>50%</Typography>
                    <Typography variant="h6" className={classes.upgradeText}>MAX</Typography>
                </Box>
                <div className={classes.buttonGroup}>
                    <Button variant="contained" className={classes.rollOverButton}>Roll Over</Button>
                    <Button variant="contained" className={classes.rollUnderButton}>Roll Under</Button>
                </div>
                <Button className={classes.upgradeButton} fullWidth>Upgrade Now</Button>
            </Card>

            {/* Middle Section */}
            <div className={classes.middleSection}>
                <div className={classes.triangle} />
                <img src={gunImage} alt="Gun" className={classes.gunImage} />
                <div className={classes.gunInfo}>
                    <Typography variant="h6">Tec-9 Gun Storage</Typography>
                    <Typography variant="h6">220</Typography>
                    <Typography variant="body2">Roll Between: 0.0000-0.9999</Typography>
                </div>
            </div>

            {/* Right Section */}
            <Card className={classes.rightSection}>
                <Typography variant="h6" style={{ color: '#FFFFFF' }}>Select Items to Upgrade</Typography>
                <Typography variant="body2" style={{ color: '#67637B' }}>0.00</Typography>
                <img src={gunImage} alt="Gun" className={classes.rightGunImage} />
                <Box className={classes.multiplierBox}>
                    <Typography variant="body2" style={{ color: '#ffffff' }}>Multiplier</Typography>
                    <Typography variant="body2" style={{ color: '#67637B' }}>x0.00</Typography>
                </Box>
            </Card>
        </div>
    );
};

export default UpgradeComponent;