import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, InputBase } from "@material-ui/core";
import logo from "../../../assets/Rustreels/Branding/Text/logo_new_home.png";
import avatar from "../../../assets/Rustreels/Branding/userAvatars/userMale.png";
import LeftbarHeader from "./LeftbarHeader";

const useStyles = makeStyles(theme => ({
  leftbar: {
    display: "flex",
    flexDirection: "column",
    width: "196px",
    height: "100vh",
    backgroundColor: "#1a1a1a",
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
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  userList: {
    flex: 1,
    overflowY: "auto",
    padding: "10px 0",
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
  userInfo: {
    flex: 1,
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
  messageInput: {
    padding: "15px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "4px",
    color: "white",
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
}));

const Leftbar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.leftbar}>
      <Box className={classes.header}>
        <Box
          component="img"
          src={logo}
          alt="logo"
          className={classes.headerImage}
        />
      </Box>

      <Box className={classes.headerContainer}>
        <LeftbarHeader />
      </Box>

      <Box className={classes.userList}>
        {Array.from({ length: 15 }, (_, index) => (
          <Box className={classes.user} key={index}>
            <Box
              component="img"
              src={avatar}
              alt="user avatar"
              className={classes.avatar}
            />
            <Box className={classes.userInfo}>
              <Typography className={classes.username}>Djaro77</Typography>
              <Typography className={classes.message}>
                My angelo is gay
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box className={classes.messageInput}>
        <InputBase
          placeholder="Send Message"
          className={classes.input}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default Leftbar;
