import React, { useState, useEffect, Fragment } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";
import {
  getUserVipData,
  claimRakebackBalance,
} from "../../services/api.service";
import parseCommasToThousands from "../../utils/parseCommasToThousands";
import { changeWallet } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// MUI Components
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProgressBar from 'react-bootstrap/ProgressBar'

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper";

import 'swiper/swiper.min.css';
import "swiper/swiper-bundle.min.css";

import "./SwiperCustomCSS.css";

import error from "../../assets/error.wav";

const errorAudio = new Audio(error);

const playSound = audioFile => {
  audioFile.play();
};

// Custom Styled Component
const ColorCircularProgress = withStyles({
  root: {
    color: "#4f79fd !important",
  },
})(CircularProgress);

// Custom Styles
const useStyles = makeStyles(theme => ({
  modal: {
    "& div > div": {
      color: "#e4e4e4",
      fontFamily: "Rubik",
      fontSize: "14px",
      borderRadius: "0px",
      fontWeight: 300,
    },
    "& .MuiDialog-paperWidthSm": {
      width: "50%",
      background: "rgb(27, 33, 41)",
      border: "2px solid #2f3947",
      borderRadius: "20px",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        margin: "85px 15px 15px 15px",
        height: "80%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        margin: "85px 15px 15px 15px",
        height: "80%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
        margin: "85px 15px 15px 15px",
        height: "80%",
      },
    },
  },
  vipTitle: {
    fontSize: 14,
    fontFamily: "Rubik",
    textAlign: "left",
    marginTop: "2rem",
    marginLeft: "1rem",
    fontWeight: 300,
    "& > span": {
      fontFamily: "Rubik",
      color: "#1a90d1",
    },
  },
  vipDesc: {
    width: "90%",
    color: "#e4e4e4",
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: 300,
    textAlign: "center",
    margin: "1rem auto",
    "& > a": {
      color: "#4caf50",
      fontFamily: "Rubik",
      fontSize: "14px",
      fontWeight: 300,
      textDecoration: "none",
    },
  },
  progressbox: {
    margin: "0 1rem",
    "& > img": {
      position: "absolute",
      top: -10,
      zIndex: 1000,
    },

  },
  buttontest: {
    color: "#e4e4e4",
    fontFamily: "Rubik",
    fontSize: "13px",
    fontWeight: 300,
  },
  titlerubik: {
    fontFamily: "Rubik",
  },
  progress: {
    height: "2.5rem",
    borderRadius: "0.25rem",
    "& > div": {
      background:
        "-webkit-linear-gradient( 0deg, rgb(52, 63, 68) 0%, #4CAF50 100%) !important",
    },
  },
  rake: {
    color: "#1a90d1",
    background: "#1315184a",
    fontFamily: "Rubik",
    border: "1px solid #2f3947",
    padding: "10px",
    "&:hover": {
      transition: "all 400ms",
      transform: "scale(1.06)",
      WebkitTransform: "scale(1.06)",
      background: "#1315184a",
      border: "1px solid #2f3947",
    },
  },
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "15rem",
  },
}));

