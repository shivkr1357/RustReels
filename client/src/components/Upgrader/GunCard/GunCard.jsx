import React from "react";
import { Card, CardMedia, CardContent, Typography, makeStyles } from "@material-ui/core";
import gunImage from "../../../assets/Rustreels/Branding/guns/gun1.png";
import bitcoin from "../../../assets/Rustreels/Branding/coins/bitcoin.png";
const useStyles = makeStyles(() => ({
    card: {
        maxWidth: "183px",
        width: "183px",
        maxHeight: "223px",
        height: "223px",
        backgroundColor: "#160514",
        borderRadius: "10px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        margin: "10px 0",
    },
    borderOverlay: {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: "10px",
        padding: "2px", // Border thickness
        background: `conic-gradient(
      from 180deg at top left, 
      transparent 20%, #C81CC9 50%, transparent 80%
    ), conic-gradient(
      from 0deg at bottom right, 
      transparent 20%, #C81CC9 50%, transparent 80%
    )`,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        "-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        "-webkit-mask-composite": "xor",
        maskComposite: "exclude",
    },
    media: {
        height: 140,
        width: 140,
        objectFit: "contain",
        marginTop: "20px",
    },
    title: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: "16px",
    },
    priceContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // gap: "10px",
    },
    bitcoin: {
        width: "50px",
        height: "50px",
    },
    price: {
        color: "#FFD700",
        textAlign: "center",
        marginTop: "8px",
    },
}));

const GunCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <div className={classes.borderOverlay}></div> {/* Border Layer */}
            <CardMedia className={classes.media} image={gunImage} title="Tempered Mp5" />
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Tempered Mp5
                </Typography>
                <Typography variant="body2" className={classes.price}>
                    <span className={classes.priceContainer}> <img src={bitcoin} className={classes.bitcoin} alt="bitcoin" />1000</span>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default GunCard;
