import React from 'react';
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

function XSS({socket} : GamePageProps) {
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
    socket.on("finishupdate1", (data) => {
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
      if (flag === "You can now advance to the next level.") 
      {
        alert("Correct flag!");
        socket.emit("updateScore_lev1", {userid:id, score: myscore})
        navigate(`/game2/${id}`);
      } else {
        alert("Incorrect flag, please try again");
      }
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
