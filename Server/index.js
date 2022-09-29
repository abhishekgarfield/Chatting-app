var express = require("express");
var app = express();
const { connect } = require("getstream");
app.use(express.json());
const { v4 } = require("uuid");
var cors = require("cors");
const bcrypt = require("bcrypt");
const port = 8000;
app.use(cors());
const API_KEY = "46gb46cpf2hp";
const API_SECRET =
  "pz2544tunhb4eqek7guchdu32ub9mkqthfvbt8fqawzpnxfjahegtcpd4v4u53fa";
const App_id = 1212297;
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
    const client = connect(API_KEY, API_SECRET, App_id);
    const token = client.createUserToken(user_id);
    user.token = token.toString();
    console.log(user)
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("App is running on 8000");
});
