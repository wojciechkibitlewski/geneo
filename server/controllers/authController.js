const userDB = {
  users: require("../models/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromisses = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = userDB.users.find((person) => person.email === email);
  if (!foundUser) return res.sendStatus(401);
  // password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create JWT token and refresh token
    const accessToken = jwt.sign(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    // zapisanie refreshToken do konkretnego użytkownika
    // na plikach robi się to tak:
    const otherUsers = userDB.users.filter(
      (person) => person.email !== foundUser.email
    );
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromisses.writeFile(
      path.join(__dirname, "..", "models", "user.json"),
      JSON.stringify(userDB.users)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
