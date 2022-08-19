import { useState, useEffect } from "react";
import url from "./assets/music/sound.mp3";

import "./App.css";

import { NavBar } from "./NavBar";
import { MainMint } from "./MainMint";

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className="overlay">
      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="moving-background"></div>
    </div>
  );
}

export default App;
