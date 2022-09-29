import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  
  const [cookies, setCookie, removeCooie] = useCookies([`user`]);
  const [islogin, setislogin] = useState(true);
  const [user, setUser] = useState({
    email: "",
    Password: "",
    confirmPassword: "",
    url: "",
  });
  const [error, seterror] = useState(null);
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser({ ...user, [name]: value });
    console.log(user);
  };
  const handleSubmit = () => {
    if (!islogin) {
      if (user.Password != user.confirmPassword) {
        seterror("Passwords don't match");
      } else {
        seterror(null);
        fetch("http://localhost:8000/signup", {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setCookie("Name", data.email);
            setCookie("authToken", data.token);
            setCookie("hashedPassword", data.hashedPassword);
            setCookie("user_id", data.user_id);
            setCookie("url", data.url);
            window.location.reload();
          });
      }
    }else if(islogin)
    {
      fetch("http://localhost:8000/login", {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
        .then((response)=>{
          if(response.status==400)
          {
            response.json().then((data)=>{
              setCookie("Name", data.username);
            setCookie("authToken", data.token);
            setCookie("user_id", data.userId);
            window.location.reload();
            })
          }
          else if(response.status==200)
          {
            response.json().then((data)=>{
              seterror(data.message);
            })
          }
          else if(response.status==500)
          {
            response.json().then((data)=>{
              seterror(data.message);
            })
          }
        })
    }
  };
  return (
    <div className="main-container">
      <div className="inside-container">
        <div className="inte">
        <label htmlFor="email">Username</label>
        <input
          type="text"
          name="email"
          id="email"
          value={user.email}
          onInput={(e) => {
            handleChange(e);
          }}
        />
        <label htmlFor="email">Password</label>
        <input
          type="Password"
          name="Password"
          id="Password"
          value={user.Password}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {!islogin && (
          <>
            <label htmlFor="email">Confirm Password</label>
            <input
              type="Password"
              name="confirmPassword"
              id="confirmPassword"
              value={user.confirmPassword}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="url">Profile pic</label>
            <input
              type="url"
              name="url"
              id="url"
              value={user.url}
              onInput={(e) => {
                handleChange(e);
              }}
            />
          </>
        )}
        <div className="set-model">
          <input
          style={islogin ?{borderWidth: 2,borderColor: "red",
          color: "aliceblue",
          borderRadius: 5,
          backgroundColor: "Black"}:{}}
            type="button"
            value="Login"
            onClick={() => {
              setislogin(true);
            }}
          />
          <input
          style={islogin ?{}:{borderWidth: 2,borderColor: "red",
          color: "aliceblue",
          borderRadius: 5,
          backgroundColor: "Black"}}
            type="button"
            value="Sign up"
            onClick={() => {
              setislogin(false);
            }}
          />
        </div>
        <div className="go" onClick={handleSubmit}>
          Go!
        </div>
        {error && (
          <div style={{ color: "red", marginTop: 10 }}>
            <i style={{ marginRight: 5 }} className="fa   fa-exclamation"></i>
            {error}
          </div>
        )}
        </div>
      </div>
      <div className="second-image">
        <img  className="second" src="https://i.imgur.com/VJOQN2t.jpg"/>
      </div>
    </div>
  );
};

export default Auth;
