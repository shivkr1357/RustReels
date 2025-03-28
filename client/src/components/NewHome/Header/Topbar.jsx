import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import loginIcon from "../../../assets/Rustreels/Branding/icons/loginIcon.png";

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
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    marginRight: "20px",
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
    marginLeft: "50px",
    background:
      "linear-gradient(to right, #872B6E 0%, #532548 49%, #1E101D 100%)",
    color: "white",
  },
  gamesIcon: {
    fontSize: 18,
    color: "white",
  },
  dot: {
    color: "#872b6e",
    marginLeft: "4px",
  },
  loginImage: {
    width: "114px",
    height: "44px",
    marginRight: "20px",
  },
}));

const Topbar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.topbar}>
        <Box className={classes.topbarLeft}>
          <Box className={`${classes.navItem} ${classes.gamesNavItem}`}>
            <ChatIcon className={classes.gamesIcon} />
            <Typography variant="body2">Games</Typography>
          </Box>

          <Box className={classes.navItem}>
            <Typography variant="body2">Earn With Us</Typography>
          </Box>

          <Box className={classes.navItem}>
            <Typography variant="body2">Leaderboard</Typography>
          </Box>

          <Box className={classes.navItem}>
            <Typography variant="body2">Rewards</Typography>
            <span className={classes.dot}>•</span>
          </Box>

          <Box className={classes.navItem}>
            <Typography variant="body2">Free Coins</Typography>
          </Box>
        </Box>

        <Box className={classes.topbarRight}>
          <Box
            component="img"
            src={loginIcon}
            alt="user"
            className={classes.loginImage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
