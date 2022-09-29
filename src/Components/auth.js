import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCooie] = useCookies([`user`]);
  const [islogin, setislogin] = useState(true);
  const [user, setUser] = useState({
    email: "",
    Password: "",
    confirmPassword: "",
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
            window.location.reload();
          });
      }
    }
  };
  return (
    <div className="main-container">
      <div className="inside-container">
        <label htmlFor="email">Email</label>
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
            {" "}
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
          </>
        )}
        <div className="set-model">
          <input
            type="button"
            value="Login"
            onClick={() => {
              setislogin(true);
            }}
          />
          <input
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
  );
};

export default Auth;
