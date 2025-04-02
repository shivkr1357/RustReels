import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import robotIcon from "../../../assets/Rustreels/Branding/icons/roboIcon.png";

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
    width: "auto",
    padding: "0 10px",
    borderRadius: "5px",
    background:
      "linear-gradient(to bottom, #872b6e 0%, #532548 49%, #1e101d 100%)",
  },
  iconGroup: {
    display: "flex",
    alignItems: "center",
    padding: "0 2px",
    "& .MuiSvgIcon-root": {
      width: "20px",
      height: "20px",
      margin: "0 3px",
      color: "white",
    },
  },
  robotIcon: {
    width: "20px",
    height: "20px",
    margin: "0 3px",
  },
  rotatedIcon: {
    transform: "rotate(180deg)",
  },
}));

const LeftbarHeader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Box className={classes.iconGroup}>
        <ChatIcon />
        <ShowChartIcon />
        <Box
          component="img"
          src={robotIcon}
          alt="robot"
          className={classes.robotIcon}
        />
      </Box>
      <Box className={classes.iconGroup}>
        <KeyboardTabIcon className={classes.rotatedIcon} />
        <CloseIcon />
      </Box>
    </Box>
  );
};

export default LeftbarHeader;
