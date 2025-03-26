import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainLayout from "../Layout/MainLayout";
import LoginBox from "./LoginBox/LoginBox";

const useStyles = makeStyles(theme => ({
  gameSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  gameCard: {
    backgroundColor: "#2c2f36",
    borderRadius: "8px",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  rewardsBanner: {
    backgroundColor: "#6a1b9a",
    padding: theme.spacing(2),
    borderRadius: "8px",
    marginBottom: theme.spacing(4),
  },
  footer: {
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
  table: {
    marginTop: theme.spacing(4),
    backgroundColor: "#2c2f36",
  },
}));

const NewHome = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <LoginBox />
    </MainLayout>
  );
};

export default NewHome;
