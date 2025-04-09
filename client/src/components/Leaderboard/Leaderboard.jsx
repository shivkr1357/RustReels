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
import leftBox from "../../assets/leftBox.png";
import centerBox from "../../assets/centerBox.png";
import rightBox from "../../assets/rightBox.png";

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
    marginBottom: "2px",
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
    width: "92%",
    display: "flex",
    position: "relative",
    minHeight: "550px",
    gap: "50px",
    margin:"0px 50px",
    flexDirection: "column",
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down('md')]: {
      width: "100%",
      gap: "20px",
      margin:"0px"
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
    bottom: "20px",
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
    top: "45px",
    left: "50%",
    transform: "translate(-50%, 0)",
    zIndex: 2,
    width: "auto",
    [theme.breakpoints.up('md')]: {
      height: "200px",
      top: "45px",
    }
  },
  klaxxonIcon: {
    height: "150px",
    position: "absolute",
    top: "14px",
    left: "50%",
    transform: "translate(-50%, 0)",
    zIndex: 2,
    width: "auto",
    [theme.breakpoints.up('md')]: {
      height: "200px",
      top: "14px",
    }
  },
  ultralexIcon: {
    height: "150px",
    position: "absolute",
    top: "45px",
    left: "50%",
    transform: "translate(-50%, 0)",
    zIndex: 2,
    width: "auto",
    [theme.breakpoints.up('md')]: {
      height: "200px",
      top: "45px",
    }
  },
  playerStats: {
    position: "absolute",
    bottom: "180px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 3,
    width: "100%",
    padding: "0 20px",
    // [theme.breakpoints.down('md')]: {
    //   bottom: "150px",
    // },
    // [theme.breakpoints.down('sm')]: {
    //   bottom: "10px",
    // }
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    gap: "50px",
    position: "relative",
    // [theme.breakpoints.down('md')]: {
    //  flexDirection: "column",
    //  width:"auto"
    // }
  },
  statBox: {
    flex: 1,
    borderRadius: "8px",
    padding: "8px 30px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
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
    border: "1px solid #B03CB1",
    boxShadow: "inset 0 0 19px #3C293D",
    color: "#FFFFFF",
    width: "48px",
    height: "48px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
    zIndex: 4,
  },
  // Leaderboard table styles
  leaderboardContainer: {
    width: "100%",
    margin: "20px 0",
    padding: "20px",
    borderRadius: "10px",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    marginBottom: "10px",
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
    borderRadius: "10px",
    margin: "8px 0",
    height: "50px",
    backgroundColor: "#0C040B",
    "&:nth-child(2)": {
      backgroundColor: "#130812",
      background: "linear-gradient(90deg, rgba(239, 187, 0, 0.2) 0%, #130812 100%)",
    },
    "&:nth-child(3)": {
      backgroundColor: "#130812",
      background: "linear-gradient(90deg, rgba(0, 255, 0, 0.2) 0%, #130812 100%)",
    },
    "&:nth-child(4)": {
      backgroundColor: "#130812",
      background: "linear-gradient(90deg, rgba(228, 26, 250, 0.2) 0%, #130812 100%)",
    },
    "&:nth-child(even):nth-child(n+5)": {
      backgroundColor: "#130812",
    },
    "&:nth-child(-n+4)": {
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        left: "0px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "3px",
        borderRadius: "0px 3px 3px 0px",
        height: "70%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }
    }
  },
  placeColumn: {
    width: "15%",
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px",
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
    // backgroundColor: "#D4AF37",
  },
  placeIconGreen: {
    // backgroundColor: "#00FF00",
  },
  placeIconPurple: {
    // backgroundColor: "#E41AFA",
  },
  placeIcon: {
    height: "20px",
  },
  placeNumber: {
    color: "#FFFFFF",
    fontSize: "14px",
  },
  playerColumn: {
    width: "31%",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  wagerColumn: {
    width: "22%",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  lastActivityColumn: {
    width: "22%",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  lastActivityItem:{
    fontSize: "12px",
    color: "#FFFFFF",
  },
  rewardColumn: {
    width: "10%",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  coinAmount: {
    color: "#FFB019",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "2px",
  },
  crownIcon: {
    position: "absolute",
    top: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80px",
    height: "80px",
    zIndex: 5,
  },
  avatarWrapper: {
    position: "relative",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: "20px",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }
  },
  avatarWrapperGold: {
    position: "relative",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: "20px",
    border: "2px solid rgba(239, 187, 0, 0.3)",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }
  },
  avatarWrapperGreen: {
    position: "relative",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: "20px",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }
  },
  boxContainer: {
    width: "100%",
    minHeight: "320px",
    background: "linear-gradient(to bottom, #2A112F 0%,#3C1940 40%,rgba(48, 20, 51, 0) 115% )",  
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: "230px",
    transform: "perspective(800px) rotateY(0)",
    transformStyle: "preserve-3d",
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "-200px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "200px",
      height: "200px",
      background: `url(${morderIcon}) center/cover no-repeat`,
      zIndex: 2,
    },
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "-65px",
      height: "65px",
      width: "100%",
      transform: "rotateX(45deg)",
      transformOrigin: "center bottom",
      background: "linear-gradient(to top, #3C1940 0%, rgba(48, 20, 51, 0) 100%)",
      zIndex: 1,
    }
  },
  boxContainer2: {
    width: "100%",
    minHeight: "320px",
    background: "linear-gradient(to bottom, #2A112F 0%,#3C1940 40%,rgba(48, 20, 51, 0) 115% )",  
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: "210px",
    transform: "perspective(800px) rotateY(0)",
    transformStyle: "preserve-3d",
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "-208px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "200px",
      height: "200px",
      background: `url(${klaxxonIcon}) center/cover no-repeat`,
      zIndex: 2,
    },
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "-65px",
      height: "65px",
      width: "100%",
      transform: "rotateX(45deg)",
      transformOrigin: "center bottom",
      background: "linear-gradient(to top, #3C1940 0%, rgba(48, 20, 51, 0) 100%)",
      zIndex: 1,
    }
  },
  boxContainer3: {
    width: "100%",
    minHeight: "320px",
    background: "linear-gradient(to bottom, #2A112F 0%,#3C1940 40%,rgba(48, 20, 51, 0) 115% )",  
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: "230px",
    transform: "perspective(800px) rotateY(0)",
    transformStyle: "preserve-3d",
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "-200px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "200px",
      height: "200px",
      background: `url(${ultralexIcon}) center/cover no-repeat`,
      zIndex: 2,
    },
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "-65px",
      height: "65px",
      width: "100%",
      transform: "rotateX(45deg)",
      transformOrigin: "center bottom",
      background: "linear-gradient(to top, #3C1940 0%, rgba(48, 20, 51, 0) 100%)",
      zIndex: 1,
    }
  },
  boxStats: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  boxStatsItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  boxStatsLabel: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "12px",
    marginBottom: "4px",
  },
  boxStatsValue: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#FFB019",
    fontSize: "14px",
  },
  boxRankBadge: {
    border: "1px solid #E41AFA",
    boxShadow: "inset 0 0 28px rgba(254, 73, 255, 0.3)",
    color:  "#E41AFA",
    width: "48px",
    height: "48px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
}));

