import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 280,
    padding: theme.spacing(2),
    background: "#31353d",
    borderRadius: "10px",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: 48,
    height: 48,
    marginRight: theme.spacing(2),
    border: "2px solid #4caf50",
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
  },
  position: {
    color: "#4caf50",
    fontSize: "0.875rem",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#9e9e9e",
    fontSize: "0.875rem",
  },
  value: {
    color: "#fff",
    fontWeight: "500",
  },
  highlight: {
    color: "#4caf50",
  },
}));

const PlayerCard = ({ player, position }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={3}>
      <Box className={classes.header}>
        <Avatar 
          className={classes.avatar}
          src={player.avatar || "/images/default-avatar.png"}
          alt={player.username}
        />
        <Box>
          <Typography className={classes.username} variant="h6">
            {player.username}
          </Typography>
          <Typography className={classes.position}>
            Position #{position + 1}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.details}>
        <Box className={classes.detailRow}>
          <Typography className={classes.label}>Entry Fee</Typography>
          <Typography className={classes.value}>100 coins</Typography>
        </Box>
        <Box className={classes.detailRow}>
          <Typography className={classes.label}>Win Chance</Typography>
          <Typography className={`${classes.value} ${classes.highlight}`}>
            {(1 / (position + 1) * 100).toFixed(2)}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

PlayerCard.propTypes = {
  player: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  position: PropTypes.number.isRequired,
};

export default PlayerCard;
