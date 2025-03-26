import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import React from "react";
import logo from "../../../assets/Rustreels/Branding/icons/loginBoxImage.png";

const useStyles = makeStyles(theme => ({
  textContainer: {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    position: "absolute",
    top: "35%",
    left: "30%",
    transform: "translate(-50%, -50%)",
  },
  image: {
    width: "755px",
    height: "288px",
    padding: "0px",
  },
  title: {
    color: "white",
    fontSize: "24px",
    fontWeight: 500,
    marginTop: "24px",
  },
  subtitle: {
    color: "#a8a8a8",
    fontSize: "16px",
    marginTop: "12px",
    maxWidth: "600px",
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
}));

const LoginBox = () => {
  const classes = useStyles();

  return (
    <Box p={5} className={classes.container}>
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
  );
};

export default LoginBox;
