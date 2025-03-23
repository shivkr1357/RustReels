import React from "react";
import { withStyles } from "@material-ui/core/styles";

// MUI Components
import Box from "@material-ui/core/Box";

// Assets
import wheelImg from "../../assets/wheel.png";

// Custom Styled Component
const WheelContainer = withStyles({
  root: {
    position: "relative",
    width: "85%",  
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      transformOrigin: "center center",  
    },
    transform: props => props.rotate,
    transition: props => props.transition,
    opacity: props => props.opacity,
  },
})(Box);

const WheelSpin = ({ opacity, rotate, transition }) => {
  return (
    <WheelContainer
      opacity={opacity}
      rotate={rotate}
      transition={transition}
    >
      <img 
        src={wheelImg} 
        alt="Wheel" 
        style={{ 
          transform: 'scale(1.1)',
          display: 'block',  
          margin: 'auto'     
        }} 
      />
    </WheelContainer>
  );
};

export default WheelSpin;
