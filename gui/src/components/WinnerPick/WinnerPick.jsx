import React, { useState } from "react";
import { Button, Loader } from "semantic-ui-react";

import web3 from "../../ethereum/web3";
import lottery from "../../ethereum/contract";

import "./styles.css";

const WinnerPick = ({ getBalance, getNumberOfPlayers, balance }) => {
  const [message, setMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    setMessage(undefined);

    const accounts = await web3.eth.getAccounts();

    await lottery.methods
      .pickWinner()
      .send({ from: accounts[0], gasLimit: "0x6691b7" });

    setMessage(
      "A winner has been picked! Check your account cause during anoniminity we can't tell publicly who won!"
    );
    getBalance();
    getNumberOfPlayers();
    setLoading(false);

    setTimeout(() => setMessage(undefined), 2000);
  };

  return (
    <div className="card-container">
      <div className="winner-pick">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Button
              disabled={balance === "0"}
              color="blue"
              basic
              style={{ margin: "auto auto" }}
              onClick={() => onClick()}
            >
              Pick a Winner! 🎉 🎉
            </Button>
            {message !== undefined && (
              <div className="message-winner">{message}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WinnerPick;
