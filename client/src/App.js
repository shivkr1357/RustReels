import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getSiteSchema } from "./services/api.service";
import { makeStyles } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { ToastProvider } from "react-toast-notifications";
import EventHandler from "./EventHandler";

// MUI Components
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";

// Components
import Navbar from "./components/Navbar";
import HeaderNav from "./components/chat/HeaderNav";
import NotFound from "./components/404.jsx";
import Chat from "./components/chat/Chat";
import Preloader from "./Preloader";
import Footer from "./components/Footer";

// Views
import Coinflip from "./views/Coinflip";
import CoinflipGames from "./views/CoinflipGames";
import CoinflipHistory from "./views/CoinflipHistory";
import Affiliates from "./views/Affiliates";
import Profile from "./views/Profile";
import Roulette from "./views/Roulette";
import Wheel from "./views/Wheel";
import Crash from "./views/Crash";
import Jackpot from "./views/Jackpot";
import Home from "./views/Home";
import Race from "./views/Race";
import Login from "./views/Login";
import Terms from "./views/Terms";
//import Main from "./views/Main";
import Fair from "./views/Fair";
import Faq from "./views/FAQ";
import Banned from "./views/Banned";
import History from "./views/History";
import Registration from "./views/Registration";

import Kings from "./views/Kings";
import CreateBattle from "./views/CreateBattle";
import BattlePage from "./views/BattlePage";
import Battles from "./views/Battles";

import AffiliatesRedirect from "./views/AffiliatesRedirect";

import Maintenance from "./views/Maintenance";

// App Metadata
import metadata from "./metadata.json";
import ComingSoon from "./components/ComingSoon.jsx";
import NewHome from "./components/NewHome/NewHome.jsx";
import Upgrader from "./components/Upgrader/Upgrader.jsx";
import CrashNew from "./components/CrashNew/CrashNew.jsx";
import CaseBattles from "./components/CaseBattles/CaseBattles.jsx";
import RouletteNew from "./components/RouletteNew/RouletteNew.jsx";
import BlackJackNew from "./components/BlackJackNew/BlackJackNew.jsx";
import CaseOpeningNew from "./components/CaseOpeningNew/CaseOpeningNew.jsx";
import CoinFlipNew from "./components/CoinFlipNew/CoinFlipNew.jsx";
import JackpotNew from "./components/JackpotNew/JackpotNew.jsx";
import EarnWithUs from "./components/EarnWithUs/EarnWithUs.jsx";
import CreateCoinFlip from "./components/CreateCoinFlip/CreateCoinFlip.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    background: "#1b2129",
    display: "flex",
    minHeight: "100vh",
    position: "relative",
    fontFamily: "Rubik",
  },
  drawerPaper1: {
    transition: "all 0.5s ease-in-out",
    display: "inherit",
    overflow: "visible",
    flexDirection: "column",
    fontFamily: "Rubik",
    background: "#191f26",
    borderRight: "1px solid #161b21",
    position: "relative",
    whiteSpace: "nowrap",
    width: 280,
    height: "100%",
    maxHeight: "100%",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "90px",
      position: "absolute",
      overflow: "scroll",
      borderRight: "0px solid #161b21",
      width: 0,
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "90px",
      position: "absolute",
      overflow: "scroll",
      borderRight: "0px solid #161b21",
      width: 0,
    },
    [theme.breakpoints.down("md")]: {
      paddingTop: "90px",
      position: "absolute",
      overflow: "scroll",
      borderRight: "0px solid #161b21",
      width: 0,
    },
  },
  drawerPaper2: {
    transition: "all 0.5s ease-in-out",
    display: "flex",
    overflow: "visible",
    flexDirection: "column",
    fontFamily: "Rubik",
    background: "#191f26",
    borderLeft: "1px solid #161b21",
    borderRight: "0px",
    position: "relative",
    whiteSpace: "nowrap",
    width: 300,
    height: "100vh",
    maxHeight: "100%",
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      overflow: "scroll",
      borderLeft: "0px solid #161b21",
      borderTop: "0px",
      width: "100%",
      height: 0,
    },
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      overflow: "scroll",
      borderLeft: "0px solid #161b21",
      borderTop: "0px",
      width: "100%",
      height: 0,
    },
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      overflow: "scroll",
      borderLeft: "0px solid #161b21",
      borderTop: "0px",
      width: "100%",
      height: 0,
    },
  },
  mobileDrawer1: {
    transition: "all 0.5s ease-in-out",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    background: "#191f26",
    fontFamily: "Rubik",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "280px",
    borderRight: "none",
    height: "100vh",
    maxHeight: "100%",
    [theme.breakpoints.down("xs")]: {
      height: "90vh",
      marginTop: "10vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "90vh",
      marginTop: "10vh",
    },
    [theme.breakpoints.down("md")]: {
      height: "90vh",
      marginTop: "10vh",
    },
  },
  mobileDrawer2: {
    transition: "all 0.5s ease-in-out",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    background: "#191f26",
    fontFamily: "Rubik",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "100%",
    borderRight: "none",
    height: "100vh",
    maxHeight: "100%",
    [theme.breakpoints.down("xs")]: {
      height: "90vh",
      marginTop: "10vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "90vh",
      marginTop: "10vh",
    },
    [theme.breakpoints.down("md")]: {
      height: "90vh",
      marginTop: "10vh",
    },
  },
  paper: {
    padding: 2,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    fontFamily: "Rubik",
  },
  backdrop: {
    zIndex: 1500,
    background: "#1d2030",
    color: "#4F79FD",
  },
  chat: {
    position: "absolute",
    bottom: "1.25rem",
    left: "1rem",
    color: "white",
    zIndex: 10000,
    background: "#4f79fd",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    "&:focus": {
      background: "#4f79fd",
    },
    "&:active": {
      background: "#4f79fd",
    },
  },
}));

