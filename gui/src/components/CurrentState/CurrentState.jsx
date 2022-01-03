import React, { useState, useEffect } from "react";

import { Image } from "semantic-ui-react";

import web3 from "../../ethereum/web3";
import lottery from "../../ethereum/contract";

import "./styles.css";

const CurrentState = ({ balance, numberOfPlayers }) => {
  const [manager, setManager] = useState("");

  useEffect(() => {
    getManager();
  }, []);

  const getManager = () => {
    lottery.methods
      .manager()
      .call()
      .then((res) => setManager(res));
  };

  return (
    <div className="card-wrapper">
      <Image
        size="medium"
        style={{
          width: "20vw",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
        }}
        src="https://images.unsplash.com/photo-1629723515744-9ece210b6ddd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      />
      <div className="card-manager-participants">
        <div className="card-manager">Contract owner {manager}</div>
        <div className="card-participants">
          There are currently {numberOfPlayers} competing to win{" "}
          {web3.utils.fromWei(balance, "ether")} ether!
        </div>
      </div>
      <Image
        size="medium"
        style={{
          width: "25vw",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
        src="https://media.istockphoto.com/photos/black-afro-american-girl-won-money-happy-young-woman-holding-dollar-picture-id1153719403?b=1&k=20&m=1153719403&s=170667a&w=0&h=Su-ptZ7DuPk3YA37Nvt8QGh_-8PqIgzkPnIvFBa80zU="
      />
    </div>
  );
};

export default CurrentState;
