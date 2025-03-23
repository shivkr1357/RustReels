import React from "react";
import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  amount: {
    color: "#b7b7b7",
    fontSize: "11px",
    margin: "auto",
    marginLeft: "0px",
  },
}));

const PlayAmount = ({ kingsBalance }) => {
  const classes = useStyles();
  const balance = kingsBalance || 0;

  return    <div style={{ color: "#b7b7b7", fontSize: "11px", margin: "auto", marginLeft: "0px", }}>${parseFloat(balance).toFixed(2)}</div>;
};

const mapStateToProps = (state) => ({
  kingsBalance: state.kings.balance,
});

const ConnectedPlayAmount = connect(mapStateToProps)(PlayAmount);
export { ConnectedPlayAmount as PlayAmount };
