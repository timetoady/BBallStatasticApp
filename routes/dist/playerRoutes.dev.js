"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var router = express.Router();

var Player = require("../schema/playerInfo");

var Stats = require("../schema/stats");

var checkError = function checkError(err, res) {
  err && res.send("Looks like we've got an Error: ".concat(err));
}; //Create Player


router.post("/", function (req, res) {
  Player.create({
    name: req.body.name,
    teamName: req.body.teamName,
    img: req.body.img,
    number: req.body.number,
    height: req.body.height,
    weight: req.body.weight,
    position: req.body.position,
    "class": req.body["class"],
    hometown: req.body.hometown,
    rosterSeason: req.body.rosterSeason,
    role: req.body.role,
    starter: req.body.starter
  }, function (err, player) {
    err ? res.send("Sorry, looks like we've got an Error: ".concat(err)) : Player.find({
      _id: player._id
    }, function (err, stats) {
      checkError(err, res);
    }).populate("stats").exec(function (err, todo) {
      err ? res.send("Oops! There was an error: ".concat(err)) : res.json(todo);
    });
  });
}); //Get all current players

router.get("/", function (req, res) {
  Player.find(function (err, players) {
    checkError(err, res);
  }).populate("stats").exec(function (err, player) {
    err ? res.send("Oops! There was an error: ".concat(err)) : res.json(player);
  });
}); //Get player by ID

router.get("/:id", function (req, res) {
  var id = req.params.id;
  Player.findById(id, function (err, player) {
    checkError(err, res);
  }).populate("stats").exec(function (err, player) {
    err ? res.send("Oops! There was an error: ".concat(err)) : res.json(player);
  });
}); //Delete a player by id

router["delete"]("/:id", function (req, res) {
  playerID = req.params.id;
  Player.deleteOne({
    _id: playerID
  }, function (err) {
    err ? res.send("Error! ".concat(err)) : res.send("Player ID ".concat(playerID, " removed"));
  }).then(Stats.deleteOne({
    player: playerID
  }, function (err) {
    if (err) res.send("Error! ".concat(err));
  }));
}); //Delete all players

router["delete"]("/purge/all", function (req, res) {
  Player.deleteMany({
    '_id': {
      $ne: "5fc739722364be364460032b"
    }
  }, function (err, result) {
    err ? res.send("Error! ".concat(err)) : res.send("Deleted ".concat(result.deletedCount, " players."));
  });
}); //Find and change Player key's value by id via direct params

router.put("/editFieldForOne/:id/:key/:value", function (req, res) {
  var _req$params = req.params,
      id = _req$params.id,
      key = _req$params.key,
      value = _req$params.value;
  data = _defineProperty({}, key, value);
  Player.findByIdAndUpdate(id, data, {
    "new": true
  }, function (err, player) {
    err ? res.send("Put method says: Error! ".concat(err)) : res.json(player);
  });
}); // Edit/update a global field for all players

router.put("/editTeamForAll/:key/:oldValue/:newValue", function (req, res) {
  var _req$params2 = req.params,
      key = _req$params2.key,
      oldValue = _req$params2.oldValue,
      newValue = _req$params2.newValue;
  console.log(key, newValue);
  data = _defineProperty({}, key, newValue);
  console.log(data);
  Player.updateMany(_defineProperty({}, key, oldValue), _defineProperty({}, key, newValue), function (err, result) {
    var status = "";
    result.ok === 0 ? status = false : status = true;
    err ? res.send("Stat to all method says: Error! ".concat(err)) : res.send("Successful: ".concat(status, "! Matches found: ").concat(result.n, ". Matches changed: ").concat(result.nModified));
  });
});
module.exports = router;