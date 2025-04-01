import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    Paper,
    Select,
    MenuItem,
    Tab,
    Tabs,
    Typography,
    makeStyles
} from '@material-ui/core';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import ClearIcon from '@material-ui/icons/Clear';
import bettingMenuFrame from '../../assets/betting-menu-frame.png';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
        padding: theme.spacing(2),
        color: 'white',
        borderRadius: 8,
        border: '1px solid #333345',
        margin: '40px 60px',
    },
    tabsContainer: {
        '& .MuiTabs-indicator': {
            backgroundColor: 'transparent',
            width:"100%",
        },
    },
    tab: {
        backgroundColor: '#2A2A3A',
        width: "50% !important", 
        '&.Mui-selected': {
          backgroundImage: `url(${bettingMenuFrame})`,
          backgroundPosition: 'center',
          color: 'white',
          width: "50% !important", 
        },
        '&:first-child': {
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
        },
        '&:last-child': {
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px',
        },
      },
    amountBox: {
        backgroundColor: 'transparent',
        padding: theme.spacing(1),
        borderRadius: 8,
        marginTop: theme.spacing(2),
    },
    amountInput: {
        background: 'linear-gradient(to right, #531542 0%, #32162B 49%, #241723 100%)',
        borderRadius: 10,
        padding: '8px 16px',
        alignItems: 'center',
        display: 'flex',
        border: '1px solid #333345',
        justifyContent: 'space-between',
    },
    amountValue: {
        color: '#FFA500',
        fontWeight: 'bold',
    },
    currencyIcon: {
        backgroundColor: '#FFA500',
        borderRadius: '50%',
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    buttonContainer: {
        marginTop: "-1px",
        display: 'flex',
        gap: 8,
        justifyContent: 'flex-end',
        flexGrow: 1,
    },
    button: {
        backgroundColor: '#2A2A3A',
        borderRadius: 4,
        color: 'white',
        minWidth: 60,
        '&:hover': {
            backgroundColor: '#3A3A4A',
        },
    },
    playNowButton: {
        backgroundColor: '#FFC107',
        color: 'black',
        fontWeight: 'bold',
        padding: '12px',
        borderRadius: 8,
        marginTop: theme.spacing(3),
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        '&:hover': {
            backgroundColor: '#FFB000',
        },
    },
    cashOutBox: {
        marginTop: theme.spacing(2),
    },
    select: {
        background: 'linear-gradient(to right, #531542 0%, #32162B 49%, #241723 100%)',
        borderRadius: 10,
        border: '1px solid #333345',
        color: 'white',
        padding: '8px 12px',
        width: '100%',
        '& .MuiSelect-icon': {
            color: 'white',
        },
    },
    networkStatus: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
    },
    networkDot: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '#FFA500',
        marginLeft: 8,
    },
    chartContainer: {
        height: 300,
        position: 'relative',
    },
    multiplierBox: {
        backgroundColor: '#3A224A',
        borderRadius: 8,
        padding: theme.spacing(2),
        textAlign: 'center',
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        width: 180,
        border: '1px solid #9C27B0',
    },
    multiplierValue: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    multiplierLabel: {
        color: '#AAA',
    },
    betterInfo: {
        backgroundColor: 'rgba(42, 42, 58, 0.8)',
        borderRadius: 20,
        padding: '4px 12px',
        display: 'flex',
        alignItems: 'center',
        marginTop: 8,
        width: 'fit-content',
        position: 'absolute',
        right: '5%',
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: '#FFF',
        marginRight: 8,
    },
    timeMarkers: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    timeMarker: {
        padding: theme.spacing(0.5, 1),
        backgroundColor: '#2A2A3A',
        borderRadius: 4,
        fontSize: 12,
        '&.active': {
            backgroundColor: '#9C27B0',
        },
    },
    multiplierSideLabels: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
    },
    multiplierSideLabel: {
        backgroundColor: 'rgba(42, 42, 58, 0.5)',
        borderRadius: 4,
        padding: '2px 6px',
        fontSize: 12,
    }
}));

