import React from "react";
import MainLayout from "../Layout/MainLayout";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logoWhite from "../../assets/logo-white.png";
import orangeIcon from "../../assets/orange-icon.png";
import userIcon from "../../assets/user-icon.png";
import CustomTable from "../CustomTable/CustomTable";
import { HomeTableData } from "./data/dummyData";
import frostbite from "../../assets/frostbite.png";
import hoodie from "../../assets/hoodie.png";
import alienYellow from "../../assets/alien-yellow.png";
import temperedMask from "../../assets/tempered-mask.png";
import superman from "../../assets/superman.png";
import mainCircle from "../../assets/main-circle.png";
import gubrail from "../../assets/gubrail.png";
import gubrailIcon from "../../assets/gubrail-icon.png";
import maxbell from "../../assets/maxbell.png";
import maxbellIcon from "../../assets/maxbell-icon.png";
import coinIcon from "../../assets/coin-icon.png";

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
    padding: "30px 0",
    margin: "10px 45px",
    [theme.breakpoints.down('sm')]: {
      margin: "10px",
      padding: "20px 0",
    }
  },
  playerSection: {
    display: "flex",
    margin: "0px 75px",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "0 60px",
    position: "relative",
    marginBottom: "40px",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
      margin: "0px 20px",
      padding: "0 20px",
      alignItems: "center",
      gap: "30px",
      position: "relative"
    }
  },
  playerSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  playerInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  avatarContainer: {
    position: "relative",
    width: "70px",
    height: "70px",
    marginBottom: "50px",
  },
  playerAvatar: {
   
  },
  maxbellIcon:{
    position: "absolute",
    width: "300px",
    top: "-80px",
    left: "-112px",
},
  smallCoin: {
    position: "absolute",
    bottom: "-50px",
    right: "-26px",
    width: "34px",
    height: "34px",
  },
  playerName: {
    color: "#fff",
    fontSize: "18px",
    fontFamily: "Rubik",
    fontWeight: 500,
    
    },
   betAmount: {
    color: "#FFB019",
    border: "1px solid #7E7681",
    display: "flex",
    padding: "2px 15px 2px 4px",
    fontSize: "11px",
    background: "#3A3139",
    alignItems: "center",
    fontFamily: "Rubik",
    borderRadius:"10px",
  },
  itemCount: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "12px",
    fontFamily: "Rubik",
    background: "#3A3139",
    padding: "4px 12px",
    borderRadius:"5px",
    border: "1px solid #7E7681"
  },
  winChance: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "12px",
    fontFamily: "Rubik",
    padding: "4px 12px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "4px",
  },
  centerIcon: {
    position: "absolute",
    left: "50%",
    top: "0px",
    transform: "translateX(-50%)",
    height: "180px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down('sm')]: {
      position: "relative",
      left: "auto",
      transform: "none",
      order: -1,
      marginBottom: "20px",
      height: "120px",
      width: "100%",
      display: "flex",
      justifyContent: "center"
    }
  },
  logoIcon: {
    height: "100%",
    objectFit: "contain",
    [theme.breakpoints.down('sm')]: {
      height: "120px"
    }
  },
  itemsContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "5px",
  },
  itemBoxIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    background: "#1B1118",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
  },
  itemBox: {
    width: "45px",
    height: "45px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
  },
  bottomItems: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 40px",
    marginTop: "20px",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      padding: "0 20px",
    }
  },
  itemsBlock: {
    padding: "30px 80px",
    [theme.breakpoints.down('sm')]: {
      padding: "20px",
      width: "90%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  },
  itemsGroup: {
    display: "flex",
    gap: "15px",
    [theme.breakpoints.down('sm')]: {
      justifyContent: "center",
      flexWrap: "wrap",
      width: "100%"
    }
  },
  blockHeader: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "15px",
    gap: "12px",
    [theme.breakpoints.down('sm')]: {
      width: "100%"
    }
  },
  blockHeaderLeft: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "15px",
    gap: "12px",
    [theme.breakpoints.down('sm')]: {
      width: "100%"
    }
  },
  winChanceText: {
    fontSize: "12px",
    fontFamily: "Rubik",
    color: "rgba(255, 255, 255, 0.5)",
  },
  itemWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    padding: "8px 0px",
    backgroundColor: "#1B1118",
    borderRadius: "10px",
    width: "100px",
    [theme.breakpoints.down('sm')]: {
      width: "45%",
      maxWidth: "100px"
    }
  },
  itemName: {
    color: "#fff",
    fontSize: "12px",
    fontFamily: "Rubik",
  },
  itemPrice: {
    display: "flex",
    alignItems: "center",
    color: "#FFB019",
    fontSize: "10px",
    fontFamily: "Rubik",
  },
}));

