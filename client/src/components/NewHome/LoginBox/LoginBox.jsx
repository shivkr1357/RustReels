import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import React from "react";
import logo from "../../../assets/Rustreels/Branding/icons/loginBoxImage.png";
import logo1 from "../../../assets/Rustreels/Branding/icons/loginBoxImage1.png";

const useStyles = makeStyles(theme => ({
  containerTop: {
    width: "100%",
    display: "flex",
    padding: "0px 44px 0px 69px",
    marginTop: "30px",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  leftContainer: {
    width: "67%",
    backgroundImage: `url(${logo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "288px",
    borderRadius: "10px",
  },
  container: {
    width: "30%",
    backgroundImage: `url(${logo1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "30%",
    height: "288px",
    borderRadius: "10px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%", // Make it flexible, so it adjusts based on screen size
    maxWidth: "380px", // Max width ensures it doesn't grow too wide
    padding: "20px",
    marginLeft: "20px",
    boxSizing: "border-box", // Ensures padding doesn't affect the width

    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px", // Adjust margin on smaller screens
      padding: "10px", // Reduce padding for better responsiveness
    },
  },
  textContainer1: {
    display: "flex",
    flexDirection: "column",
    width: "231px",
    marginLeft: "20px",
    padding: "20px",
  },
  title: {
    color: "white",
    fontSize: "24px",
    fontWeight: 500,
    marginTop: "24px",
  },
  title1: {
    color: "white",
    fontSize: "24px",
    fontWeight: 500,
    marginTop: "24px",
  },
  subtitle: {
    color: "#a8a8a8",
    fontSize: "16px",
    marginTop: "12px",

  },
  subtitle1: {
    color: "#a8a8a8",
    fontSize: "16px",
    marginTop: "12px",

  },
  loginButton: {
    background: "#FDF8FF",
    color: "#000",
    padding: "5px 20px",
    borderRadius: "4px",
    marginTop: "24px",
    width: "141px",
    height: "44px",
    textTransform: "none",
    fontSize: "16px",
    "&:hover": {
      opacity: 0.9,
    },
  },
  eventButton: {
    background: "transparent",
    color: "#E9AD00",
    border: "1px solid #7C5A06",
    padding: "5px 20px",
    borderRadius: "5px",
    marginTop: "24px",
    width: "141px",
    height: "44px",
    textTransform: "none",
    fontSize: "16px",

    "&:hover": {
      background: "transparent",
      "&:before": {
        opacity: 0.8,
      },
    },
  },
  "@media (max-width: 1100px)": { 
    containerTop: {
      flexDirection: "column", 
      alignItems: "center",
    },
    leftContainer: {
      width: "100%", 
      height: "auto",
    },
    container: {
      width: "100%",
      marginTop: "20px", 
    },
  },
}));

const LoginBox = ({ onClick, open }) => {
  const classes = useStyles();

  return (
    <Box p={4} className={classes.containerTop}>
      <Box className={classes.leftContainer}>
        <Box className={classes.textContainer}>
          <Typography className={classes.title}>
            Log in with Steam, Google, or Email to access RustReels
          </Typography>

          <Typography className={classes.subtitle}>
            Sign in to RustClash.com with Steam, Google, or Email for a seamless
            and secure experience.
          </Typography>

          <Button className={classes.loginButton} onClick={onClick}>Log In</Button>
        </Box>
      </Box>
      <Box className={classes.container}>
        <Box className={classes.textContainer1}>
          <Typography className={classes.title1}>Free Rewards</Typography>

          <Typography className={classes.subtitle1}>
            Claim daily cases & earn rakeback on all your bets or explore our
            rewards
          </Typography>

          <Button className={classes.eventButton}>View Event</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginBox;
