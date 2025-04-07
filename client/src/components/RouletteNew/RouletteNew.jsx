import React, { useState } from "react";
import MainLayout from "../Layout/MainLayout";
import CustomTable from "../CustomTable/CustomTable";
import { HomeTableData } from "./data/dummyData";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import  logoWhite  from "../../assets/logo-white.png";
import orangeIcon from "../../assets/orange-icon.png";
import userIcon from "../../assets/user-icon.png";
import colorfulIcon from "../../assets/colorful-icon.png";

const useStyles = makeStyles((theme) => ({
  rouletteWrapper: {
    position: "relative",
    display: "flex",
    width: "100%",
    margin: "0 auto 20px",
    overflow: "hidden",
    borderRadius: "10px",
    justifyContent: "center",
    padding: "20px",
  },
  mainContainer:{
    borderRadius:"30px",
    backgroundColor:"#160D14",
    border: "1px solid #211A20",
    margin:"0px 35px 30px 35px"
  },
  topContainer: {
    display: "flex",
    width: "100%",
    gap: "20px",
    marginBottom: "20px",
    padding: "0 20px",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
      gap: "15px",
    }
  },
  leftContainer: {
    flex: 1,
    padding: "15px",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    }
  },
  rightContainer: {
    flex: 1,
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    }
  },
  previousRound: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  roundTitle: {
    color: "#fff",
    fontSize: "14px",
    fontFamily: "Rubik",
    fontWeight: 500,
    marginBottom: "10px",
  },
  roundTitleRight: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "12px",
    fontFamily: "Rubik",
    fontWeight: 500,
    textAlign: "right",
    marginTop: "8px",
  },
  roundTiles: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
  },
  roundTile: {
    width: "24px",
    height: "24px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  last100: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    gap: "30px",
    justifyContent: "flex-end",
    paddingRight: "25px",
  },
  resultDot: {
    width: "38px",
    height: "38px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  resultNumber: {
    position: "absolute",
    right: "-25px",
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "12px",
    fontFamily: "Rubik",
    whiteSpace: "nowrap",
  },
  logoInDot: {
    width: "24px",
    height: "24px",
    objectFit: "contain"
  },
  topSection: {
    background: "#1B1118",
    borderRadius: "10px",
    padding: "15px",
    minHeight: "100px",
  },
  colorfulIcon:{
    width:"24%",
  },
  bottomSection: {
    background: "#1B1118",
    borderRadius: "10px",
    padding: "15px",
    minHeight: "100px",
  },
  wheelContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    position: "relative",
    padding: "20px 0",
  },
  wheelTiles: {
    backgroundColor: "#0E050D",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "10px 0",
    width: "97%",
    overflowX: "auto",
    justifyContent: "center",
    position: "relative",
    flexWrap: "wrap",
    "&::-webkit-scrollbar": {
      display: "none"
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      width: "120px",
      height: "100%",
      background: "linear-gradient(90deg, #0E050D 0%, rgba(14, 5, 13, 0) 100%)",
      pointerEvents: "none",
      zIndex: 2,
      boxShadow: "inset 15px 0 10px -10px rgba(0, 0, 0, 0.5)"
    },
    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      top: 0,
      width: "120px",
      height: "100%",
      background: "linear-gradient(270deg, #0E050D 0%, rgba(14, 5, 13, 0) 100%)",
      pointerEvents: "none",
      zIndex: 2,
      boxShadow: "inset -15px 0 10px -10px rgba(0, 0, 0, 0.5)"
    }
  },
  tile: {
    minWidth: "68px",
    height: "68px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#1B1118",
    flexShrink: 0,
    boxShadow: "inset 0 2px rgba(255, 255, 255, 0.1), inset 0 -2px rgba(0, 0, 0, 0.2)",
  },
  tileRed: {
    background: "#de4c41",
    boxShadow: "0 10px 27px #fa010133, inset 0 2px #e5564b, inset 0 -2px #ad362d",
  },
  tileGreen: {
    background: "#00c74d",
    boxShadow: "0 10px 27px #00ff0033, inset 0 2px #00d453, inset 0 -2px #00963b",
  },
  tileBlack: {
    background: "#2d2d2d",
    boxShadow: "0 10px 27px #00000033, inset 0 2px #383838, inset 0 -2px #1a1a1a",
  },
  betInputContainer: {
    width: "100%",
    position: "relative",
    marginBottom: "20px",
    maxWidth: "700px",
    margin: "0 auto 20px",
    padding: "0 15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.down(700)]: {
      padding: "0 10px",
    }
  },
  betInput: {
    width: "100%",
    "& .MuiInputBase-root": {
      background: "#1B1118",
      color: "#e4e4e4",
      fontFamily: "Rubik",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: ".1em",
      height: "48px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      padding: "0 10px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    "& .MuiFilledInput-input": {
      padding: "10px 12px 10px",
    },
    "& .MuiInputBase-input": {
      "&::placeholder": {
        color: "#666",
        opacity: 1,
      }
    },
    "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after": {
      display: "none",
    }
  },
  inputIcon: {
    height: "50px",
    margin: "0px -14px",
  },
  quickAmounts: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
    justifyContent: "center",
    width: "100%",
    [theme.breakpoints.up(700)]: {
      position: "absolute",
      right: "25px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "auto",
    }
  },
  quickAmount: {
    minWidth: "unset",
    padding: "4px 8px",
    backgroundColor: "#31353d",
    color: "white",
    fontSize: "11px",
    fontFamily: "Rubik",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#3d4148",
    }
  },
  betButtons: {
    display: "grid",
    width: "100%",
    gap: "12px",
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: "1fr",
      gap:"10px"
    },
  },
  betButton: {
    width: "100%",
    background: "#141215",
    borderRadius: "10px",
    overflow: "hidden",
    // [theme.breakpoints.up('md')]: {
    //   maxWidth: "100%",
    // },
    // [theme.breakpoints.down('md')]: {
    //   maxWidth: "100%",
    // },
  },
  betButtonRed: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 8px",
    background: "#E41AFA",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontFamily: "Rubik",
    fontWeight: 500,
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(1.1)",
      transition: "all 0.2s ease",
    }
  },
  betButtonLight: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 8px",
    background: "#261B26",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontFamily: "Rubik",
    fontWeight: 500,
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(1.1)",
      transition: "all 0.2s ease",
    }
  },
  betButtonGreen: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 8px",
    background: "#78D532",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontFamily: "Rubik",
    fontWeight: 500,
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(1.1)",
      transition: "all 0.2s ease",
    }
  },
  betButtonOrange: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 8px",
    background: "#DC9200",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontFamily: "Rubik",
    fontWeight: 500,
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(1.1)",
      transition: "all 0.2s ease",
    }
  },
  multiplierText: {
    color: "#bcbebf",
    fontFamily: "Rubik",
    fontWeight: 500,
    fontSize: "12px",
  },
  betSection: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "300px",
    background: "#1E1E1E",
    borderRadius: "16px",
    overflow: "hidden",
  },
  betHeader: {
    display: "flex",
    alignItems: "center",
    padding: "16px 20px",
    gap: "12px",
    background: "#E41AFA",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      filter: "brightness(1.1)",
    },
  },
  betIcon: {
    width: "26px",
    height: "26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoWhiteImg: {
    height: "35px",
    width: "35px",
    objectFit: "contain"
  },
  orangeIcon:{
    height:"25px"
  },
  betHeaderText: {
    color: "white",
    fontSize: "18px",
    fontFamily: "Rubik",
    flex: 1,
  },
  betMultiplier: {
    color: "white",
    fontSize: "18px",
    fontFamily: "Rubik",
  },
  betStats: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#221622",
    margin: "5px 0px",
    borderRadius: "15px 15px 0px 0px",
  },
  betStatsText: {
    color: "white",
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "Rubik",
  },
  betAmount: {
    display: "flex",
    alignItems: "center",
    gap: "0px",
    color: "#FFB019",
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "Rubik",
  },
  betList: {
    display: "flex",
    flexDirection: "column",
  },
  betUser: {
    display: "flex",
    alignItems: "center",
    padding: "12px 10px",
    gap: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    backgroundColor: "#1B1118",
    margin: "2px 8px",
    borderRadius: "10px",
    "&:last-child": {
      borderBottom: "none",
    },
  },
  userAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
  },
  userName: {
    color: "white",
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "Rubik",
    flex: 1,
  },
  userAmount: {
    display: "flex",
    alignItems: "center",
    gap: "0px",
    color: "#FFB019",
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "Rubik",
  },
  coinIcon: {
    height:"44px",
    marginRight:"-8px"
  },
  timerSlider: {
    width: "35%",
    height: "25px",
    background: "#1B1118",
    borderRadius: "16px",
    position: "relative",
    margin: "25px auto 10px",
    overflow: "hidden",
    border: "2px solid #1B1118",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 100%)",
      zIndex: 2,
    }
  },
  timerProgress: {
    width: "50%",
    height: "100%",
    background: "linear-gradient(90deg, #DC9200 0%, #FFA800 100%)",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  timerText: {
    position: "absolute",
    color: "white",
    fontSize: "14px",
    fontFamily: "Rubik",
    fontWeight: 500,
    zIndex: 3,
    textShadow: "0px 2px 4px rgba(0,0,0,0.5)",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
  },
}));

