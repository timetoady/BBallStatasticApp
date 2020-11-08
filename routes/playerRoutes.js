const express = require("express");
const router = express.Router();
const Player = require("../schema/playerInfo");
const Stats = require("../schema/stats");

const checkError = (err, res) => {
    err && res.send(`Looks like we've got an Error: ${err}`);
  };

//Create Player
router.post("/", (req, res) => {
    Player.create(
      {
        name: req.body.name,
        number: req.body.number,
        height: req.body.height,
        weight: req.body.weight,
        position: req.body.position,
        class: req.body.class,
        hometown: req.body.hometown,
        rosterSeason: req.body.rosterSeason,
        role: req.body.role,
        starter: req.body.starter,

      },
      (err) => {
        err
          ? res.send(`Sorry, looks like we've got an Error: ${err}`)
          : Player.find((err, stats) => {
              checkError(err, res);
            })
              .populate("stats")
              .exec(function (err, todo) {
                err
                  ? res.send(`Oops! There was an error: ${err}`)
                  : res.json(todo);
              });
      }
    );
  
  });

  //Get all current players
router.get("/", (req, res) => {
    Player.find((err, players) => {
      checkError(err, res);
    })
      .populate("stats")
      .exec(function (err, player) {
        err ? res.send(`Oops! There was an error: ${err}`) : res.json(player);
      });
  });



  module.exports = router;
