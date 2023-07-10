import React from 'react';
import '../Styles/XssGame.css';
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

const XssGameLv2 = ({socket} : GamePageProps) => {
  const [input, setInput] = useState('');
  const [listOfUsers, setListOfUsers] = useState([{_id:"", username:"",password:"",score:0}]);
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
    socket.on("finishupdate3", (data) => {
      axios.put("http://localhost:3001/update", {id:id, score:data.score})
    });
  }, [socket]);

  const handleInputChange = (e:any) => {
    setInput(e.target.value);
  };

  const handleAlert = () => {
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
      if (input === "Win!") 
      {
        alert("Congratulations! You entered the correct flag!");
        socket.emit("updateScore_lev3", {userid:id, score: myscore})
        navigate(`/game4/${id}`);
      } else {
        alert("Incorrect flag. Please try again");
      }
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