const columns = [
  { id: "game", label: "Game" },
  { id: "player", label: "Player" },
  { id: "wager", label: "Wager" },
  { id: "multiplier", label: "Multiplier" },
  { id: "payout", label: "Payout" },
];

const RouletteNew = () => {
  const classes = useStyles();
  const [betAmount, setBetAmount] = useState("0.00");

  const handleBetAmountChange = (event) => {
    setBetAmount(event.target.value);
  };

  const handleQuickAmount = (amount) => {
    setBetAmount((prev) => (parseFloat(prev) + amount).toFixed(2));
  };

  return (
    <MainLayout>
      <Box className={classes.rouletteWrapper}>
        <Box style={{ width: "100%" }}>
          <Box className={classes.mainContainer}>
              <Box className={classes.topContainer}>
                <Box className={classes.leftContainer}>
                  <Box className={classes.previousRound}>
                    <Typography className={classes.roundTitle}>Previous Round</Typography>
                    <img src={colorfulIcon} alt="icon does not found" className={classes.colorfulIcon} />
                  </Box>
                </Box>
                <Box className={classes.rightContainer}>
                <Typography className={classes.roundTitleRight}>Last 100</Typography>
                  <Box className={classes.last100}>
                    <Box
                      className={classes.resultDot}
                      style={{ background: "#E41AFA" }}
                    >
                      <Typography className={classes.resultNumber}>45</Typography>
                      <img src={logoWhite} alt="logo" className={classes.logoInDot} />
                    </Box>
                    <Box
                      className={classes.resultDot}
                      style={{ background: "#261B26" }}
                    >
                      <Typography className={classes.resultNumber}>35</Typography>
                      <img src={logoWhite} alt="logo" className={classes.logoInDot} />
                    </Box>
                    <Box
                      className={classes.resultDot}
                      style={{ background: "#DC9200" }}
                    >
                      <Typography className={classes.resultNumber}>15</Typography>
                      <img src={logoWhite} alt="logo" className={classes.logoInDot} />
                    </Box>
                    <Box
                      className={classes.resultDot}
                      style={{ background: "#78D532" }}
                    >
                      <Typography className={classes.resultNumber}>5</Typography>
                      <img src={logoWhite} alt="logo" className={classes.logoInDot} />
                    </Box>
                  </Box>
                 
                </Box>
              </Box>

              <Box className={classes.wheelContainer}>
                <Box style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "12px solid transparent",
                  borderRight: "12px solid transparent",
                  borderTop: "18px solid #DC9200",
                  zIndex: 2
                }} />

                <Box className={classes.wheelTiles}>
                  {Array(19).fill(null).map((_, index) => (
                    <Box
                      key={index}
                      className={classes.tile}
                      style={{
                        background: index % 2 === 0 ? "#261B26" : 
                                index % 3 === 0 ? "#78D532" : 
                                index % 5 === 0 ? "#E218E3" : "#DC9200"
                      }}
                    >
                      <img src={logoWhite} alt="logo" className={classes.logoWhiteImg} />
                    </Box>
                  ))}
                </Box>

                <Box className={classes.timerSlider}>
                  <Box 
                    className={classes.timerProgress} 
                    style={{ 
                      width: "50%",
                      transition: "width 1s linear"
                    }}
                  >
                    <Typography className={classes.timerText}>
                      Start in: 7sec
                    </Typography>
                  </Box>
                </Box>
                <Box className={classes.betInputContainer}>
                <TextField
                  className={classes.betInput}
                  variant="filled"
                  placeholder="Enter Amount..."
                  InputProps={{
                    startAdornment: (
                      <img src={orangeIcon} alt="coin" className={classes.inputIcon} />
                    ),
                  }}
                  value={betAmount === "0.00" ? "" : betAmount}
                  onChange={handleBetAmountChange}
                />
                <Box className={classes.quickAmounts}>
                  <Button className={classes.quickAmount} onClick={() => setBetAmount("0.00")}>Clear</Button>
                  <Button className={classes.quickAmount} onClick={() => handleQuickAmount(0.01)}>+0.1</Button>
                  <Button className={classes.quickAmount} onClick={() => handleQuickAmount(1)}>+1</Button>
                  <Button className={classes.quickAmount} onClick={() => handleQuickAmount(10)}>+10</Button>
                  <Button className={classes.quickAmount} onClick={() => handleQuickAmount(100)}>+100</Button>
                  <Button className={classes.quickAmount} onClick={() => setBetAmount((prev) => (parseFloat(prev) / 2).toFixed(2))}>1/2</Button>
                  <Button className={classes.quickAmount} onClick={() => setBetAmount((prev) => (parseFloat(prev) * 2).toFixed(2))}>2x</Button>
                  <Button className={classes.quickAmount} onClick={() => setBetAmount((prev) => Math.max(parseFloat(prev)).toFixed(2))}>Max</Button>
                </Box>
              </Box>
              </Box>
          </Box>
          <Box className={classes.betButtons}>
            <Box className={classes.betButton}>
              <Box className={classes.betButtonRed}>
                <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Box className={classes.betIcon}>
                    <img src={logoWhite} alt="logo white does not found" className={classes.logoWhiteImg} />
                  </Box>
                  <Typography className={classes.betHeaderText}>Place Bet</Typography>
                </Box>
                <Typography className={classes.betMultiplier}>WIN 2x</Typography>
              </Box>

              <Box className={classes.betStats}>
                <Typography className={classes.betStatsText}>4 Bets</Typography>
                <Box className={classes.betAmount}>
                  <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                  8.00
                </Box>
              </Box>

              <Box className={classes.betList}>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.betButton}>
              <Box className={classes.betButtonLight}>
                <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Box className={classes.betIcon}>
                    <img src={logoWhite} alt="logo white does not found" className={classes.logoWhiteImg} />
                  </Box>
                  <Typography className={classes.betHeaderText}>Place Bet</Typography>
                </Box>
                <Typography className={classes.betMultiplier}>WIN 2x</Typography>
              </Box>

              <Box className={classes.betStats}>
                <Typography className={classes.betStatsText}>4 Bets</Typography>
                <Box className={classes.betAmount}>
                  <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                  8.00
                </Box>
              </Box>

              <Box className={classes.betList}>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.betButton}>
              <Box className={classes.betButtonGreen}>
                <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Box className={classes.betIcon}>
                    <img src={logoWhite} alt="logo white does not found" className={classes.logoWhiteImg} />
                  </Box>
                  <Typography className={classes.betHeaderText}>Place Bet</Typography>
                </Box>
                <Typography className={classes.betMultiplier}>WIN 2x</Typography>
              </Box>

              <Box className={classes.betStats}>
                <Typography className={classes.betStatsText}>4 Bets</Typography>
                <Box className={classes.betAmount}>
                  <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                  8.00
                </Box>
              </Box>

              <Box className={classes.betList}>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.betButton}>
              <Box className={classes.betButtonOrange}>
                <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Box className={classes.betIcon}>
                    <img src={logoWhite} alt="logo white does not found" className={classes.logoWhiteImg} />
                  </Box>
                  <Typography className={classes.betHeaderText}>Place Bet</Typography>
                </Box>
                <Typography className={classes.betMultiplier}>WIN 2x</Typography>
              </Box>

              <Box className={classes.betStats}>
                <Typography className={classes.betStatsText}>4 Bets</Typography>
                <Box className={classes.betAmount}>
                  <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                  8.00
                </Box>
              </Box>

              <Box className={classes.betList}>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
                <Box className={classes.betUser}>
                 <img src={userIcon} alt="user icon does not found" className={classes.coinIcon} /> 
                  <Typography className={classes.userName}>Manara</Typography>
                  <Box className={classes.userAmount}>
                     <img src={orangeIcon} alt="icon does not found" className={classes.coinIcon} />
                    4.50
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          
        </Box>
      </Box>
      <CustomTable columns={columns} data={HomeTableData} />
    </MainLayout>
  );
};

export default RouletteNew;
