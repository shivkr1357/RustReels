import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Leftbar from "../NewHome/Leftbar/Leftbar";
import Topbar from "../NewHome/Header/Topbar";
import Footer from "../NewHome/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  mainSection: {
    backgroundColor: "#0B050D",
    flexGrow: 1, 
    minHeight: "100vh",
    transition: "width 0.3s ease-in-out",
    width: "85vw",
    marginLeft:"15vw",
    [theme.breakpoints.down("md")]: {
      width: "70vw",
      
    },
  },
}));


const MainLayout = ({ children, onClick }) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Leftbar />
      <section className={classes.mainSection}>
        <Topbar onClick={onClick} />
        {children}
        <Footer />
      </section>
    </main>
  );
};

export default MainLayout;