const BettingComponent = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);
    const [amount, setAmount] = useState(1000);

    // Generate chart data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            const value = Math.exp(i / 40) * 1.5;
            data.push({ time: i, value: value > 2.6 ? 2.6 : value });
        }
        return data;
    };

    const chartData = generateData();

    // Bettors data
    const bettors = [
        { name: 'Maxwell', amount: '$32.80', position: 75 },
        { name: 'Lopez', amount: '$34.80', position: 60 },
        { name: 'Lendaz', amount: '$30.20', position: 45 },
    ];

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Paper className={classes.root}>
          <Grid container spacing={3} direction={{ xs: "column", lg: "row" }}>
            {/* Left side - Betting controls */}
            <Grid item xs={12} lg={4}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    className={classes.tabsContainer}
                    indicatorColor="transparent"
                >
                    <Tab label="Manual" className={classes.tab} />
                    <Tab label="Auto" className={classes.tab} />
                </Tabs>

                {/* Amount section */}
                <Box className={classes.amountBox}>
                    <Typography variant="body2" style={{ color: "#7E7681" }}>Amount</Typography>
                    <Box className={classes.amountInput} mt={1}>
                        <div className={classes.currencyIcon}>₿</div>
                        <Typography className={classes.amountValue} variant="h6">{amount}</Typography>
                        <Box className={classes.buttonContainer} mt={1}>
                            <Button className={classes.button} variant="contained">1/2</Button>
                            <Button className={classes.button} variant="contained">2x</Button>
                            <Button className={classes.button} variant="contained">
                                <ClearIcon fontSize="small" /> Clear
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Cash Out At */}
                <Box className={classes.cashOutBox}>
                    <Typography variant="body2" style={{ color: "#7E7681" }}>Cash Out At</Typography>
                    <FormControl fullWidth margin="dense">
                        <Select
                            className={classes.select}
                            value="x0.00"
                            displayEmpty
                            renderValue={() => "x0.00"}
                        >
                            <MenuItem value="x0.00">x0.00</MenuItem>
                            <MenuItem value="x1.50">x1.50</MenuItem>
                            <MenuItem value="x2.00">x2.00</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Profit On Win */}
                <Box className={classes.cashOutBox}>
                    <Typography variant="body2" style={{ color: "#7E7681" }}>Profit On Win</Typography>
                    <FormControl fullWidth margin="dense">
                        <Select
                            className={classes.select}
                            value="x0.00"
                            displayEmpty
                            renderValue={() => "x0.00"}
                        >
                            <MenuItem value="x0.00">x0.00</MenuItem>
                            <MenuItem value="x1.50">x1.50</MenuItem>
                            <MenuItem value="x2.00">x2.00</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Play Now button */}
                <Button
                    variant="contained"
                    fullWidth
                    className={classes.playNowButton}
                >
                    Play Now
                </Button>
            </Grid>

            {/* Right side - Graph */}
            <Grid item xs={12} lg={8}>
                <Box className={classes.networkStatus}>
                    <Typography variant="h6">Network Status</Typography>
                    <div className={classes.networkDot}></div>
                </Box>

                <Box className={classes.chartContainer}>
                    {/* Multiplier values on the side */}
                    <Box className={classes.multiplierSideLabels}>
                        {[...Array(8)].map((_, index) => (
                            <Typography key={index} className={classes.multiplierSideLabel}>
                                2.6X
                            </Typography>
                        ))}
                    </Box>

                    {/* Current payout box */}
                    <Box className={classes.multiplierBox}>
                        <Typography className={classes.multiplierValue}>2.6X</Typography>
                        <Typography className={classes.multiplierLabel}>Current Payout</Typography>
                    </Box>

                    {/* Bettors info */}
                    {bettors.map((bettor, index) => (
                        <Box
                            key={index}
                            className={classes.betterInfo}
                            style={{
                                top: `${35 + (index * 15)}%`,
                                right: `${15 + (index * 5)}%`,
                            }}
                        >
                            <div className={classes.avatar}></div>
                            <Typography variant="body2">{bettor.name} {bettor.amount}</Typography>
                        </Box>
                    ))}

                    {/* Chart */}
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#9C27B0"
                                strokeWidth={3}
                                dot={false}
                            />
                            <XAxis
                                dataKey="time"
                                hide={true}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>

                {/* Time markers */}
                <Box className={classes.timeMarkers}>
                    {['1s', '3s', '6s', '9s', '12s', '15s', '18s'].map((time, index) => (
                        <Box
                            key={index}
                            className={`${classes.timeMarker} ${time === '15s' ? 'active' : ''}`}
                        >
                            {time}
                        </Box>
                    ))}
                </Box>
            </Grid>
          </Grid>
        </Paper>
    );
};

export default BettingComponent;