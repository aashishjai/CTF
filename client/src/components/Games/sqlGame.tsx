import React, { useState } from 'react';
import '../Styles/SqlGame.css';

const SqlGame = () => {
  const [input, setInput] = useState('');

  const handleInputChange = (e:any) => {
    setInput(e.target.value);
  };

  const handleAlert = () => {
    const targetText = "Login was successful!  Welcome maxmiller!";
    if (input === targetText) {
      alert("Congratulations! You entered the correct flag!");
    } else {
      alert("Incorrect flag. Please try again.");
    }
  };

  return (
    <div className='sql'>
    <div className="sql-game-container">
      <h2 className="sql-game-title">SQL Injection Game</h2>
      <p className="sql-game-instructions">Play three levels of the game in the link below and enter the flag here:</p>
      <br></br><p>(the flag is the text acquired at the end)</p>
        <a className="sql-game-link" href="https://www.sql-insekten.de/">Click here for game</a>
      <br />
      <br />
      <label className="sql-game-label">
        <span className="sql-game-input-label">Flag:</span>
        <input className="sql-game-input" type="text" value={input} onChange={handleInputChange} />
      </label>
      <br />
      <button className="sql-game-submit" onClick={handleAlert}>Submit</button>
    </div>
    </div>
  );
};

export default SqlGame;
