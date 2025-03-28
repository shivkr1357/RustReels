import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, InputBase } from "@material-ui/core";
import { EmojiEmotions, Send } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    chatInputContainer: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#2a2a2a",
        borderRadius: "10px",
        padding: "5px",
        margin: "10px",
    },
    input: {
        flex: 1,
        padding: "5px",
        borderRadius: "5px",
        color: "white",
        "&::placeholder": {
            color: "rgba(255, 255, 255, 0.5)",
        },
    },
    icon: {
        color: "white",
        cursor: "pointer",
        padding: "5px",
        borderRadius: "10px",
        border: "1px solid #221D26",
        marginLeft: "10px",
        color: "yellow",
    },
}));

const ChatInput = () => {
    const classes = useStyles();

    return (
        <Box className={classes.chatInputContainer}>
            <InputBase
                placeholder="Send Message"
                className={classes.input}
                fullWidth
            />
            <EmojiEmotions className={classes.icon} />
            <Send className={classes.icon} />
        </Box>
    );
};

export default ChatInput; 