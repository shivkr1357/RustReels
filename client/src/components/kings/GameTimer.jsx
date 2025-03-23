import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "inline-flex",
    margin: theme.spacing(2, 0),
  },
  timer: {
    position: "relative",
  },
  progress: {
    position: "absolute",
    left: 0,
    color: "#4caf50",
  },
  timeText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    color: "#9e9e9e",
    textAlign: "center",
    marginTop: theme.spacing(1),
    fontSize: "0.875rem",
  },
}));

const GameTimer = ({ timeLeft, maxTime }) => {
  const classes = useStyles();
  const progress = (timeLeft / maxTime) * 100;

  return (
    <Box className={classes.root}>
      <Box className={classes.timer}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={80}
          thickness={4}
          style={{ color: "#31353d" }}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={80}
          thickness={4}
          className={classes.progress}
        />
        <Typography className={classes.timeText}>
          {timeLeft}s
        </Typography>
      </Box>
      <Typography className={classes.label}>
        Next Round
      </Typography>
    </Box>
  );
};

GameTimer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  maxTime: PropTypes.number.isRequired,
};

GameTimer.defaultProps = {
  maxTime: 30,
};

export default GameTimer;
