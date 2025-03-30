import React from "react";
import { Box, Typography, makeStyles, Grid, Link } from "@material-ui/core";
import logo from "../../../assets/Rustreels/Branding/Text/logo_new_home.png";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: "#0B050D",
    padding: theme.spacing(4, 8),
    color: "#fff",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: "50px",
  },
  topSection: {
    marginBottom: theme.spacing(4),
  },
  logo: {
    height: "40px",
    marginBottom: theme.spacing(2),
  },
  description: {
    color: "#8B8B8B",
    // maxWidth: "30px",
    fontSize: "14px",
    marginBottom: theme.spacing(3),
  },
  contactSectionContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "100px",
  },
  contactSection: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    color: "#8B8B8B",
    fontSize: "14px",
    marginBottom: theme.spacing(2),
  },
  email: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  linksGrid: {
    marginBottom: theme.spacing(4),
  },
  linkColumn: {
    "& h6": {
      color: "#fff",
      marginBottom: theme.spacing(2),
      fontWeight: 500,
    },
  },
  link: {
    color: "#8B8B8B",
    textDecoration: "none",
    fontSize: "14px",
    display: "block",
    marginBottom: theme.spacing(1),
    "&:hover": {
      color: "#fff",
    },
  },
  bottomSection: {
    borderTop: "1px solid #1E1E1E",
    paddingTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  copyright: {
    color: "#8B8B8B",
    fontSize: "14px",
    margin: "10px 65px",
  },

}));

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.footer}>
        <Box className={classes.topSection}>
          <img src={logo} alt="RustReels" className={classes.logo} />
          <Typography className={classes.description}>
            Rust Reels is the finest Rust case opening site bringing you the
            best designed gamemodes alongside the best rewards!
          </Typography>
          <Box className={classes.contactSectionContainer}>
            <Box className={classes.contactSection}>
              <Typography className={classes.sectionTitle}>Support</Typography>
              <Link
                href="mailto:support@rustreels.com"
                className={classes.email}
              >
                support@rustreels.com
              </Link>
            </Box>

            <Box className={classes.contactSection}>
              <Typography className={classes.sectionTitle}>Partners</Typography>
              <Link
                href="mailto:support@rustreels.com"
                className={classes.email}
              >
                support@rustreels.com
              </Link>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={4} className={classes.linksGrid}>
          <Grid item xs={12} sm={3} className={classes.linkColumn}>
            <Typography variant="h6">Games</Typography>
            <Link href="#" className={classes.link}>
              Rust Case Battles
            </Link>
            <Link href="#" className={classes.link}>
              Rust Coinflip
            </Link>
            <Link href="#" className={classes.link}>
              Rust Wheel
            </Link>
            <Link href="#" className={classes.link}>
              Rust Cases
            </Link>
            <Link href="#" className={classes.link}>
              Upgrader
            </Link>
          </Grid>

          <Grid item xs={12} sm={3} className={classes.linkColumn}>
            <Typography variant="h6">Rewards</Typography>
            <Link href="#" className={classes.link}>
              Free Coins
            </Link>
            <Link href="#" className={classes.link}>
              Daily Cases
            </Link>
            <Link href="#" className={classes.link}>
              Level up Cases
            </Link>
            <Link href="#" className={classes.link}>
              Rakeback
            </Link>
          </Grid>

          <Grid item xs={12} sm={3} className={classes.linkColumn}>
            <Typography variant="h6">About Us</Typography>
            <Link href="#" className={classes.link}>
              Game Fairness
            </Link>
            <Link href="#" className={classes.link}>
              FAQ
            </Link>
            <Link href="#" className={classes.link}>
              Support
            </Link>
          </Grid>

          <Grid item xs={12} sm={3} className={classes.linkColumn}>
            <Typography variant="h6">Policies</Typography>
            <Link href="#" className={classes.link}>
              Refund Policy
            </Link>
            <Link href="#" className={classes.link}>
              Privacy Policy
            </Link>
            <Link href="#" className={classes.link}>
              AML Policy
            </Link>
            <Link href="#" className={classes.link}>
              Terms of Service Policy
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.bottomSection}>
        <Typography className={classes.copyright}>
          ©2024 support@rustreels.com | All Rights Reserved
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
