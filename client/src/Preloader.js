import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// MUI Components
import Box from "@material-ui/core/Box";

// Assets
import logo from "./assets/new_logo_1.jpg";

// Custom styles
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    animation: "1.5s ease 0s infinite beat",
    WebkitAnimation: "1.5s ease 0s infinite beat",
    MozAnimation: "1.5s ease 0s infinite beat",
  },
  img: {
    height: "5.5rem",
    marginBottom: "2rem",
  },
  img2: {
    height: "4rem",
  },
}));

const Preloader = () => {
  // Declare State
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <img src={logo} className={classes.img} alt="silorust.com Logo" />
    </Box>
  );
};

export default Preloader;
