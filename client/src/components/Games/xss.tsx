import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
// import { useAlert } from 'react-alert'
import { useParams } from "react-router-dom";

const XSS = () => {
  const iframeStyle = {
    width: '100vw',
    height: '150vh',
  };
  const [flag, setFlag] = useState("");
  const navigate = useNavigate();
  // const alert = useAlert();
  const { id } = useParams();

  const checkflag = () => {
    if (flag === "You can now advance to the next level.") 
    {
      alert("Correct flag!");
      navigate(`/game2/${id}`);
    } else {
      alert("Incorrect flag, please try again");
    }
  };

  return (
    <>
    <div>
    <iframe src="https://xss-game.appspot.com/level1" style={iframeStyle}></iframe>
    </div>
    <div>
            <input  placeholder = "Enter Flag..." onChange={(event) => {
            setFlag(event.target.value);
            }}></input>
      <button onClick={() => checkflag()} >Submit</button>
    </div>
    </>
  );
};

export default XSS;
