import React from "react";
import MainLayout from "../Layout/MainLayout";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/Settings';
import userIcon from "../../assets/user-icon.png";
import CustomTable from "../CustomTable/CustomTable";
import { HomeTableData } from "./data/dummyData";
import amountIcon from "../../assets/amount-icon.png";
import createButtonImg from "../../assets/createButtonImg.png";
import yellowBall from "../../assets/yellow-ball.png";
import pinkBall from "../../assets/pink-ball.png";
import { Link } from "react-router-dom";
import leftUserIcon from "../../assets/leftUser.png";
import rightUserIcon from "../../assets/rightUser.png";
import hoodie from "../../assets/hoodie.png";
import alienYellow from "../../assets/alien-yellow.png";
import skullPurple from "../../assets/skull-purple.png";
import superman from "../../assets/superman.png";
import blueJacket from "../../assets/blue-jacket.png";
import frostbite from "../../assets/frostbite.png";
import superman2 from "../../assets/superman2.png";
import cross from "../../assets/cross.png";
import skullIcon from "../../assets/skull-icon.png";
import eyeFilled from "../../assets/eye-filled.png";
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
    width: "100%",
    margin: "0 auto 20px",
    overflow: "hidden",
    borderRadius: "10px",
    padding: "20px",
    [theme.breakpoints.down('sm')]: {
      padding: "10px",
    }
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderRadius: "10px",
    background: "#201520",
    padding: "15px 20px",
    "& p": {
      fontSize: "16px",
      color: "#fff",
      margin: 0
    }
  },
  centerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    "& p": {
      fontSize: "12px",
      color: "#fff",
      margin: 0,
      marginBottom: "4px"
    }
  },
  activeGames: {
    color: "#E41AFA",
    fontSize: "12px"
  },
  createButton: {
    background: "#160C0E",
    border: "1px solid #50410A",
    borderRadius: "8px",
    padding: "8px 16px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    "& img": {
      width: "20px",
      height: "20px"
    }
  },
  navItem: {
    fontSize: "12px",
    color: "#fff",
    margin: 0,
    textDecoration: "none"
  },
  recentFlipsContainer: {
    display: "flex",
    width: "100%",
    gap: "15px",
    marginBottom: "20px"
  },
  recentFlipsHeader: {
    color: "#fff",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  coinStripContainer: {
    position: "relative",
    flex: 1,
    overflow: "hidden",
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "60px",
      zIndex: 1
    },
    "&::before": {
      left: 0,
      background: "linear-gradient(90deg, #201520 0%, rgba(32, 21, 32, 0) 100%)"
    },
    "&::after": {
      right: 0,
      background: "linear-gradient(-90deg, #201520 0%, rgba(32, 21, 32, 0) 100%)"
    }
  },
  coinStrip: {
    display: "flex",
    overflowX: "auto",
    position: "relative",
    padding: "0 10px",
    "&::-webkit-scrollbar": {
      display: "none"
    },
    "-ms-overflow-style": "none",
    "scrollbar-width": "none"
  },
  coinWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  ballImage: {
    width: "24px",
    height: "24px",
    objectFit: "contain",
    flexShrink: 0
  },
  coin: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    margin: "0 5px",
    flexShrink: 0,
    "&.orange": {
      background: "linear-gradient(45deg, #FF6B00, #FF9900)"
    },
    "&.purple": {
      background: "linear-gradient(45deg, #E41AFA, #8A1296)"
    }
  },
  lastDiv:{
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flex: "1",
    justifyContent: "space-between",
    padding: "0 10px"
  },
  gameRow: {
    display: "flex",
    alignItems: "center",
    padding: "5px",
    gap: "20px",
    background: "#160d14",
    borderRadius: "8px",
    marginBottom: "8px",
    position: "relative",
    "&:hover": {
      background: "rgba(32, 21, 32, 0.5)"
    }
  },
  darkOverlay: {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      zIndex: 1
    },
    "& > *": {
      opacity: 0.15
    }
  },
  playerSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#1c0d1b",
    padding: "4px",
    borderRadius: "8px",
    position: "relative",
    border:"1px solid #2D222F",
  },
  playerAvatarContainer: {
    position: "relative",
    width: "50px",
    height: "50px",
    "& img": {
      height: "100%",
    }
  },
  crossIcon: {
    color: "#666",
    fontSize: "16px",
    margin: "0 2px",
    fontWeight: "bold"
  },
  itemsSection: {
    display: "flex",
    flex: "0 auto",
    gap: "10px",
    alignItems: "center",
    borderRadius: "8px",
    background: "linear-gradient(to right, #1B0E1B 0%, #160D14 25%, #160D14 75%, #1B0E1B 100%)",    
    padding: "4px 0px 4px 10px",
    marginRight: "20px"
  },
  itemBox: {
    width: "32px",
    height: "32px",
    borderRadius: "4px",
    background: "#2A1F2D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      padding: "4px"
    }
  },
  multiplierBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    "& .multiplier": {
      fontSize: "16px",
      color: "#C1B876",
      fontWeight: "500"
    },
    "& .subtext": {
      fontSize: "10px",
      color: "#666",
      whiteSpace: "nowrap"
    }
  },
  betAmount: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "8px 12px",
    "& img": {
      height: "35px",
      marginRight: "-10px"
    },
    "& span": {
      color: "#C1B876",
      fontSize: "14px"
    }
  },
  eyeFilledContainer: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#201520",
    borderRadius: "4px",
    cursor: "pointer",
    "& img": {
      width: "16px",
      height: "16px",
      opacity: 0.6
    },
    "&:hover img": {
      opacity: 1
    }
  },
  settingsIcon: {
    width: "24px",
    height: "24px",
    color: "#666",
    cursor: "pointer"
  }
}));

