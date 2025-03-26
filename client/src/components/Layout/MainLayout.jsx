import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Leftbar from "../NewHome/Leftbar/Leftbar";
import Topbar from "../NewHome/Header/Topbar";

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
    width: "100%",
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Leftbar />
      <section className={classes.mainSection}>
        <Topbar />
        {children}
      </section>
    </main>
  );
};

export default MainLayout;