const CoinflipNew = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <Box className={classes.wrapper}>
        <Box style={{ width: "100%" }}>
          <Box className={classes.mainContainer}>
            <Box className={classes.playerSection}>
              {/* Left Player */}
              <Box className={classes.playerSide}>
                <Box className={classes.playerInfo}>
                <Typography className={classes.playerName}>Maxwell</Typography>
                <Box className={classes.betAmount}>
                    <img src={orangeIcon} alt="coin"  style={{ width: "16px", height: "16px" }} />
                    45.00
                  </Box>
                  <Box className={classes.avatarContainer}>
                      <img src={maxbell} alt="Maxwell"  className={classes.maxbellIcon} />
                    <img src={gubrailIcon} alt="coin" className={classes.smallCoin} />
                  </Box>
                </Box>
              </Box>

              {/* Center Logo */}
              <Box className={classes.centerIcon}>
                <img src={mainCircle} alt="logo" className={classes.logoIcon} />
              </Box>

              {/* Right Player */}
              <Box className={classes.playerSide}>
                <Box className={classes.playerInfo}>
                <Typography className={classes.playerName}>Gubrial</Typography>
                  <Box className={classes.betAmount}>
                    <img src={orangeIcon} alt="coin" style={{ width: "16px", height: "16px" }} />
                    35.00
                  </Box>
                  <Box className={classes.avatarContainer}>
                    <Box 
                      className={classes.playerAvatar}
                      style={{ background: "#DC9200" }}
                    >
                      <img src={gubrail} alt="Gubrial" className={classes.maxbellIcon} />
                    </Box>
                    <img src={maxbellIcon} alt="coin" className={classes.smallCoin} />
                  </Box>
                  
                </Box>
              </Box>
            </Box>

            <Box className={classes.bottomItems}>
              <Box className={classes.itemsBlock}>
                <Box className={classes.blockHeaderLeft}>
                  <Typography className={classes.itemCount}>2 Item</Typography>
                  <Typography className={classes.winChanceText}>48.00% Win Chance</Typography>
                </Box>
                <Box className={classes.itemsGroup}>
                  <Box className={classes.itemWrapper}>
                    <img src={frostbite} className={classes.itemBoxIcon} alt="Frostbite" />
                    <Typography className={classes.itemName}>Frostbite</Typography>
                    <Box className={classes.itemPrice}>
                      <img src={orangeIcon} alt="coin" style={{ width: "14px", height: "14px" }} />
                      10.00
                    </Box>
                  </Box>
                  <Box className={classes.itemWrapper}>
                    <img src={hoodie} className={classes.itemBoxIcon} alt="Hoodie" />
                    <Typography className={classes.itemName}>Hoodie</Typography>
                    <Box className={classes.itemPrice}>
                      <img src={orangeIcon} alt="coin" style={{ width: "14px", height: "14px" }} />
                      10.00
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className={classes.itemsBlock}>
                <Box className={classes.blockHeader}>
                  <Typography className={classes.winChanceText}>48.00% Win Chance</Typography>
                  <Typography className={classes.itemCount}>3 Item</Typography>
                </Box>
                <Box className={classes.itemsGroup}>
                  <Box className={classes.itemWrapper}>
                    <img src={temperedMask} className={classes.itemBoxIcon} alt="Tempered Mask" />
                    <Typography className={classes.itemName}>Tempered Mask</Typography>
                    <Box className={classes.itemPrice}>
                      <img src={orangeIcon} alt="coin" style={{ width: "14px", height: "14px" }} />
                      10.00
                    </Box>
                  </Box>
                  <Box className={classes.itemWrapper}>
                    <img src={alienYellow} className={classes.itemBoxIcon} alt="Alien Yellow" />
                    <Typography className={classes.itemName}>Alien Yellow</Typography>
                    <Box className={classes.itemPrice}>
                      <img src={orangeIcon} alt="coin" style={{ width: "14px", height: "14px" }} />
                      10.00
                    </Box>
                  </Box>
                  <Box className={classes.itemWrapper}>
                    <img src={superman} className={classes.itemBoxIcon} alt="Superman" />
                    <Typography className={classes.itemName}>Superman</Typography>
                    <Box className={classes.itemPrice}>
                      <img src={orangeIcon} alt="coin" style={{ width: "14px", height: "14px" }} />
                      10.00
                    </Box>
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

export default CoinflipNew;