const CoinflipNew = () => {
  const classes = useStyles();
  const coins = Array(40).fill('').map((_, i) => i % 2 === 0 ? 'yellow' : 'pink');

  return (
    <MainLayout>
      <Box className={classes.wrapper}>
        <div className={classes.header}>
          <p>Coin Flip</p>
          <div className={classes.centerContainer}>
            <p>Coin Flip</p>
            <span className={classes.activeGames}>3 Active Games</span>
          </div>
          <div className={classes.createButton}>
            <img src={createButtonImg} alt="coin" />
            <Link className={classes.navItem} to="/create-coinflip">Create Coin Flip</Link>
          </div>
        </div>
        <Box className={classes.recentFlipsContainer}>
          <Typography className={classes.recentFlipsHeader}>
            Recent Flips
          </Typography>
          <div className={classes.coinStripContainer}>
            <div className={classes.coinStrip}>
              <div className={classes.coinWrapper}>
                {coins.map((type, index) => (
                  <img
                    key={index}
                    src={type === 'yellow' ? yellowBall : pinkBall}
                    alt={`${type} ball`}
                    className={classes.ballImage}
                  />
                ))}
              </div>
            </div>
          </div>
        </Box>
        {[1, 2, 3, 4, 5, 6].map((game, index) => (
          <div 
            key={game} 
            className={`${classes.gameRow} ${index > 2 ? classes.darkOverlay : ''}`}
          >
            <div className={classes.playerSection}>
              <img src={leftUserIcon} alt="Player 1" style={{height: "80px"}}/>
              <img src={cross} alt="Cross" style={{height: "30px"}}/>
              <img src={rightUserIcon} alt="Player 2" style={{height: "80px"}}/>
            </div>
            
            <div className={classes.itemsSection}>
              <img src={hoodie} alt="hoodie" style={{height: "80px"}}/>
              <img src={alienYellow } alt="alienYellow" style={{height: "80px"}}/>
              <img src={skullPurple} alt="skullPurple" style={{height: "80px"}}/>
              <img src={superman} alt="superman" style={{height: "80px"}}/>
              <img src={blueJacket} alt="blueJacket" style={{height: "80px"}}/>
              <img src={superman2} alt="superman2" style={{height: "80px"}}/>
              <img src={skullIcon} alt="skullIcon" style={{height: "80px"}}/>
              <img src={frostbite} alt="frostbite" style={{height: "80px"}}/>
            </div>
            <div className={classes.lastDiv}>
              <div className={classes.multiplierBox}>
                <span className="multiplier">2×</span>
                <span className="subtext">Double down</span>
              </div>
              
              <div className={classes.betAmount}>
                <img src={amountIcon} alt="coin" />
                <span>50.50</span>
              </div>

              <div className={classes.eyeFilledContainer}>
                <img src={eyeFilled} alt="View" />
              </div>
            </div>
          </div>
        ))}
      </Box>
      <CustomTable columns={columns} data={HomeTableData} />
    </MainLayout>
  );
};

export default CoinflipNew;
