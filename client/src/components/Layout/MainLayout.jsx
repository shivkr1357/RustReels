import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Leftbar from "../NewHome/Leftbar/Leftbar";
import Topbar from "../NewHome/Header/Topbar";
import Footer from "../NewHome/Footer/Footer";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#0B050D",
    color: "#fff",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  mainSection: {
    width: "90%",
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
