import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import MainLayout from "../Layout/MainLayout";
import rank1Icon from "../../assets/rank1.png";
import rank2Icon from "../../assets/rank2.png";
import rank3Icon from "../../assets/rank3.png";
import ultralexIcon from "../../assets/ultralex-icon.png";
import klaxxonIcon from "../../assets/klaxxon-icon.png";
import morderIcon from "../../assets/morder-icon.png";
import playerIcon from "../../assets/playerIcon.png";
import bitCoin from "../../assets/bit-coin.png";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import boxIcon from "../../assets/box-icon.png";


const useStyles = makeStyles((theme) => ({
  wrapper: {
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
    width: "100%",
    borderRadius: "10px",
    padding: "0px 10px",
    border: "1px solid #211A20",
    background: "linear-gradient(180deg, #17091C 0%, #0B050D 100%)",
    [theme.breakpoints.down('sm')]: {
      margin: "10px",
      padding: "20px",
    }
  },
  topContainer:{
    width: "100%",
    display: "flex",
    alignItems: "center",
    
  },
  topBarContainer: {
    borderRadius: "10px",
    padding: "12px 20px",
    marginBottom: "20px",
    width: "100%",
    [theme.breakpoints.down('md')]: {
      padding: "12px",
    }
  },
  playersList: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.down('md')]: {
      gap: "10px",
      flexDirection: "column",
    }
  },
  playerItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #3E1334",
    borderRadius: "10px",
    background: "#221028",
    padding: "8px 16px",
    flex: "1 1 0",
    width: "calc(25% - 15px)",
    gap:"60px",
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  playerDetailsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: 0,
  },
  playerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: 0,
  },
  playerAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  playerName: {
    color: "#fff",
    fontSize: "14px",
    fontFamily: "Rubik",
    fontWeight: "500",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  playerType: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "10px",
    fontFamily: "Rubik",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  scoreContainer: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexShrink: 0,
    padding: "4px 0",
  },
  coinIcon: {
    width: "14px",
    height: "14px",
  },
  scoreText: {
    color: "#FFB019",
    fontSize: "12px",
    fontFamily: "Rubik",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    "&::after": {
      content: "'SB'",
      fontSize: "10px",
      opacity: 0.7,
    }
  },
  bottomContainer: {
    width: "100%",
    display: "flex",
    position: "relative",
    minHeight: "600px",
    gap: "20px",
    // padding: "30px",
    flexDirection: "column",
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
    }
  },
  bottomLeftContainer: {
    flex: 1,
    minHeight: "300px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "10px",
    width: "100%",
    marginBottom: "20px",
    [theme.breakpoints.up('md')]: {
      width: "auto",
      marginBottom: 0,
    }
  },
  bottomCenterContainer: {
    flex: 1,            
    minHeight: "300px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "10px",
    width: "100%",
    marginBottom: "20px",
    [theme.breakpoints.up('md')]: {
      width: "auto",
      marginBottom: 0,
    }
  },
  bottomRightContainer: {
    flex: 1,
    minHeight: "300px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "10px",
    width: "100%",
    [theme.breakpoints.up('md')]: {
      width: "auto",
    }
  },
  bottomLeftInside: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  bottomCenterInside: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomRightInside: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boxIcon: {
    height: "250px",
    position: "absolute",
    bottom: "0px",
    width: "auto",
    [theme.breakpoints.up('md')]: {
      height: "350px",
    }
  },  
  boxIcon2: {
    height: "250px",
    position: "absolute",
    bottom: "0px",
    width: "auto",
    [theme.breakpoints.up('md')]: {
      height: "350px",
    }
  },  
  boxIcon3: {
    height: "250px",
    position: "absolute",
    bottom: "0px",
    width: "auto",
    [theme.breakpoints.up('md')]: {
      height: "350px",
    }
  },
  morderIcon: {
    height: "150px",
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translate(-50%, 0)",
    zIndex: 2,
    width: "auto",
    [theme.breakpoints.up('md')]: {
      height: "200px",
      top: "30px",
    }
  },
  klaxxonIcon: {
    height: "150px",
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translate(-50%, 0)",
    zIndex: 2,
    width: "auto",
    [theme.breakpoints.up('md')]: {
      height: "200px",
      top: "20px",
    }
  },
  ultralexIcon: {
    height: "150px",
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translate(-50%, 0)",
    zIndex: 2,
    width: "auto",
    [theme.breakpoints.up('md')]: {
      height: "200px",
      top: "30px",
    }
  },
  playerStats: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 3,
    width: "100%",
    padding: "0 20px",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    gap: "10px",
    position: "relative",
  },
  statBox: {
    flex: 1,
    backgroundColor: "#160D14",
    borderRadius: "8px",
    padding: "8px 12px",
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "12px",
    marginBottom: "4px",
  },
  statValue: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#FFB019",
    fontSize: "14px",
  },
  sbText: {
    opacity: 0.7,
    fontSize: "12px",
    marginLeft: "2px",
  },
  rankBadge: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#E41AFA",
    color: "#FFFFFF",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
    zIndex: 4,
  },
  // Leaderboard table styles
  leaderboardContainer: {
    width: "100%",
    margin: "20px 0",
    padding: "20px",
    borderRadius: "10px",
    // background: "linear-gradient(180deg, #17091C 0%, #0B050D 100%)",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  tableHeaderItem: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "12px",
    fontWeight: "500",
  },
  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.03)",
    },
  },
  placeColumn: {
    width: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  placeIconContainer: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
  },
  placeIconGold: {
    backgroundColor: "#D4AF37",
  },
  placeIconGreen: {
    backgroundColor: "#00FF00",
  },
  placeIconPurple: {
    backgroundColor: "#E41AFA",
  },
  placeIcon: {
    width: "20px",
    height: "20px",
  },
  placeNumber: {
    color: "#FFFFFF",
    fontSize: "14px",
  },
  wagerColumn: {
    width: "20%",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  lastActivityColumn: {
    width: "20%",
    color: "#FFFFFF",
    fontSize: "14px",
  },
  rewardColumn: {
    width: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "5px",
  },
  coinAmount: {
    color: "#FFB019",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "2px",
  }
}));