const Leaderboard = () => {
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
              <Box className={classes.boxContainer}>
                <Typography variant="h6" className={classes.playerName}>MORDER</Typography>
                <Box className={classes.boxStats}>
                  <Box className={classes.boxStatsItem}>
                    <Typography className={classes.boxStatsLabel}>Wagered</Typography>
                    <Box className={classes.boxStatsValue}>
                      <img src={bitCoin} alt="coin" className={classes.coinIcon} />
                      <span>40.10.58</span>
                      <span className={classes.sbText}>SB</span>
                    </Box>
                  </Box>
                  <Box className={classes.boxRankBadge}>#2</Box>
                  <Box className={classes.boxStatsItem}>
                    <Typography className={classes.boxStatsLabel}>Reward</Typography>
                    <Box className={classes.boxStatsValue}>
                      <img src={bitCoin} alt="coin" className={classes.coinIcon} />
                      <span>400.000</span>
                      <span className={classes.sbText}>SB</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.bottomCenterContainer}>
            <Box className={classes.boxContainer2}>
                <Typography variant="h6" className={classes.playerName}>KLAXXON</Typography>
                <Box className={classes.boxStats}>
                  <Box className={classes.boxStatsItem}>
                    <Typography className={classes.boxStatsLabel}>Wagered</Typography>
                    <Box className={classes.boxStatsValue}>
                      <img src={bitCoin} alt="coin" className={classes.coinIcon} />
                      <span>40.10.58</span>
                      <span className={classes.sbText}>SB</span>
                    </Box>
                  </Box>
                  <Box className={classes.boxRankBadge}>#1</Box>
                  <Box className={classes.boxStatsItem}>
                    <Typography className={classes.boxStatsLabel}>Reward</Typography>
                    <Box className={classes.boxStatsValue}>
                      <img src={bitCoin} alt="coin" className={classes.coinIcon} />
                      <span>400.000</span>
                      <span className={classes.sbText}>SB</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.bottomRightContainer}>
            <Box className={classes.boxContainer3} >
                <Typography variant="h6" className={classes.playerName}>ULTRALEX</Typography>
                <Box className={classes.boxStats}>
                  <Box className={classes.boxStatsItem}>
                    <Typography className={classes.boxStatsLabel}>Wagered</Typography>
                    <Box className={classes.boxStatsValue}>
                      <img src={bitCoin} alt="coin" className={classes.coinIcon} />
                      <span>40.10.58</span>
                      <span className={classes.sbText}>SB</span>
                    </Box>
                  </Box>
                  <Box className={classes.boxRankBadge}>#3</Box>
                  <Box className={classes.boxStatsItem}>
                    <Typography className={classes.boxStatsLabel}>Reward</Typography>
                    <Box className={classes.boxStatsValue}>
                      <img src={bitCoin} alt="coin" className={classes.coinIcon} />
                      <span>400.000</span>
                      <span className={classes.sbText}>SB</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
         {/* Leaderboard Table */}
         <Box className={classes.leaderboardContainer}>
          <Box className={classes.tableHeader}>
            <Typography className={classes.tableHeaderItem} style={{ width: "15%" }}>Place</Typography>
            <Typography className={classes.tableHeaderItem} style={{ width: "31%" }}>Player</Typography>
            <Typography className={classes.tableHeaderItem} style={{ width: "22%" }}>Wager</Typography>
            <Typography className={classes.tableHeaderItem} style={{ width: "22%" }}>Last Activity</Typography>
            <Typography className={classes.tableHeaderItem} style={{ width: "10%" }}>Reward</Typography>
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
              <Box className={classes.lastActivityColumn}>
              <Typography className={classes.lastActivityItem}>{item.lastActivity}</Typography>
              </Box>
             
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

export default Leaderboard; 