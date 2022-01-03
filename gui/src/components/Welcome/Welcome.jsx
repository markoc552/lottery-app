import React from "react";

import "./styles.css";

const Welcome = () => {
  return (
    <div className="welcome-wrapper">
      <div className="welcome-greetings">Welcome to Lottery Application</div>
      <div className="welcome-description">
        Where you can participate in lottery luck game and maybe win the grand
        prize :)
      </div>
    </div>
  );
};

export default Welcome;
