import React, { useState, useEffect } from "react";

import Navigation from "./components/Navigation/Navigation";
import Welcome from "./components/Welcome/Welcome";
import CurrentState from "./components/CurrentState/CurrentState";
import TryLuck from "./components/TryLuck/TryLuck";
import WinnerPick from "./components/WinnerPick/WinnerPick";

import web3 from "./ethereum/web3";
import lottery from "./ethereum/contract";

const App = () => {
  const [balance, setBalance] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  useEffect(() => {
    getNumberOfPlayers();
    getBalance();
  }, []);

  const getNumberOfPlayers = () => {
    lottery.methods
      .getPlayers()
      .call()
      .then((res) => setNumberOfPlayers(res.length));
  };

  const getBalance = () => {
    web3.eth
      .getBalance("0xbcb9ed44487c4d83271097d88eacac6992edbb1b")
      .then((res) => setBalance(res));
  };

  return (
    <div className="main-wrapper">
      <Navigation />
      <Welcome />
      <CurrentState balance={balance} numberOfPlayers={numberOfPlayers} />
      <div className="card-display">
        <TryLuck
          getNumberOfPlayers={getNumberOfPlayers}
          getBalance={getBalance}
        />
        <WinnerPick
          getNumberOfPlayers={getNumberOfPlayers}
          getBalance={getBalance}
          balance={balance}
        />
      </div>
    </div>
  );
};

export default App;
