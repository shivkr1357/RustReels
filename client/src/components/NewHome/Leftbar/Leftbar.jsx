import React from 'react';
import './Leftbar.css'; // Import the CSS file for styling
import logo from "../../../assets/Rustreels/Branding/Text/logo_new_home.png";

const Leftbar = () => {
    return (
        <div className="leftbar">
            <div className="header">
                <img className="header-image" src={logo} />
            </div>
            <div className="user-list">
                {Array.from({ length: 10 }, (_, index) => (
                    <div className="user" key={index}>
                        <img className="avatar" src={"avatar"} />
                        <div className="username">Djaro77</div>
                        <div className="message">My angelo is gay</div>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input type="text" placeholder="Send Message" />
            </div>
        </div>
    );
};

export default Leftbar;