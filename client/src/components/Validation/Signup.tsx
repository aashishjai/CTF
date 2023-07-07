import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import './Home.css';

interface HomePageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>; //this is the type for sockets
  //you can always add more functions/objects that you would like as props for this component
}

function containsNumbers(str: string) {
  return /[0-9]/.test(str);
}

function SignUpPage({ socket }: HomePageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [listOfUsers, setListOfUsers] = useState([
    { _id: "", username: "", password: "", score: 0 }
  ]);
  const [signedup, setSignedUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
    console.log("blah");
  }, [signedup]);

  const createUser = () => {
    //username checking
    let flag: boolean = false;

    console.log(listOfUsers);
    for (let i = 0; i < listOfUsers.length; i++) {
      if (username === listOfUsers[i].username) {
        flag = true;
        break;
      }
    }

    if (flag === true) {
      alert("Username already exists: Please choose a different username");
    } else {
      //password checking
      if (
        password.length < 8 ||
        password.toLowerCase() === password ||
        containsNumbers(password) === false
      ) {
        alert(
          "Please choose a better password: password should have at least 8 characters, contain at least one uppercase letter and one number"
        );
      } else {
        axios
          .post("http://localhost:3001/createUser", {
            username,
            password,
            score: 0
          })
          .then((response) => {
            setListOfUsers([...listOfUsers, response.data]);
          });
        setSignedUp(true);
      }
    }
  };

  const loginUser = () => {
    let flag: boolean = false;
    let id: string = "";
    console.log(listOfUsers);
    for (let i = 0; i < listOfUsers.length; i++) {
      if (
        username === listOfUsers[i].username &&
        password === listOfUsers[i].password
      ) {
        flag = true;
        console.log();
        id = listOfUsers[i]._id;
        break;
      }
    }

    if (flag === true) {
      navigate(`/game1/${id}`);
    } else {
      alert("Invalid username/password entered!");
    }
  };

  return (
    <div className="homePage">
      {signedup ? (
        <>
          <h1 className="title">Login</h1>
          <br></br>
          <div className="inputField">
            <input
            type='email'
              placeholder="Enter Username..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="inputField">
            <input
              type="password"
              placeholder="Enter Password..."
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <br></br>

          <button className="button" onClick={() => loginUser()}>
            Sign In
          </button>
          <br></br>

          <button className="switchButton" onClick={() => setSignedUp(false)}>
            Don't have an account? Click here to sign up
          </button>
        </>
      ) : (
        <>
          <h1 className="title">Sign Up</h1>
          <br></br>

          <div className="inputField">
            <input
            type='email'
              placeholder="Enter Username..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="inputField">
            <input
              type="password"
              placeholder="Enter Password..."
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <br></br>

          <button className="button" onClick={() => createUser()}>
            Sign Up
          </button>
          <br></br>

          <button className="switchButton" onClick={() => setSignedUp(true)}>
            Already have an account? Click here to login
          </button>
        </>
      )}
    </div>
  );
}

export default SignUpPage;
