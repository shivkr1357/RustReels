import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import loginIcon from "../../../assets/Rustreels/Branding/icons/loginIcon.png";
import gameIcon from "../../../assets/gameIcon.png";
import arrowLeft from "../../../assets/arrow_left.png";
import { useSelector } from "react-redux";
const useStyles = makeStyles(theme => ({
  wrapper: {
    width: "100%",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "20px",
    height: "60px",
    color: "white",
  },
  topbarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    marginRight: "50px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#a8a8a8",
    transition: "color 0.2s",
    padding: "8px 16px",
    borderRadius: "4px",
    "&:hover": {
      color: "white",
    },
  },
  gamesNavItem: {
    marginLeft: "70px",
    background:
      "linear-gradient(to right, #872B6E 0%, #532548 49%, #1E101D 100%)",
    color: "white",
  },
  gameIcon: {
    height: "1rem",
  },
  arrowLeft: {
    height: "1rem",
  },
  dot: {
    color: "#FE49FF",
    marginLeft: "-4px",
    marginTop: "-2px",
    fontSize: "3.5rem",
  },
  loginImage: {
    width: "114px",
    height: "44px",
    marginRight: "20px",
    cursor: "pointer",
  },
  "@media (max-width: 1100px)": { // Adjust the breakpoint as needed
    topbar: {
      flexDirection: "column", // Stack items vertically
      height: "auto", // Allow height to adjust dynamically
      textAlign: "center",
      gap: "10px", // Reduce gap for better spacing
    },
    topbarLeft: {
      justifyContent: "center", // Center items for better UI
      width: "100%",
    },
    topbarRight: {
      justifyContent: "center", // Center items for better UI
      width: "100%",
      marginRight: "0px", // Remove right margin for full-width alignment
    },
  },
}));

const Topbar = ({ onClick }) => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.topbar}>
        <Box className={classes.topbarLeft}>
          <Box className={`${classes.navItem} ${classes.gamesNavItem}`}>
            {/* <ChatIcon className={classes.gamesIcon} /> */}
            <img src={gameIcon} className={classes.gameIcon} alt="game icon not found" />
            <Typography variant="body2">Games</Typography>
            <img src={arrowLeft} className={classes.arrowLeft} alt="arrow icon not found" />
          </Box>

          <Box className={classes.navItem}>
            <Typography variant="body2">Earn With Us</Typography>
          </Box>

          <Box className={classes.navItem}>
            <Typography variant="body2">Leaderboard</Typography>
          </Box>

          <Box className={classes.navItem}>
            <Typography variant="body2" style={{ color: "#FE49FF" }}>Rewards</Typography>
            <span className={classes.dot}>•</span>
          </Box>

          <Box className={classes.navItem}>
            <Typography variant="body2">Free Coins</Typography>
          </Box>
        </Box>

        <Box className={classes.topbarRight}>
          {isAuthenticated ? <Typography variant="body2">Log Out</Typography> : (

            <Box
              component="img"
              onClick={onClick}
              src={loginIcon}
              alt="user"
              className={classes.loginImage}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
