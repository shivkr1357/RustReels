import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import logo from "../../../assets/Rustreels/Branding/Text/logo_new_home.png";
import avatar from "../../../assets/Rustreels/Branding/userAvatars/userMale.png";
import LeftbarHeader from "./LeftbarHeader";
import ChatInput from "../ChatInput/ChatInput";

const useStyles = makeStyles((theme) => ({
  leftbar: {
    display: "flex",
    flexDirection: "column",
    width: "15vw",
    flex: "0 0 15vw",
    height: "100vh",
    backgroundColor: "#1a1a1a",
    position: "fixed",
    top: 0,
    zIndex: 1000,
    transition: "width 0.3s ease-in-out",

    [theme.breakpoints.down("md")]: {
      width: "20vw",
      flex: "0 0 20vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30vw",
      flex: "0 0 30vw",
    },
    [theme.breakpoints.down("xs")]: {
      width: "70vw",
      position: "fixed",
      height: "100%",
      left: "-100%",
      transition: "left 0.3s ease-in-out",
    },
  },
  openSidebar: {
    left: "0",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",
  },
  headerImage: {
    width: "70px",
    height: "70px",
  },
  userList: {
    flex: 1,
    overflowY: "scroll",
    padding: "10px 0",
    maxHeight: "calc(100vh - 200px)",
  },
  user: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  username: {
    color: "white",
    fontSize: "14px",
    fontWeight: 500,
  },
  message: {
    color: "#a8a8a8",
    fontSize: "12px",
    marginTop: "2px",
  },
  menuButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    color: "white",
    zIndex: 1500,
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "white",
    zIndex: 1500,
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
}));

const Leftbar = () => {
  const classes = useStyles();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Menu Button for Mobile */}
      <IconButton
        className={classes.menuButton}
        onClick={() => setSidebarOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Box className={`${classes.leftbar} ${isSidebarOpen ? classes.openSidebar : ""}`}>
        {/* Close Button for Mobile */}
        <IconButton
          className={classes.closeButton}
          onClick={() => setSidebarOpen(false)}
        >
          <CloseIcon />
        </IconButton>

        <Box className={classes.header}>
          <Box
            component="img"
            src={logo}
            alt="logo"
            className={classes.headerImage}
          />
        </Box>

        <LeftbarHeader />

        <Box className={classes.userList}>
          {Array.from({ length: 15 }, (_, index) => (
            <Box className={classes.user} key={index}>
              <Box
                component="img"
                src={avatar}
                alt="user avatar"
                className={classes.avatar}
              />
              <Box>
                <Typography className={classes.username}>Djaro77</Typography>
                <Typography className={classes.message}>
                  My angelo is gay
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <ChatInput />
      </Box>
    </>
  );
};

export default Leftbar;
