import React from "react";
import MainLayout from "../Layout/MainLayout";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import orangeIcon from "../../assets/orange-icon.png";
import userIcon from "../../assets/user.png";
import eyeIcon from "../../assets/eye.png";
import timerIcon from "../../assets/timer.svg";
import jackportIcon2 from "../../assets/jackport-icon2.png";
import jackportIcon1 from "../../assets/jackport-icon1.png";
import personIcon from "../../assets/person-icon.png";
import skullIcon from "../../assets/skull-icon.png";
import lineIcon from "../../assets/line.png";
import CustomTable from "../CustomTable/CustomTable";
import { HomeTableData } from "./data/dummyData";

const columns = [
  { id: "game", label: "Game" },
  { id: "player", label: "Player" },
  { id: "wager", label: "Wager" },
  { id: "multiplier", label: "Multiplier" },
  { id: "payout", label: "Payout" },
];

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    display: "flex",
    width: "100%",
    margin: "0 auto 20px",
    overflow: "hidden",
    borderRadius: "10px",
    justifyContent: "center",
    padding: "20px",
    [theme.breakpoints.down('sm')]: {
      padding: "10px",
    }
  },
  mainContainer: {
    borderRadius: "30px",
    backgroundColor: "#160D14",
    border: "1px solid #211A20",
    marginBottom: "30px",
    padding: "30px",
    margin: "10px 45px",
    [theme.breakpoints.down('sm')]: {
      margin: "10px",
      padding: "20px",
    }
  },
  topSection: {
    background: "#160D14",
    borderRadius: "20px",
    padding: "10px 30px",
    marginBottom: "30px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "40px",
    [theme.breakpoints.down('sm')]: {
      gap: "15px",
    }
  },
  headerTop: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
      gap: "15px",
    }
  },
  jackpotTitle: {
    color: "#fff",
    fontSize: "24px",
    fontFamily: "Rubik",
    fontWeight: 500,
  },
  statsContainer: {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flexWrap: "wrap",
      gap: "15px",
      width: "100%",
    }
  },
  statBox: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "12px",
    fontFamily: "Rubik",
  },
  statValue: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#FFB019",
    fontSize: "14px",
    fontFamily: "Rubik",
  },
  historyButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#1B1118",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    "&:hover": {
      background: "#2B1B28",
    }
  },
  historyText: {
    color: "#fff",
    fontSize: "14px",
    fontFamily: "Rubik",
  },
  wheelContainer: {
    position: "relative",
    width: "100%",
  },
  arrowIndicator: {
    position: "absolute",
    top: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "12px solid transparent",
    borderRight: "12px solid transparent",
    borderTop: "12px solid #E41AFA",
    filter: "drop-shadow(0 0 8px rgba(228, 26, 250, 0.5))",
    zIndex: 2
  },
  wheelTrackContainer: {
    width: "100%",
    background: "#0B050D",
    padding: "20px 0",
    overflow: "hidden",
    height: "80px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    gap:"5px",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      width: "100px",
      height: "100%",
      background: "linear-gradient(90deg, #0B050D 0%, transparent 100%)",
      zIndex: 1,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      top: 0,
      width: "100px",
      height: "100%",
      background: "linear-gradient(-90deg, #0B050D 0%, transparent 100%)",
      zIndex: 1,
    }
  },
  wheelTrack: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    position: "relative",
    zIndex: 0,
  },
  playerTile: {
    width: "76px",
    height: "76px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    background: "#1B1118",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    position: "relative",
    backgroundImage: `url(${jackportIcon1})`,
    backgroundRepeat: "no-repeat",      
    backgroundPosition: "center",      
    backgroundSize: "contain",  
  },
  playerTile2: {
    width: "76px",
    height: "76px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    background: "#1B1118",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    position: "relative",
    backgroundImage: `url(${jackportIcon2})`,
    backgroundRepeat: "no-repeat",      
    backgroundPosition: "center",      
    backgroundSize: "contain",  
  },
  playerChance: {
    position: "absolute",
    bottom: "0px", 
    left: "50%",
    transform: "translateX(-50%)",
    color: "#FF0000",
    fontSize: "10px",
    fontFamily: "Rubik",
  },
  timerSlider: {
    width: "350px",
    height: "15px",
    background: "#1B1118",
    borderRadius: "12px",
    margin: "30px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timerProgress: {
    width: "50%",
    height: "100%",
    background: "linear-gradient(90deg, #FFB019 0%, #F6D365 100%)",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(255, 176, 25, 0.3)",
    display: "flex",             
    justifyContent: "center",   
    alignItems: "center",
  },
  timerText: {
    color: "#000",
    fontSize: "12px",
    fontFamily: "Rubik",
    whiteSpace: "nowrap",
    textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  },
  timerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  playersSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "0 20px",
  },
  playerCount: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  countIcon: {
    height: "10px",
  },
  countText: {
    color: "#fff",
    fontSize: "14px",
    fontFamily: "Rubik",
  },
  watchingCount: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "14px",
    fontFamily: "Rubik",
  },
  playersList: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: "1fr",
    }
  },
  playerCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#1B1118",
    padding: "5px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  firstPlayerCard: {
    background: "linear-gradient(90deg, #503D4D 0%, #332632 36%, #332632 67%, #503D4D 100%)", 
  },
  playerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  playerDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  playerName: {
    color: "#fff",
    fontSize: "12px",
    fontFamily: "Rubik",
  },
  playerUsername: {
    color: "#7E7681",
    fontSize: "10px",
    fontFamily: "Rubik",
  },
  itemPrice: {
    display: "flex",
    alignItems: "center",
    color: "#7E7681",
    fontSize: "10px",
    fontFamily: "Rubik",
  },
  skullIcon:{
    width: "40px",
    height: "40px",
    borderRadius:"20px",
    background: "#342032",
    border: "1px solid #392C38",
  },
  lineIcon:{
    display: "flex",
    alignItems: "center",
  }
}));

