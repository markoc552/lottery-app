import React from "react";

import { Icon } from "semantic-ui-react";

import "./styles.css";

const Navigation = () => {
  return (
    <div className="navigation-wrapper">
      <div className="navigation-item">
        lottery
        <Icon size="small" name="th list" color="blue" />
      </div>
    </div>
  );
};

export default Navigation;
