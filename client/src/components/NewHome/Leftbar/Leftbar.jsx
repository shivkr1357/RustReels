import React from "react";
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
    height: "100vh",
    backgroundColor: "#1a1a1a",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1200,
    transition: "transform 0.3s ease-in-out",
    [theme.breakpoints.between("sm", "md")]: {
      width: "10vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "250px",
      transform: "translateX(-100%)",
      backgroundColor: "#0B050D",
      borderRight: "1px solid rgba(255, 255, 255, 0.1)",
    },
  },
  leftbarOpen: {
    transform: "translateX(0)",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 12px",
      backgroundColor: "#1a1a1a",
    },
  },
  headerImage: {
    width: "70px",
    height: "70px",
    [theme.breakpoints.down("sm")]: {
      width: "40px",
      height: "40px",
    },
  },
  userList: {
    flex: 1,
    overflowY: "auto",
    padding: "10px 0",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(255, 255, 255, 0.05)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "2px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "5px 0",
    },
  },
  user: {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    marginRight: "8px",
  },
  username: {
    color: "white",
    fontSize: "13px",
    fontWeight: 500,
  },
  message: {
    color: "#a8a8a8",
    fontSize: "11px",
    marginTop: "2px",
    maxWidth: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  closeButton: {
    color: "white",
    padding: "4px",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      "& svg": {
        fontSize: "20px",
      },
    },
  },
  menuButton: {
    position: "fixed",
    top: "8px",
    left: "8px",
    color: "white",
    zIndex: 1300,
    padding: "20px",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      "& svg": {
        fontSize: "24px",
      },
    },
  },
}));

const Leftbar = ({ isOpen, onToggle }) => {
  const classes = useStyles();

  return (
    <>
      <IconButton className={classes.menuButton} onClick={onToggle}>
        <MenuIcon />
      </IconButton>

      <Box className={`${classes.leftbar} ${isOpen ? classes.leftbarOpen : ""}`}>
        <Box className={classes.header}>
          <Box
            component="img"
            src={logo}
            alt="logo"
            className={classes.headerImage}
          />
          <IconButton className={classes.closeButton} onClick={onToggle}>
            <CloseIcon />
          </IconButton>
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
