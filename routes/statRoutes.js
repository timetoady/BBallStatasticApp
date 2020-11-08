const express = require("express");
const router = express.Router();
const Player = require("../schema/playerInfo");
const Stats = require("../schema/stats");

const checkError = (err, res) => {
    err && res.send(`Looks like we've got an Error: ${err}`);
  };

//Get all current manufacterers
router.get("/", (req, res) => {
    Stats.find((err, stats) => {
      checkError(err, res);
    })
      .populate("player")
      .exec(function (err, stats) {
        err ? res.send(`Oops! There was an error: ${err}`) : res.json(stats);
      });
  });

  router.post("/", (req, res) => {
    Stats.create(
      {
        player: req.body.player,
        minutes: req.body.minutes,
        gp: req.body.gp,
        points: req.body.points,
        fga: req.body.fga,
        fgm: req.body.fgm,
        fta: req.body.fta,
        ftm: req.body.ftm,
        assists: req.body.assists,
        steals: req.body.steals,
        blocks: req.body.blocks,
        fouls: req.body.fouls,
        tos: req.body.tos,
        off: req.body.off,
        def: req.body.def,
      },
      (err, stats) => {
        err
          ? res.send(`Looks like we've got an Error: ${err}`)
          : 
          Stats.find((err, stats) => {
              checkError(err, res);
              res.json(stats);
            });
      }
    );
  
  });

  



  module.exports = router;
