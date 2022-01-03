import React, { useState } from "react";
import { Icon, Input, Loader, Message } from "semantic-ui-react";

import web3 from "../../ethereum/web3";
import lottery from "../../ethereum/contract";

import "./styles.css";

const TryLuck = ({ getBalance, getNumberOfPlayers }) => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(undefined);

  const onSubmit = async () => {
    setLoading(true);
    setMessage(undefined);

    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
      gasLimit: "0x6691b7",
    });

    setMessage("You entered the lottery!");
    getBalance();
    getNumberOfPlayers();
    setLoading(false);
  };

  return (
    <div
      className="card-container"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80)",
      }}
    >
      {loading ? (
        <Loader active inline inverted style={{ margin: "auto auto" }} />
      ) : (
        <div className="form-display">
          <div className="luck-headline">🤔 Want to try your luck! 🤭</div>
          <div className="luck-headline">Amount of ether to enter </div>
          <Input
            className="luck-headline"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            icon={
              <Icon
                name="send"
                onClick={() => onSubmit()}
                inverted
                circular
                link
              />
            }
          />
          {message !== undefined && (
            <Message
              icon="ethereum"
              content={message}
              color="blue"
              style={{ textAlign: "center" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TryLuck;