const Vip = ({ open, handleClose, changeWallet, user }) => {
  // Declare State
  const classes = useStyles();
  const { addToast } = useToasts();
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [vipData, setVipData] = useState(null);
  const [currentMajorLevelIndex, setCurrentMajorLevelIndex] = useState(null);
  let currentStart = 1;

  // Claim user vip rakeback
  const claimRakeback = async () => {
    setClaiming(true);
    try {
      const response = await claimRakebackBalance();

      changeWallet({ amount: response.rakebackClaimed });
      addToast(
        "Successfully claimed Rakeback!",
        { appearance: "success" }
      );
      const data = await getUserVipData();
      setVipData(data);
      //console.log(claiming);
    } catch (error) {
      setClaiming(false);
      //console.log(
      //  "There was an error while claiming user rakeback balance:",
      //  error
      //);
      // If this was user error
      if (error.response && error.response.data && error.response.data.error) {
        addToast(error.response.data.error, { appearance: "error" });
        playSound(errorAudio);
      } else {
        //window.location.replace("/Update");
        console.log(claiming); // delete this, its useless
      }
    }
  };

  // componentDidMount
  useEffect(() => {
    // Fetch vip data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserVipData();

        // Update state
        setVipData(data);
        setCurrentMajorLevelIndex(data.majorLevelNames.findIndex((levelName) => levelName === data.currentLevel.levelName));
        let lastObject = data.allLevels[data.allLevels.length - 1];
        let wagerNeededLastLevel = lastObject.wagerNeeded;
        if (data.wager >= wagerNeededLastLevel) {
          setCompleted(1);
        }
        else {
          setCompleted(0);
        }
        setLoading(false);
      } catch (error) {
        console.log("There was an error while loading user vip data:", error);
        addToast(
          "There was an error while getting your VIP data, please try again later!",
          { appearance: "error" }
        );
      }
    };

    // If modal is opened, fetch data
    if (open) fetchData();
  }, [addToast, open]);

  return (
    <Dialog
      className={classes.modal}
      onClose={handleClose}
      open={open}
      style={{ fontFamily: "Rubik", }}
    >
      <DialogTitle className={classes.titlerubik} onClose={handleClose} style={{ background: "#1b2129", fontFamily: "Rubik", }}>
        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "7px", marginBottom: "-2px", }}>
          <path d="M10.69 5.98316L9.97455 5.75812L9.97455 5.75812L10.69 5.98316ZM8.5704 9.54025L9.0206 8.9404L8.5704 9.54025ZM9.07077 11.131L9.78621 11.3561L9.07077 11.131ZM11.1904 12.7218L10.7402 12.122L10.7402 12.122L11.1904 12.7218ZM12.8096 12.7218L13.2598 12.122L12.8096 12.7218ZM14.9292 11.131L14.2137 11.3561L14.2137 11.3561L14.9292 11.131ZM15.4296 9.54025L14.9794 8.9404L15.4296 9.54025ZM13.31 5.98316L14.0254 5.75812L13.31 5.98316ZM9.87285 17.831L9.22333 17.456L9.22333 17.456L9.87285 17.831ZM8.11629 20.8734L8.76581 21.2484L8.76581 21.2484L8.11629 20.8734ZM1.83039 17.2443L1.18088 16.8693L1.18088 16.8693L1.83039 17.2443ZM3.58695 14.2018L4.23647 14.5768L4.23647 14.5768L3.58695 14.2018ZM6.23289 20.7121L5.52321 20.9547L5.52321 20.9547L6.23289 20.7121ZM5.98905 19.9988L6.69873 19.7562L6.69873 19.7562L5.98905 19.9988ZM3.65145 18.6492L3.5067 17.9133L3.5067 17.9133L3.65145 18.6492ZM2.91177 18.7947L3.05651 19.5306L3.05651 19.5306L2.91177 18.7947ZM5.24202 18.5935L5.61702 17.944L5.61702 17.944L5.24202 18.5935ZM1.27768 18.8052L0.662524 19.2343L1.27768 18.8052ZM10.3801 16.9319L9.78088 16.4808L9.74488 16.5286L9.71692 16.5816L10.3801 16.9319ZM13.8488 17.831L14.4983 17.456L14.4983 17.456L13.8488 17.831ZM15.6053 20.8734L16.2549 20.4984L15.6053 20.8734ZM21.8912 17.2443L22.5408 16.8693L22.5408 16.8693L21.8912 17.2443ZM20.1347 14.2018L19.4852 14.5768L19.4852 14.5768L20.1347 14.2018ZM17.4887 20.7121L18.1984 20.9547L18.1984 20.9547L17.4887 20.7121ZM17.7326 19.9988L17.0229 19.7562L17.0229 19.7562L17.7326 19.9988ZM20.0702 18.6492L20.2149 17.9133L20.2149 17.9133L20.0702 18.6492ZM20.8099 18.7947L20.6651 19.5306L20.6651 19.5306L20.8099 18.7947ZM22.444 18.8052L23.0591 19.2343L23.0591 19.2343L22.444 18.8052ZM13.3372 16.9237H12.5872V17.1092L12.6737 17.2733L13.3372 16.9237ZM10.4428 16.8485L10.588 16.1127L10.4428 16.8485ZM13.3372 16.8887L13.2128 16.1491L13.3372 16.8887ZM19.1125 12.6659L18.4461 12.3217L18.4461 12.3217L19.1125 12.6659ZM4.48144 12.7988L3.91783 12.3039L4.48144 12.7988ZM4.74998 9C4.74998 4.99594 7.99591 1.75 12 1.75V0.25C7.16748 0.25 3.24998 4.16751 3.24998 9H4.74998ZM12 1.75C16.004 1.75 19.25 4.99594 19.25 9H20.75C20.75 4.16751 16.8325 0.25 12 0.25V1.75ZM9.38001 7.71631C10.3176 7.71631 11.1268 7.09399 11.4054 6.20819L9.97455 5.75812C9.88438 6.0448 9.63591 6.21631 9.38001 6.21631V7.71631ZM9.0206 8.9404C8.76926 8.75176 8.69693 8.45601 8.78547 8.17451C8.87348 7.89471 9.08995 7.71631 9.38001 7.71631V6.21631C7.27095 6.21631 6.50788 8.93003 8.1202 10.1401L9.0206 8.9404ZM9.78621 11.3561C10.0637 10.4739 9.76394 9.49828 9.0206 8.9404L8.1202 10.1401C8.34238 10.3068 8.44665 10.6157 8.35533 10.906L9.78621 11.3561ZM10.7402 12.122C10.4976 12.304 10.2328 12.2807 10.0213 12.122C9.80637 11.9606 9.68377 11.6818 9.78621 11.3561L8.35533 10.906C8.04544 11.8912 8.4429 12.8128 9.12094 13.3217C9.80249 13.8332 10.8037 13.9498 11.6406 13.3217L10.7402 12.122ZM13.2598 12.122C12.5103 11.5594 11.4897 11.5594 10.7402 12.122L11.6406 13.3217C11.8566 13.1595 12.1434 13.1595 12.3594 13.3217L13.2598 12.122ZM14.2137 11.3561C14.3162 11.6818 14.1936 11.9606 13.9786 12.122C13.7672 12.2807 13.5024 12.304 13.2598 12.122L12.3594 13.3217C13.1963 13.9498 14.1975 13.8332 14.879 13.3217C15.5571 12.8128 15.9545 11.8912 15.6446 10.906L14.2137 11.3561ZM14.9794 8.9404C14.236 9.49828 13.9363 10.4739 14.2137 11.3561L15.6446 10.906C15.5533 10.6157 15.6576 10.3068 15.8797 10.1401L14.9794 8.9404ZM14.6199 7.71631C14.91 7.71631 15.1265 7.89471 15.2145 8.17451C15.303 8.45601 15.2307 8.75176 14.9794 8.9404L15.8797 10.1401C17.4921 8.93003 16.729 6.21631 14.6199 6.21631V7.71631ZM12.5945 6.20819C12.8731 7.09399 13.6824 7.71631 14.6199 7.71631V6.21631C14.364 6.21631 14.1156 6.0448 14.0254 5.75812L12.5945 6.20819ZM14.0254 5.75812C13.3929 3.74729 10.607 3.74729 9.97455 5.75812L11.4054 6.20819C11.5976 5.59727 12.4024 5.59727 12.5945 6.20819L14.0254 5.75812ZM9.22333 17.456L7.46677 20.4984L8.76581 21.2484L10.5224 18.206L9.22333 17.456ZM2.47991 17.6193L4.23647 14.5768L2.93743 13.8268L1.18088 16.8693L2.47991 17.6193ZM6.94257 20.4696L6.69873 19.7562L5.27937 20.2414L5.52321 20.9547L6.94257 20.4696ZM3.5067 17.9133L2.76703 18.0588L3.05651 19.5306L3.79619 19.3851L3.5067 17.9133ZM6.69873 19.7562C6.56678 19.3702 6.44639 19.0137 6.31011 18.7351C6.16472 18.4379 5.96198 18.1431 5.61702 17.944L4.86702 19.243C4.86829 19.2437 4.8688 19.2441 4.86967 19.2449C4.87071 19.2458 4.87467 19.2493 4.88158 19.2576C4.89662 19.2759 4.92383 19.3148 4.96268 19.3942C5.04773 19.5681 5.13476 19.8184 5.27937 20.2414L6.69873 19.7562ZM3.79619 19.3851C4.23485 19.2988 4.49512 19.2491 4.68822 19.2358C4.77641 19.2297 4.82376 19.2338 4.84706 19.2377C4.85777 19.2395 4.8628 19.2412 4.86408 19.2416C4.86517 19.242 4.86575 19.2423 4.86702 19.243L5.61702 17.944C5.27206 17.7448 4.9154 17.7166 4.58531 17.7393C4.2759 17.7606 3.90697 17.8346 3.5067 17.9133L3.79619 19.3851ZM1.18088 16.8693C0.945573 17.2768 0.72565 17.654 0.600869 17.9642C0.483135 18.2569 0.334863 18.7645 0.662524 19.2343L1.89283 18.3762C2.02982 18.5726 1.91011 18.7289 1.99251 18.524C2.06786 18.3367 2.21963 18.0701 2.47991 17.6193L1.18088 16.8693ZM2.76703 18.0588C2.2607 18.1584 1.96478 18.2146 1.76813 18.2244C1.55497 18.235 1.75169 18.1738 1.89283 18.3762L0.662524 19.2343C0.994336 19.71 1.52696 19.7382 1.84261 19.7225C2.17477 19.706 2.60056 19.6203 3.05651 19.5306L2.76703 18.0588ZM7.46677 20.4984C7.20649 20.9493 7.0515 21.214 6.92695 21.3729C6.79075 21.5467 6.86622 21.3649 7.10481 21.3853L6.97683 22.8798C7.54751 22.9287 7.91292 22.5465 8.10754 22.2982C8.3138 22.035 8.53051 21.656 8.76581 21.2484L7.46677 20.4984ZM5.52321 20.9547C5.67353 21.3945 5.81217 21.8061 5.96395 22.102C6.10818 22.3832 6.39892 22.8304 6.97683 22.8798L7.10481 21.3853C7.35063 21.4064 7.39602 21.6073 7.29862 21.4174C7.20877 21.2422 7.10949 20.9578 6.94257 20.4696L5.52321 20.9547ZM4.23647 14.5768C4.66368 13.8369 4.85968 13.5047 5.04504 13.2936L3.91783 12.3039C3.61001 12.6546 3.32832 13.1498 2.93743 13.8268L4.23647 14.5768ZM10.5224 18.206C10.7324 17.8422 10.9073 17.5396 11.0432 17.2823L9.71692 16.5816C9.59712 16.8083 9.43862 17.0831 9.22333 17.456L10.5224 18.206ZM13.1993 18.206L14.9558 21.2484L16.2549 20.4984L14.4983 17.456L13.1993 18.206ZM22.5408 16.8693L20.7842 13.8268L19.4852 14.5768L21.2417 17.6193L22.5408 16.8693ZM18.1984 20.9547L18.4423 20.2414L17.0229 19.7562L16.7791 20.4696L18.1984 20.9547ZM19.9254 19.3851L20.6651 19.5306L20.9546 18.0588L20.2149 17.9133L19.9254 19.3851ZM18.4423 20.2414C18.5869 19.8184 18.6739 19.5681 18.759 19.3942C18.7978 19.3148 18.825 19.2759 18.84 19.2576C18.847 19.2493 18.8509 19.2458 18.852 19.2449C18.8528 19.2441 18.8533 19.2437 18.8546 19.243L18.1046 17.944C17.7597 18.1431 17.5569 18.4379 17.4115 18.7351C17.2752 19.0137 17.1549 19.3702 17.0229 19.7562L18.4423 20.2414ZM20.2149 17.9133C19.8147 17.8346 19.4457 17.7606 19.1363 17.7393C18.8062 17.7166 18.4496 17.7448 18.1046 17.944L18.8546 19.243C18.8559 19.2423 18.8565 19.242 18.8575 19.2416C18.8588 19.2412 18.8639 19.2395 18.8746 19.2377C18.8979 19.2338 18.9452 19.2297 19.0334 19.2358C19.2265 19.2491 19.4868 19.2988 19.9254 19.3851L20.2149 17.9133ZM21.2417 17.6193C21.502 18.0701 21.6538 18.3367 21.7291 18.524C21.8115 18.7289 21.6918 18.5726 21.8288 18.3762L23.0591 19.2343C23.3868 18.7645 23.2385 18.2569 23.1208 17.9642C22.996 17.654 22.7761 17.2768 22.5408 16.8693L21.2417 17.6193ZM20.6651 19.5306C21.1211 19.6203 21.5469 19.706 21.879 19.7225C22.1947 19.7382 22.7273 19.71 23.0591 19.2343L21.8288 18.3762C21.9699 18.1738 22.1667 18.235 21.9535 18.2244C21.7569 18.2146 21.4609 18.1584 20.9546 18.0588L20.6651 19.5306ZM14.9558 21.2484C15.1911 21.656 15.4078 22.035 15.6141 22.2982C15.8087 22.5465 16.1741 22.9287 16.7448 22.8798L16.6168 21.3853C16.8554 21.3649 16.9309 21.5467 16.7947 21.3729C16.6701 21.214 16.5151 20.9493 16.2549 20.4984L14.9558 21.2484ZM16.7791 20.4696C16.6121 20.9578 16.5129 21.2422 16.423 21.4174C16.3256 21.6073 16.371 21.4064 16.6168 21.3853L16.7448 22.8798C17.3227 22.8304 17.6134 22.3832 17.7577 22.102C17.9095 21.8061 18.0481 21.3945 18.1984 20.9547L16.7791 20.4696ZM14.4983 17.456C14.2805 17.0788 14.1209 16.802 14.0007 16.574L12.6737 17.2733C12.8104 17.5328 12.9869 17.8381 13.1993 18.206L14.4983 17.456ZM5.49947 12.2143C5.0199 11.2465 4.74998 10.1558 4.74998 9H3.24998C3.24998 10.392 3.57556 11.7101 4.15542 12.8803L5.49947 12.2143ZM12 16.25C11.5161 16.25 11.0441 16.2027 10.588 16.1127L10.2977 17.5844C10.8489 17.6931 11.4182 17.75 12 17.75V16.25ZM10.588 16.1127C8.35288 15.6718 6.48415 14.2015 5.49947 12.2143L4.15542 12.8803C5.34259 15.2761 7.59539 17.0513 10.2977 17.5844L10.588 16.1127ZM10.9792 17.383L11.042 17.2996L9.84364 16.3975L9.78088 16.4808L10.9792 17.383ZM13.2128 16.1491C12.8189 16.2154 12.4138 16.25 12 16.25V17.75C12.4975 17.75 12.9859 17.7084 13.4617 17.6283L13.2128 16.1491ZM14.0872 16.9237V16.8887H12.5872V16.9237H14.0872ZM19.25 9C19.25 10.1987 18.9596 11.3274 18.4461 12.3217L19.7789 13.01C20.3997 11.8079 20.75 10.4438 20.75 9H19.25ZM18.4461 12.3217C17.4178 14.3128 15.4949 15.7651 13.2128 16.1491L13.4617 17.6283C16.2211 17.164 18.5394 15.41 19.7789 13.01L18.4461 12.3217ZM20.7842 13.8268C20.3325 13.0445 20.0252 12.4962 19.6275 12.1206L18.5975 13.2111C18.7954 13.3981 18.9793 13.7006 19.4852 14.5768L20.7842 13.8268ZM5.04504 13.2936C5.0513 13.2865 5.07895 13.2597 5.16073 13.2192L4.49416 11.8754C4.31796 11.9628 4.10157 12.0947 3.91783 12.3039L5.04504 13.2936Z" fill="#2C80AF"></path>
        </svg><span style={{ fontFamily: "Rubik", fontWeight: "300", }}> Level Rewards</span>
      </DialogTitle>
      <DialogContent dividers style={{ background: "#1b2129", }}>
        {loading ? (
          <Box className={classes.loader}>
            <ColorCircularProgress />
          </Box>
        ) : (
          <Fragment>
            <p>Get a percent back from the house edge with Rakeback! The more you wager on your account, the more money you will earn from Rakeback!</p>
            <h1 className={classes.vipTitle}><br />Current Level <span style={{
              background: vipData.majorLevelColors[currentMajorLevelIndex], color: "#fff", padding: "5px 5px 4px 5px",
              fontSize: "12px", marginLeft: "5px", borderRadius: "6px",
            }}>{vipData?.currentLevel?.name}</span>
            </h1>
            <Box position="relative" className={classes.progressbox}>
              {completed < 1 ?
                <span>
                  <h4 className={classes.vipDesc} style={{ marginTop: "6px", marginLeft: "29px", position: "absolute", }}>
                    <span style={{ color: "#fff", }}>Wager <span style={{ color: "#fff", fontWeight: 500, }}>${(vipData.nextLevel.wagerNeeded - vipData.wager).toFixed(2)}</span> more to level up</span>
                  </h4>
                  <ProgressBar style={{ borderRadius: "5px", }}
                    variant="success"
                    animated
                    min={vipData?.currentLevel?.wagerNeeded}
                    max={vipData?.nextLevel?.wagerNeeded}
                    now={vipData?.wager}
                  />
                </span>
                : completed >= 1 ?
                  <span>
                    <h4 className={classes.vipDesc} style={{ marginTop: "6px", marginLeft: "29px", position: "absolute", }}>
                      <span style={{ color: "#fff", }}>You reached the highest level. Congratulations!</span>
                    </h4>
                    <ProgressBar style={{ borderRadius: "5px", }}
                      variant="success"
                      animated
                      min={0}
                      max={100}
                      now={100}
                    />
                  </span>
                  : null
              }
            </Box>
            <br /><br />
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards, Navigation]}
              className="mySwiper"
              initialSlide={currentMajorLevelIndex}
              navigation
            >
              {vipData.majorLevelNames.map((levelName, index) => {
                let currentIndex = vipData.allLevels.findIndex((level) => level.levelName === levelName);
                let endIndex = currentIndex + 1;
                let nextIndex = vipData.allLevels.findIndex((level) => level.levelName === vipData.majorLevelNames[index + 1]);
                if (nextIndex === -1) {
                  endIndex = vipData.allLevels.length;
                }
                else {
                  endIndex = nextIndex;
                }
                let start = currentStart;
                currentStart = endIndex + 1;

                // Find the minimum and maximum rakeback percentage for the current major level
                let minRakeback = vipData.allLevels.slice(currentIndex, endIndex).reduce((min, level) => Math.min(min, level.rakebackPercentage), Number.MAX_VALUE);
                let maxRakeback = vipData.allLevels.slice(currentIndex, endIndex).reduce((max, level) => Math.max(max, level.rakebackPercentage), 0);
                return (
                  <SwiperSlide key={index} style={{ backgroundColor: `${vipData.majorLevelColors[index]}`, filter: `drop-shadow(0px 0px 4px ${vipData.majorLevelColors[index]})`, }}>
                    <h2 style={{ color: "#fff", border: "0px", background: "#00000029", padding: "12px", borderRadius: "10px", }}>VIP RANK<br />
                      <hr style={{ border: "1px solid #fff", borderRadius: "50px", }} /><span style={{ color: "#fff", fontWeight: 500, }}>{levelName} <br /></span>
                      <span style={{ fontSize: "14px", color: "#fff", fontWeight: "500", }}>Level: {start} - {endIndex}</span><br />
                      <span style={{ fontSize: "14px", color: "#fff", fontWeight: "500", }}>Rake: {minRakeback}% - {maxRakeback}%</span><br />
                      <span style={{ fontSize: "14px", color: "#fff", fontWeight: "500", }}>Current: {vipData.currentLevel.rakebackPercentage}%</span>
                    </h2>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <br /><br />
            <Box justifyContent="center" textAlign="center">
              <br />
              <Button
                className={classes.rake}
                onClick={claimRakeback}
              >
                {`Claim ($${parseCommasToThousands(vipData.rakebackBalance.toFixed(2))})`}
              </Button>
            </Box>
            <br />
          </Fragment>
        )}
      </DialogContent>
      <DialogActions style={{ background: "#1b2129", }}>
        <Button autoFocus onClick={handleClose} className={classes.buttontest} color="primary">
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Vip.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  changeWallet: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { changeWallet })(Vip);