const App = () => {
  const classes = useStyles();

  // Declare state
  const [open] = useState(false);
  const [mobileChat, setMobile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [finalCountdown, setFinalCountdown] = useState(0);

  // Site settings
  const [loading, setLoading] = useState(true);
  const [maintenance, setMaintenance] = useState(false);

  // Fetch site schema from API
  const fetchData = async () => {
    setLoading(true);
    // Countdown stage commences
    await new Promise(resolve => {
      let secunde = 5;
      setFinalCountdown(secunde);
      let int = setInterval(() => {
        secunde -= 1;
        setFinalCountdown(secunde);
        if (secunde <= 0) {
          clearInterval(int);
          setFinalCountdown("");
          resolve();
        }
      }, 1300);
    });
    try {
      const schema = await getSiteSchema();

      // If maintenance is enabled
      if (schema.maintenanceEnabled) {
        setMaintenance(true);
      }

      setLoading(false);
    } catch (error) {
      // If site is on maintenance
      if (error.response && error.response.status === 503) {
        setMaintenance(true);
        setLoading(false);
      } else {
        console.log(error);
        window.location.reload();
      }
    }
  };

  // componentDidMount
  useEffect(() => {
    const buildId = metadata.build;
    const buildNumber =
      buildId.split("@").length > 1 ? buildId.split("@")[1] : "Unknown";
    console.warn(
      `%cStop!\n%cThis is a browser feature intended only for developers. If someone told you to copy and paste something here to get a "new feature" or "hack" someone's account, it is a scam and will give them access to your account.\r%c[BUILD] Current build number: ${buildNumber}`,
      "font-weight: bold; font-size: 35px; color: red;",
      "color: black; margin-top: 1rem;",
      "color: black; margin-top: 1rem;"
    );
    store.dispatch(loadUser());
    fetchData();
  }, []);

  return maintenance ? (
    <Maintenance />
  ) : loading ? (
    <Preloader finalCountdown={finalCountdown} />
  ) : (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ComingSoon} />
          <Route exact path="/new-home" component={NewHome} />
          <Route exact path="/upgrader" component={Upgrader} />
          <Route exact path="/crash" component={CrashNew} />
          <Route exact path="/case-battles" component={CaseBattles} />
          <Route exact path="/roulette-new" component={RouletteNew} />
          <Route exact path="/blackjack-new" component={BlackJackNew} />
          <Route exact path="/case-opening-new" component={CaseOpeningNew} />
          <Route exact path="/coinflip-new" component={CoinFlipNew} />
          <Route exact path="/earn-with-us" component={EarnWithUs} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/create-coinflip" component={CreateCoinFlip} />
          <Route exact path="/jackpot-new" component={JackpotNew} />
          <Route exact path="/login/:provider?" component={Login} />
          {/* <Route exact path="/login/google" component={Login} /> */}

          <ToastProvider
            placement={"bottom-center"}
            autoDismiss={true}
            autoDismissTimeout={4500}
          >
            <EventHandler />
            <div className={classes.root}>
              <CssBaseline />

              <Drawer
                variant="permanent"
                classes={{
                  paper: mobileNav
                    ? classes.mobileDrawer1
                    : classes.drawerPaper1,
                }}
                open={open}
              >
                <HeaderNav />
              </Drawer>
              <Navbar
                mobileChat={mobileChat}
                setMobile={setMobile}
                mobileNav={mobileNav}
                setMobileNav={setMobileNav}
              />
              <main className={classes.content}>
                <Box height="5.6rem" />
                <Redirect exact from="/" to="home" />
                <Route
                  exact
                  path="/coinflip/private/:inviteCode"
                  component={Coinflip}
                />
                <Route exact path="/jackpot" component={Jackpot} />
                <Route path="/home" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/affiliates" component={Affiliates} />
                <Route exact path="/roulette" component={Roulette} />
                <Route exact path="/wheel" component={Wheel} />
                <Route exact path="/crash" component={Crash} />
                <Route exact path="/kings" component={Kings} />
                <Route exact path="/race" component={Race} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/fair" component={Fair} />
                <Route exact path="/faq" component={Faq} />
                <Route exact path="/banned" component={Banned} />
                <Route exact path="/history" component={History} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/coinflip" component={CoinflipGames} />
                <Route
                  exact
                  path="/coinflip_history"
                  component={CoinflipHistory}
                />
                <Route exact path="/battles/create" component={CreateBattle} />
                <Route
                  path="/battles/:battleId"
                  render={props => (
                    <BattlePage key={props.match.params.battleId} {...props} />
                  )}
                />
                <Route exact path="/battles" component={Battles} />
                <Route
                  exact
                  path="/a/:affiliateCode"
                  component={AffiliatesRedirect}
                />
                <Route exact path="/login/:provider?" component={Login} />
                {/* <Route exact path="*" component={NotFound} /> */}
                <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
                <br /> <br />
                <Footer />
              </main>
              <Drawer
                anchor="bottom"
                variant="permanent"
                classes={{
                  paper: mobileChat
                    ? classes.mobileDrawer2
                    : classes.drawerPaper2,
                }}
                open={open}
              >
                <Chat />
              </Drawer>
            </div>
          </ToastProvider>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
