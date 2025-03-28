import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import React from "react";
import logo from "../../../assets/Rustreels/Branding/icons/loginBoxImage.png";
import logo1 from "../../../assets/Rustreels/Branding/icons/loginBoxImage1.png";

const useStyles = makeStyles(theme => ({
  containerTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0px 70px",
    marginTop: "30px",
  },
  container: {
    position: "relative",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    width: "380px",
    position: "absolute",
    top: "48%",
    left: "25%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
  },
  textContainer1: {
    display: "flex",
    flexDirection: "column",
    width: "231px",
    position: "absolute",
    top: "48%",
    left: "30%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
  },
  image: {
    width: "100%",
    height: "345px",
    padding: "0px",
  },
  image1: {
    width: "100%",
    height: "345px",
    padding: "0px",
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
    // maxWidth: "600px",
  },
  subtitle1: {
    color: "#a8a8a8",
    fontSize: "16px",
    marginTop: "12px",
    // maxWidth: "600px",
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
}));

const LoginBox = () => {
  const classes = useStyles();

  return (
    <Box p={4} className={classes.containerTop}>
      <Box className={classes.container}>
        <Box component="img" src={logo} alt="logo" className={classes.image} />
        <Box className={classes.textContainer}>
          <Typography className={classes.title}>
            Log in with Steam, Google, or Email to access RustReels
          </Typography>

          <Typography className={classes.subtitle}>
            Sign in to RustClash.com with Steam, Google, or Email for a seamless
            and secure experience.
          </Typography>

          <Button className={classes.loginButton}>Log In</Button>
        </Box>
      </Box>
      <Box className={classes.container}>
        <Box
          component="img"
          src={logo1}
          alt="logo"
          className={classes.image1}
        />
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
