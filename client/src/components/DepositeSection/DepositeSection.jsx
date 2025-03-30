import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import bitcoin from "../../assets/Rustreels/Branding/depositeIcons/01.png";
import ethereum from "../../assets/Rustreels/Branding/depositeIcons/02.png";
import litecoin from "../../assets/Rustreels/Branding/depositeIcons/03.png";
import usdt from "../../assets/Rustreels/Branding/depositeIcons/04.png";
import dogecoin from "../../assets/Rustreels/Branding/depositeIcons/05.png";
import shiba from "../../assets/Rustreels/Branding/depositeIcons/06.png";
import xrp from "../../assets/Rustreels/Branding/depositeIcons/07.png";
import apecoin from "../../assets/Rustreels/Branding/depositeIcons/08.png";
import solana from "../../assets/Rustreels/Branding/depositeIcons/09.png";
import tron from "../../assets/Rustreels/Branding/depositeIcons/10.png";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 0),
        textAlign: "center",
        color: "#fff",
        marginTop: "50px",
        marginBottom: "50px",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    titleContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginBottom: theme.spacing(2),
    },
    line: {
        flex: 1,
        height: "2px",
        background: "linear-gradient(to right, transparent, #a100ff, #a100ff)",
        position: "relative",
    },
    angledEdgeLeft: {
        position: "absolute",
        left: "-8px",
        bottom: "-2px",
        width: "12px",
        height: "2px",
        backgroundColor: "#a100ff",
        transform: "skewX(-30deg)",
    },
    angledEdgeRight: {
        position: "absolute",
        right: "-8px",
        bottom: "-2px",
        width: "12px",
        height: "2px",
        backgroundColor: "#a100ff",
        transform: "skewX(30deg)",
    },
    titleWrapper: {
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        color: "#a100ff",
        fontWeight: 500,
        fontSize: "1.2rem",
    },
    slash: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        margin: "0 8px",
    },
    rightSlash: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        margin: "0 8px",
    },
    title: {
        color: "#fff",
    },
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(3),
        flexWrap: "wrap",
    },
    icon: {
        width: "40px",
        height: "40px",
        filter: "grayscale(100%)",
        opacity: 0.8,
        transition: "opacity 0.3s ease",
        "&:hover": {
            opacity: 1,
            filter: "grayscale(0%)",
        },
    },
}));

const DepositSection = () => {
    const classes = useStyles();

    const icons = [
        bitcoin,
        ethereum,
        litecoin,
        usdt,
        dogecoin,
        shiba,
        xrp,
        apecoin,
        solana,
        tron,
    ];

    return (
        <Box className={classes.root}>
            <Box className={classes.titleContainer}>
                <div className={classes.line}>
                    <div className={classes.angledEdgeLeft}></div>
                </div>
                <div className={classes.titleWrapper}>
                    <span className={classes.slash}>/</span>
                    <Typography className={classes.title}>Deposit with your Favorite Methods</Typography>
                    <span className={classes.rightSlash}>\</span>
                </div>
                <div className={classes.line}>
                    <div className={classes.angledEdgeRight}></div>
                </div>
            </Box>
            <Box className={classes.iconContainer}>
                {icons.map((icon, index) => (
                    <img key={index} src={icon} alt="crypto icon" className={classes.icon} />
                ))}
            </Box>
        </Box>
    );
};

export default DepositSection;
