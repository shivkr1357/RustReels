import React, { Fragment, useState } from "react";
//import Moment from 'react-moment';
import { makeStyles } from "@material-ui/core";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { chatSocket } from "../../services/websocket.service";

import PropTypes from "prop-types";
import { connect } from "react-redux";

// MUI Components
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import TipModal from "../modals/TipModal";

import Kappa from "../../assets/emoji/kappa.png";
import Kek from "../../assets/emoji/kek.png";
import Stonks from "../../assets/emoji/stonks.png";
import Yes from "../../assets/emoji/yes.png";
import No from "../../assets/emoji/no.png";
import Stfu from "../../assets/emoji/stfu.png";
import Knife from "../../assets/emoji/knife.png";
import Chill from "../../assets/emoji/chill.png";
import Fax from "../../assets/emoji/fax.png";
import Cap from "../../assets/emoji/cap.png";
import Bruh from "../../assets/emoji/bruh.png";
import Comrade from "../../assets/emoji/comrade.png";
import Tate from "../../assets/emoji/andrewtate.png";
import BTC from "../../assets/emoji/bitcoin.png";
import Damn from "../../assets/emoji/damn.png";
import Pray from "../../assets/emoji/pray.png";
import Sus from "../../assets/emoji/sus.png";
import Sadge from "../../assets/emoji/sadge.png";
import Tom from "../../assets/emoji/tom.png";
import Yikes from "../../assets/emoji/yikes.png";
import Angry from "../../assets/emoji/angry.png";
import Sad from "../../assets/emoji/sad.png";
import Cry from "../../assets/emoji/pepehands.png";
import Wtf from "../../assets/emoji/wtf.png";
import Swag from "../../assets/emoji/swag.png";
import Fuck from "../../assets/emoji/fuck.png";
import Pepebusiness from "../../assets/emoji/pepebusiness.png";
import Yey from "../../assets/emoji/Yey.png";
import Clown from "../../assets/emoji/clown.png";
import Rip from "../../assets/emoji/rip.png";
import Pepe from "../../assets/emoji/pepe.png";
import Monkas from "../../assets/emoji/monkaS.png";

import Emoji from './Emoji';