const BlackJackNew = () => {
  const classes = useStyles();

  const topPlayers = [
    { 
      name: "KLAXXON", 
      type: "In card games",
      avatar: user1,
      amount: "40.10",
    },
    { 
      name: "KLAXXON", 
      type: "In original",
      avatar: user2,
      amount: "40.10",
    },
    { 
      name: "ULTRALEX", 
      type: "In card games",
      avatar: user3,
      amount: "40.10",
    },
    { 
      name: "KLAXXON", 
      type: "In card games",
      avatar: user1,
      amount: "40.10",
    }
  ];

  const leaderboardData = [
    { id: 1, player: "Jwoodhal117", wager: "01.00", lastActivity: "1d ago", reward: "01.00" },
    { id: 2, player: "Jwoodhal117", wager: "01.00", lastActivity: "1d ago", reward: "01.00" },
    { id: 3, player: "Jwoodhal117", wager: "01.00", lastActivity: "1d ago", reward: "01.00" },
    { id: 4, player: "Jwoodhal117", wager: "01.00", lastActivity: "1d ago", reward: "01.00" },
    { id: 5, player: "Jwoodhal117", wager: "01.00", lastActivity: "1d ago", reward: "01.00" },
    { id: 6, player: "Jwoodhal117", wager: "01.00", lastActivity: "1d ago", reward: "01.00" },
    { id: 7, player: "Jwoodhal117", wager: "01.00", lastActivity: "1d ago", reward: "01.00" },
    { id: 8, player: "Jwoodhal117", wager: "01.00", lastActivity: "1d ago", reward: "01.00" },
    { id: 9, player: "Jwoodhal117", wager: "01.00", lastActivity: "1d ago", reward: "01.00" }
  ];

  // Function to render place column based on position
  const renderPlaceColumn = (position) => {
    if (position === 1) {
      return (
        <Box className={`${classes.placeIconContainer} ${classes.placeIconGold}`}>
          <img src={rank1Icon} alt="1st Place" className={classes.placeIcon} />
        </Box>
      );
    } else if (position === 2) {
      return (
        <Box className={`${classes.placeIconContainer} ${classes.placeIconGreen}`}>
          <img src={rank2Icon} alt="2nd Place" className={classes.placeIcon} />
        </Box>
      );
    } else if (position === 3) {
      return (
        <Box className={`${classes.placeIconContainer} ${classes.placeIconPurple}`}>
          <img src={rank3Icon} alt="3rd Place" className={classes.placeIcon} />
        </Box>
      );
    } else {
      return <Typography className={classes.placeNumber}>{position}</Typography>;
    }
  };

  return (
    <MainLayout>
      <Box className={classes.wrapper}>
        {/* Main Container */}
        <Box className={classes.mainContainer}>
          <Box className={classes.topContainer}>
            <Box className={classes.topBarContainer}>
              <Box className={classes.playersList}>
                {topPlayers.map((player, index) => (
                  <Box key={index} className={classes.playerItem}>
                    <Box className={classes.playerDetailsContainer}>
                      <img 
                        src={player.avatar} 
                        alt={player.name} 
                        className={classes.playerAvatar}
                      />
                      <Box className={classes.playerInfo}>
                        <Typography className={classes.playerName}>{player.name}</Typography>
                        <Typography className={classes.playerType}>{player.type}</Typography>
                      </Box>
                    </Box>
                    <Box className={classes.scoreContainer}>
                      <img src={bitCoin} alt="coin" className={classes.coinIcon} />
                      <Typography className={classes.scoreText}>{player.amount}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box className={classes.bottomContainer}>
            <Box className={classes.bottomLeftContainer}>
              <img src={morderIcon} alt="morderIcon" className={classes.morderIcon} />
              <img src={boxIcon} alt="boxIcon" className={classes.boxIcon} />
              <Box className={classes.playerStats}>
                <Typography className={classes.playerName}>MORDER</Typography>
                <Box className={classes.statsRow}>
                  <Box className={classes.statBox}>
                    <Typography className={classes.statLabel}>Wagered</Typography>
                    <Box className={classes.statValue}>
                      <img src={bitCoin} alt="coin" className={classes.coinIcon} />
                      <span>40.10</span>
                      <span className={classes.sbText}>SB</span>
                    </Box>
                  </Box>
                  <Box className={classes.rankBadge}>#2</Box>
                  <Box className={classes.statBox}>
                    <Typography className={classes.statLabel}>Reward</Typography>
                    <Box className={classes.statValue}>
                      <img src={bitCoin} alt="coin" className={classes.coinIcon} />
                      <span>400.00</span>
                      <span className={classes.sbText}>SB</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.bottomCenterContainer}>
              <img src={klaxxonIcon} alt="klaxxonIcon" className={classes.klaxxonIcon} />
              <img src={boxIcon} alt="boxIcon" className={classes.boxIcon2} />
              
            </Box>
            <Box className={classes.bottomRightContainer}>
              <img src={ultralexIcon} alt="ultralexIcon" className={classes.ultralexIcon} />
              <img src={boxIcon} alt="boxIcon" className={classes.boxIcon3} />
            </Box>
          </Box>
        </Box>
         {/* Leaderboard Table */}
         <Box className={classes.leaderboardContainer}>
          <Box className={classes.tableHeader}>
            <Typography className={classes.tableHeaderItem} style={{ width: "15%" }}>Place</Typography>
            <Typography className={classes.tableHeaderItem} style={{ width: "25%" }}>Player</Typography>
            <Typography className={classes.tableHeaderItem} style={{ width: "20%" }}>Wager</Typography>
            <Typography className={classes.tableHeaderItem} style={{ width: "20%" }}>Last Activity</Typography>
            <Typography className={classes.tableHeaderItem} style={{ width: "20%" }}>Reward</Typography>
          </Box>
          
          {leaderboardData.map((item, index) => (
            <Box key={index} className={classes.tableRow}>
              <Box className={classes.placeColumn}>
                {renderPlaceColumn(item.id)}
              </Box>
              <Box className={classes.playerColumn}>
                <img src={playerIcon} alt="Player" className={classes.playerAvatar} />
                <Typography className={classes.playerName}>{item.player}</Typography>
              </Box>
              <Box className={classes.wagerColumn}>
                <img src={bitCoin} alt="coin" className={classes.coinIcon} />
                <Typography className={classes.coinAmount}>
                  {item.wager}
                  <span className={classes.sbText}>SB</span>
                </Typography>
              </Box>
              <Typography className={classes.lastActivityColumn}>{item.lastActivity}</Typography>
              <Box className={classes.rewardColumn}>
                <img src={bitCoin} alt="coin" className={classes.coinIcon} />
                <Typography className={classes.coinAmount}>
                  {item.reward}
                  <span className={classes.sbText}>SB</span>
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      
      </Box>
    </MainLayout>
  );
};

export default BlackJackNew;
