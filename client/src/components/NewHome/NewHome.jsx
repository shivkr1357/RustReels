import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainLayout from "../Layout/MainLayout";
import LoginBox from "./LoginBox/LoginBox";
import { Box, Typography } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import image from "../../assets/Rustreels/Branding/Logo/logo.png";
import Card from "../Card/Card";
import DepositeSection from "../DepositeSection/DepositeSection";

//images import
import roulette from "../../assets/Rustreels/Branding/gameIcon/roulette.png";
import crash from "../../assets/Rustreels/Branding/gameIcon/crash.png";
import coinflip from "../../assets/Rustreels/Branding/gameIcon/coinflip.png";
import blackjack from "../../assets/Rustreels/Branding/gameIcon/blackjack.png";
import casebattles from "../../assets/Rustreels/Branding/gameIcon/casebattles.png";
import caseopening from "../../assets/Rustreels/Branding/gameIcon/caseopening.png";
import upgrader from "../../assets/Rustreels/Branding/gameIcon/upgrader.png";
import jackpot from "../../assets/Rustreels/Branding/gameIcon/jackpot.png";
import { HomeTableData } from "./data/dummyData";
import CustomTable from "../CustomTable/CustomTable";
import LoginModal from "../LoginModal/LoginModal";
import { withRouter } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "70px",
    marginTop: "30px",
  },
  image: {
    width: "20px",
    height: "20px",
    marginRight: "10px",
  },
  text: {
    fontSize: "20px",
    marginRight: "10px",
  },
  icon: {
    fontSize: "20px",

    color: "#918D93",
    marginTop: "5px",
    marginRight: "10px",
  },
  text1: {
    fontSize: "16px",
    color: "#918D93",
  },
  cardContainer: {
    width: "97%",
    rowGap: "30px",
    columnGap: "30px",
    padding: "0px 0px 0px 65px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    marginBottom: "20px",
    marginTop: "20px",
  },

  tableContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "5px 70px"
  },
  tableContent: {
    display: "flex",
    flexDirection: "row",
    gap: 20
  }
}));

const columns = [
  { id: "game", label: "Game" },
  { id: "player", label: "Player" },
  { id: "wager", label: "Wager" },
  { id: "multiplier", label: "Multiplier" },
  { id: "payout", label: "Payout" },
];

const NewHome = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const cardData = [
    { title: "ROULETTE", isNew: true, isHot: false, image: roulette },
    { title: "CRASH", isNew: false, isHot: true, image: crash },
    { title: "JACKPOT", isNew: false, isHot: true, image: jackpot },
    { title: "COINFLIP", isNew: true, isHot: false, image: coinflip },
    { title: "CASE BATTLES", isNew: true, isHot: false, image: casebattles },
    { title: "CASE OPENING", isNew: true, isHot: false, image: caseopening },
    { title: "UPGRADER", isNew: false, isHot: true, image: upgrader },
    { title: "BLACKJACK", isNew: false, isHot: true, image: blackjack },
  ];

  return (
    <MainLayout onClick={() => setOpen(!open)}>
      <LoginBox onClick={() => setOpen(!open)} />
      <Box className={classes.container}>
        <img className={classes.image} src={image} alt="image" />
        <Typography className={classes.text}>Rust Reels Originals</Typography>
        <Typography className={classes.icon}>
          <PlayArrowIcon style={{ fontSize: "16px" }} />
        </Typography>
        <Typography className={classes.text1}>
          Play any of our Originals
        </Typography>
      </Box>

      <Box className={classes.cardContainer}>
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            isNew={card.isNew}
            isHot={card.isHot}
            image={card.image}
          />
        ))}
      </Box>
      <DepositeSection />

      <CustomTable columns={columns} data={HomeTableData} />

      <LoginModal open={open} onClose={() => setOpen(false)} />
    </MainLayout>
  );
};

export default withRouter(NewHome);