const JackpotNew = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <Box className={classes.wrapper}>
        <Box style={{ width: "100%" }}>
          <Box className={classes.mainContainer}>
            <Box className={classes.topSection}>
              {/* Header Stats */}
              <Box className={classes.header}>
                <Box className={classes.headerTop}>
                  <Typography className={classes.jackpotTitle}>Jackpot</Typography>
                  <Box className={classes.statsContainer}>
                    <Box className={classes.statBox}>
                      <Typography className={classes.statLabel}>Total Amount</Typography>
                      <Box className={classes.statValue}>
                        <img src={orangeIcon} alt="coin" style={{ width: "16px", height: "16px" }} />
                        1000.00
                      </Box>
                    </Box>
                    <Box className={classes.statBox}>
                      <Typography className={classes.statLabel}>Deposited Value</Typography>
                      <Box className={classes.statValue}>
                        <img src={orangeIcon} alt="coin" style={{ width: "16px", height: "16px" }} />
                        3000.00
                      </Box>
                    </Box>
                    <Box className={classes.statBox}>
                      <Typography className={classes.statLabel}>Total Items</Typography>
                      <Box className={classes.statValue}>25/100</Box>
                    </Box>
                    <Box className={classes.statBox}>
                      <Typography className={classes.statLabel}>Your Chance</Typography>
                      <Box className={classes.statValue}>25.30%</Box>
                    </Box>
                  </Box>
                  <Box className={classes.historyButton}>
                    <img src={timerIcon} alt="history" style={{ width: "16px", height: "16px" }} />
                    <Typography className={classes.historyText}>History</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Wheel Section */}
              <Box className={classes.wheelContainer}>
                <Box className={classes.arrowIndicator} />
                <Box className={classes.wheelTrackContainer}>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile}>
                      <Typography className={classes.playerChance}>8.00%</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile2}>
                      <Typography className={classes.playerChance}>25.00%</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile}>
                      <Typography className={classes.playerChance}>8.00%</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile2}>
                      <Typography className={classes.playerChance}>25.00%</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile}>
                      <Typography className={classes.playerChance}>8.00%</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile2}>
                      <Typography className={classes.playerChance}>25.00%</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile}>
                      <Typography className={classes.playerChance}>8.00%</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile2}>
                      <Typography className={classes.playerChance}>25.00%</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile}>
                      <Typography className={classes.playerChance}>8.00%</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile2}>
                      <Typography className={classes.playerChance}>25.00%</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile}>
                      <Typography className={classes.playerChance}>8.00%</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.wheelTrack}>
                    <Box className={classes.playerTile2}>
                      <Typography className={classes.playerChance}>25.00%</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Timer Section */}
              <Box className={classes.timerContainer}>
                <Box className={classes.timerSlider}>
                  <Box className={classes.timerProgress}>
                    <Typography className={classes.timerText}>Start in: 7sec</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Players Section */}
            <Box className={classes.playersSection}>
              <Box className={classes.playerCount}>
                <img src={userIcon} alt="players" className={classes.countIcon} />
                <Typography className={classes.countText}>9 Players</Typography>
              </Box>
              <Box className={classes.playerCount}>
                <img src={eyeIcon} alt="watching" className={classes.countIcon} />
                <Typography className={classes.watchingCount}>20 Watching</Typography>
              </Box>
            </Box>

            {/* Players List */}
            <Box className={classes.playersList}>
              {[...Array(9)].map((_, index) => (
                <Box key={index} className={`${classes.playerCard} ${index === 0 ? classes.firstPlayerCard : ""}`}>
                  <Box className={classes.playerInfo}>
                    <img src={personIcon} alt="player" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                    <Box className={classes.playerDetails}>
                      <Typography className={classes.playerName}>Andr Grown</Typography>
                      <Typography className={classes.playerUsername}>@andrgr2030</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.lineIcon}>
                      <img src={lineIcon} alt="line" style={{height: "20px"}}/>
                  </Box>
                  <Box className={classes.playerInfo}>
                    <img src={skullIcon} alt="player" className={classes.skullIcon}/>
                    <Box className={classes.playerDetails}>
                      <Typography className={classes.playerName}>Item Price</Typography>
                      <Box className={classes.itemPrice}>
                        <img src={orangeIcon} alt="coin" style={{height: "25px" , margin: "0px -8px"}} />
                        600.00
                      </Box>
                    </Box>
                  </Box>
                  
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <CustomTable columns={columns} data={HomeTableData} />
    </MainLayout>
  );
};

export default JackpotNew;