const useStyles = makeStyles({
  content: {
    color: "#707479",
    fontSize: 13,
    fontFamily: "Rubik",
    fontWeight: 500,
    letterSpacing: ".1em",
    whiteSpace: "normal",
    marginTop: 15,
    marginRight: "20px",
    wordWrap: "break-word",
    hyphens: "auto",
  },
  avatar: {
    width: 35,
    height: 35,
    marginTop: "-5px",
    marginLeft: "20px",
    marginRight: "8px",
    borderRadius: "100%",
  },
  chatbox: {
    display: "flex",
    padding: "20px 0px 20px 0px",
    borderTop: "1.5px solid #1b1f22",
    fontFamily: "Rubik",
    borderRadius: 0,
    "& .message": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      color: "#e0e0e0",
      fontFamily: "Rubik",
      fontWeight: 500,
      letterSpacing: ".1em",
      position: "relative",
      marginTop: "4px",
      fontSize: 11,
      "& > div": {
        maxWidth: "210px",
      },
    },
    "& .username": {
      color: "#e0e0e0",
      fontFamily: "Rubik",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: ".1em",
      position: "relative",
      marginTop: "7px",
      fontSize: "9.6px",
      "&:hover": {
        opacity: "0.5",
        cursor: "pointer",
      },
    },
    "& .username2": {
      color: "#e0e0e0",
      fontFamily: "Rubik",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: ".1em",
      position: "relative",
      marginTop: "7px",
      fontSize: "9.6px",
    },
    "& .admin": {
      background: "#ca382d",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Rubik",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .mod": {
      background: "#3e8441",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Rubik",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .dev": {
      background: "#0b655c",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Rubik",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .partner": {
      background: "#791f84",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Rubik",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .user": {
      background: "#31363c",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 4.5px",
      color: "#fff",
      fontFamily: "Rubik",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .userlevel": {
      padding: "5px 4.5px",
      marginRight: "8px",
      color: "#ffffff",
      fontFamily: "Rubik",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
      borderRadius: "4px",
      fontSize: "9px",
    },
    "& .bronze": {
      background: "#C27C0E",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Rubik",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .silver": {
      background: "#95A5A6",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Rubik",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .gold": {
      background: "#b99309",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Rubik",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .diamond": {
      background: "#3498DB",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Rubik",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
  },
  gif: {
    width: "100%",
    borderRadius: 5,
    marginTop: 5,
  },
  contextMenu: {
    background: "#212529",
    border: "1px solid #212529",
    color: "#fff",
    fontFamily: "Rubik",
    fontWeight: 500,
    letterSpacing: ".1em",
    padding: "1rem 0 0 0",
    zIndex: "100",
  },
  contextMenuItem: {
    cursor: "pointer",
    color: "white",
    padding: ".7rem 1.5rem",
    transition: "all .3s ease",
    borderTop: "1px solid #2d334a42",
    "&:hover": {
      color: "#737990",
    },
  },
});

const Message = ({ rank, message, isAuthenticated, isLoading, user }) => {
  // Declare state
  const classes = useStyles();

  const emotes = [
    { word: "Kappa", src: `${Kappa}`, alt: "Kappa" },
    { word: "Kek", src: `${Kek}`, alt: "Kek" },
    { word: "Stonks", src: `${Stonks}`, alt: "Stonks" },
    { word: "Yes", src: `${Yes}`, alt: "Yes" },
    { word: "Yes", src: `${No}`, alt: "Yes" },
    { word: "Yes", src: `${Stfu}`, alt: "Yes" },
    { word: "Knife", src: `${Knife}`, alt: "Knife" },
    { word: "Chill", src: `${Chill}`, alt: "Chill" },
    { word: "Fax", src: `${Fax}`, alt: "Fax" },
    { word: "Cap", src: `${Cap}`, alt: "Cap" },
    { word: "Bruh", src: `${Bruh}`, alt: "Bruh" },
    { word: "Comrade", src: `${Comrade}`, alt: "Comrade" },
    { word: "Tate", src: `${Tate}`, alt: "Tate" },
    { word: "BTC", src: `${BTC}`, alt: "BTC" },
    { word: "Damn", src: `${Damn}`, alt: "Damn" },
    { word: "Pray", src: `${Pray}`, alt: "Pray" },
    { word: "Sus", src: `${Sus}`, alt: "Sus" },
    { word: "Sadge", src: `${Sadge}`, alt: "Sadge" },
    { word: "Tom", src: `${Tom}`, alt: "Tom" },
    { word: "Yikes", src: `${Yikes}`, alt: "Yikes" },
    { word: "Angry", src: `${Angry}`, alt: "Angry" },
    { word: "Sad", src: `${Sad}`, alt: "Sad" },
    { word: "WTF", src: `${Wtf}`, alt: "WTF" },
    { word: "Swag", src: `${Swag}`, alt: "Swag" },
    { word: "Fuck", src: `${Fuck}`, alt: "Fuck" },
    { word: "Clown", src: `${Clown}`, alt: "Clown" },
    { word: "Yey", src: `${Yey}`, alt: "Yey" },
    { word: "Pepe", src: `${Pepe}`, alt: "Pepe" },
    { word: "MonkaS", src: `${Monkas}`, alt: "MonkaS" },
    { word: "Rip", src: `${Rip}`, alt: "Rip" },
    { word: "Cry", src: `${Cry}`, alt: "Cry" },
    { word: "Pepebusiness", src: `${Pepebusiness}`, alt: "Pepebusiness" },
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const openTipUserModal = () => {
    setModalVisible(true);
  }

  // MenuItem onClick event handler
  const onContextClick = (event, action, props) => {
    switch (action) {
      case "mute":
        return chatSocket.emit(
          "send-chat-message",
          `.mute-user ${props.userId}`
        );
      case "ban":
        return chatSocket.emit(
          "send-chat-message",
          `.ban-user ${props.userId}`
        );
      case "remove-message":
        return chatSocket.emit(
          "send-chat-message",
          `.remove-message ${props.msgId}`
        );
      default:
        break;
    }
  };

  const handleLeftClick = e => {
    openTipUserModal();
  };

  return (
    <Fragment>
      <TipModal
        handleClose={() => setModalVisible(!modalVisible)}
        open={modalVisible}
        userId={message.user.id}
        userName={message.user.username}
        userAvatar={message.user.avatar}
      />
      {
        rank >= 3 ? (
          <Fragment>
            <ContextMenu className={classes.contextMenu} id={message.msgId}>
              <p style={{ marginTop: 0, paddingLeft: "1.5rem", color: "#4F79FD" }}>
                CONTROLS:
              </p>
              <MenuItem
                className={classes.contextMenuItem}
                onClick={e =>
                  onContextClick(e, "remove-message", {
                    msgId: message.msgId,
                  })
                }
              >
                <i className="fas fa-trash-alt" /> DELETE MESSAGE
              </MenuItem>
              <MenuItem
                className={classes.contextMenuItem}
                onClick={e => onContextClick(e, "mute", { userId: message.user.id })}
              >
                <i className="fas fa-microphone-slash Blue" /> MUTE USER
              </MenuItem>
              <MenuItem
                className={classes.contextMenuItem}
                onClick={e =>
                  onContextClick(e, "ban", {
                    userId: message.user.id,
                  })
                }
              >
                <i className="fas fa-gavel Red" /> BAN USER
              </MenuItem>
            </ContextMenu>
          </Fragment>
        ) : (
          <Fragment>
          </Fragment>
        )
      }
      <ContextMenuTrigger id={message.msgId}>
        <Box className={classes.chatbox}>
          <Avatar
            variant="rounded"
            src={message.user.avatar}
            className={classes.avatar}
            style={{ border: `2px solid ${message.user.level.levelColor}`, }}
          />
          <Box className="message">
            <Box>
              {isAuthenticated && user ? (
                <Box onClick={handleLeftClick} className="username">
                  {<span className="userlevel" style={{ background: `${message.user.level.levelColor}`, }}>{message.user.level.name}</span>}
                  {message.user.rank === 5 && <span className="admin">ADMIN</span>}
                  {message.user.rank === 4 && <span className="mod">MOD</span>}
                  {message.user.rank === 3 && <span className="dev">DEV</span>}
                  {message.user.rank === 2 && <span className="partner">PARTNER</span>}
                  {message.user.username}{" "}
                </Box>
              ) : (
                <Box className="username2">
                  {<span className="userlevel" style={{ background: `${message.user.level.levelColor}`, }}>{message.user.level.name}</span>}
                  {message.user.rank === 5 && <span className="admin">ADMIN</span>}
                  {message.user.rank === 4 && <span className="mod">MOD</span>}
                  {message.user.rank === 3 && <span className="dev">DEV</span>}
                  {message.user.rank === 2 && <span className="partner">PARTNER</span>}
                  {message.user.username}{" "}
                </Box>
              )}
            </Box>
            <Box className={classes.content}>
              {message.content.split(/\b/).map((word, i) => {
                let emote = emotes.find(emote => emote.word.toLowerCase() === word.toLowerCase());;
                if (emote) {
                  return <Emoji key={i} src={emote.src} alt={emote.alt} title={emote.alt} />
                }
                return word
              })}
            </Box>
          </Box>
        </Box>
      </ContextMenuTrigger>
    </Fragment>
  );
};

Message.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Message);
