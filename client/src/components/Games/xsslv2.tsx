import React, { useState } from 'react';
import '../Styles/XssGame.css';

const XssGameLv2 = () => {
  const [input, setInput] = useState('');

  const handleInputChange = (e:any) => {
    setInput(e.target.value);
  };

  const handleAlert = () => {
    const targetText = "Win!";
    if (input === targetText) {
      alert("Congratulations! You entered the correct flag!");
    } else {
      alert("Incorrect flag. Please try again.");
    }
  };

  return (
    <div className='xss'>
    <div className="xss-game-container">
      <h2 className="xss-game-title">XSS Game Level 2</h2>
      <p className="xss-game-instructions">Play a level of the game in the link below and enter the flag here:</p>
      <br></br><p>(the flag is the text acquired when the game is cleared)</p>
        <a className="xss-game-link" href="https://alf.nu/alert1?world=alert&level=alert0">Click here for game</a>
      <br />
      <br />
      <label className="xss-game-label">
        <span className="xss-game-input-label">Flag:</span>
        <input className="xss-game-input" type="text" value={input} onChange={handleInputChange} />
      </label>
      <br />
      <button className="xss-game-submit" onClick={handleAlert}>Submit</button>
    </div>
    </div>
  );
};

export default XssGameLv2;
