import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import CasinoIcon from "@material-ui/icons/Casino";
import { useHistory } from "react-router-dom";
import CardIcon from "../../assets/cardIcon.png";
const useStyles = makeStyles(theme => ({
  cardContainer: {
    height: "370px",
    background: "linear-gradient(145deg, #2a1429 0%, #1a0c1a 100%)",
    borderRadius: "16px",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  topSection: {
    position: "absolute",
    top: "10px",
    left: "10px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    "& svg": {
      color: "#fff",
      fontSize: "20px",
    },
  },
  newTag: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "1px solid #41351E",
    color: "#FFDF00",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "16px",
  },
  hotTag: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "trasnparent",
    border: "1px solid #590633",
    color: "#F50169",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "16px",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "160px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    "&::after": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      background:
        "radial-gradient(circle, rgba(255,0,255,0.2) 0%, rgba(255,0,255,0) 70%)",
      pointerEvents: "none",
    },
  },
  cardIcon:{
    height: "30px"
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "contain",
    filter: "drop-shadow(0 0 10px rgba(255,0,255,0.3))",
    marginTop: "200px",
  },
  title: {
    position: "absolute",
    bottom: "20px",
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
}));

const Card = ({ image, title, isNew, isHot }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleCardClick = (title) => {
    switch (title) {
      case "UPGRADER":
        history.push(`/upgrader`);
        break;
      case "CRASH":
        history.push(`/crash`);
        break;
      case "BLACKJACK":
        history.push(`/blackjack`);
        break;
      case "ROULETTE":
        history.push(`/roulette`);
        break;
      case "DICE":
        history.push(`/dice`);
        break;
      case "CASE BATTLES":
        history.push(`/case-battles`);
        break;
      default:
        break;
    }
  };

  return (
    <Box className={classes.cardContainer} onClick={() => handleCardClick(title)}>
      <Box className={classes.topSection}>
        {/* <CasinoIcon /> */}
        <img src={CardIcon} alt="card Icon not found" className={classes.cardIcon} />
      </Box>

      {isNew && <Box className={classes.newTag}>NEW</Box>}
      {isHot && <Box className={classes.hotTag}>HOT</Box>}

      <Box className={classes.imageContainer}>
        <img src={image} alt={title} className={classes.image} />
      </Box>

      <Typography className={classes.title}>{title || "ROULETTE"}</Typography>
    </Box>
  );
};

export default Card;
