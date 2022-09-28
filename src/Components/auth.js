import { useState } from "react";

const Auth = () => {
  const [islogin, setislogin] = useState(true);
  const [user, setUser] = useState({
    email: "",
    Password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser({ ...user, [name]: value });
    console.log(user);
  };
  const handleSubmit=()=>{
    
  }
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
                handleSubmit();
              setislogin(false);
            }}
          />
        </div>
        <div className="go">
            Go!
        </div>
      </div>
    </div>
  );
};

export default Auth;
