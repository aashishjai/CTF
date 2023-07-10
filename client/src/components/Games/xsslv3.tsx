import React from 'react';
import '../Styles/xssLv1.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import { Socket } from "socket.io-client" 
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { useParams } from "react-router-dom";
import axios from "axios";

interface GamePageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> //this is the type for sockets 
  //you can always add more functions/objects that you would like as props for this component
}

function XSS3({socket} : GamePageProps) {
  const iframeStyle = {
    width: '100vw',
    height: '150vh',
  };

  const [listOfUsers, setListOfUsers] = useState([{_id:"", username:"",password:"",score:0}]);
  const [flag, setFlag] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  let myscore : number = 0;
  
  useEffect(() => {

    axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
    console.log(listOfUsers);
  }, []);

  useEffect(() => {
    socket.on("finishupdate4", (data) => {
      axios.put("http://localhost:3001/update", {id:id, score:data.score})
    });
  }, [socket]);

  const checkflag = () => {
    let comparer : string
    let checker : boolean = false
    for (let i=0;i<listOfUsers.length;i++)
    {
        // console.log(id)
        comparer = listOfUsers[i]._id
        console.log(comparer)
        if (comparer === id)
        {
            myscore = listOfUsers[i].score
            checker=true;
        }
    }
    console.log(checker)

    if (checker == false)
    {
        alert("Please login to continue")
        navigate(`/`);
    }
    else
    {
      if (flag === "Such hacking much wow") 
      {
        alert("Congratulations! You entered the correct flag!");
        socket.emit("updateScore_lev4", {userid:id, score: myscore})
        navigate(`/game5/${id}`);
      } else {
        alert("Incorrect flag. Please try again");
      }
    }
    
  };

  return (
    <div className='xsslv1'>
    <div className="xsslv1-game-container">
      <h2 className="xsslv1-game-title">XSS Game 3</h2>
      <p className="xsslv1-game-instructions">Play one level of the game in the link below and enter the flag here:</p>
      <br></br><p>(the flag can be asked from any moderator once the level is cleared)</p>
        <a className="xsslv1-game-link" href="https://xss-game.appspot.com/level2">Click here for game</a>
      <br />
      <br />
      <label className="xsslv1-game-label">
        <span className="xsslv1-game-input-label">Flag:</span>
        <input className="xsslv1-game-input" type="text" onChange={(event) => {
            setFlag(event.target.value);
            }} />
      </label>
      <br />
      <button className="xsslv1-game-submit" onClick={checkflag}>Submit</button>
    </div>
    </div>
  );
};

export default XSS3;
