import React from "react";
import logo from "../assets/coming_soon.jpg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",

    },
    img: {
        height: "100%",
        width: "100%",
    },
}));

const ComingSoon = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <img src={logo} alt="Logo" className={classes.img} />
        </div>
    );
};

export default ComingSoon;