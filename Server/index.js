var express = require("express");
var app = express();
const { connect } = require("getstream");
const StreamChat = require("stream-chat").StreamChat;
app.use(express.json());
require("dotenv").config();
const { v4 } = require("uuid");
var cors = require("cors");
const bcrypt = require("bcrypt");
const port = 8000;
app.use(cors());
//Sign up

app.post("/signup", async (req, res) => {
  console.log("in signup");

  try {
    const user = req.body;
    console.log(user);
    const user_id = v4();
    const hashedPassword = await bcrypt.hash(user.Password, 10);
    delete user.confirmPassword;
    user.user_id = user_id;
    user.hashedPassword = hashedPassword;
    delete user.Password;
    const client = connect(
      process.env.API_KEY,
      process.env.API_SECRET,
      process.env.App_id
    );
    const token = client.createUserToken(user_id);
    user.token = token.toString();
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

//login

app.post("/login", async (req, res) => {
  console.log("login");
  try {
    const { email, Password } = req.body;
    const client = connect(
      process.env.API_KEY,
      process.env.API_SECRET,
      process.env.App_id
    );
    const chatClient = StreamChat.getInstance(
      process.env.API_KEY,
      process.env.API_SECRET
    );
    const { users } = await chatClient.queryUsers({ name: email });

    if (!users.length) {
      return res.status(400).json({ message: "User does not exist" });
    } else {
      const success = await bcrypt.compare(Password, users[0].hashedPassword);
      const token = client.createUserToken(users[0].id);
      const confirmedName = users[0].name;
      const userId = users[0].id;

      if (success) {
        res.status(200).json({ token, username: confirmedName, userId });
      } else {
        res.status(500).json({ message: "Password invalid" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

app.listen(port, () => {
  console.log("App is running on 8000");
});
