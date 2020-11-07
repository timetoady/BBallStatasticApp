const express = require("express");
const router = express.Router();
const Player = require("../schema/playerInfo");
const Stats = require("../schema/stats");

const checkError = (err, res) => {
    err && res.send(`Looks like we've got an Error: ${err}`);
  };

  