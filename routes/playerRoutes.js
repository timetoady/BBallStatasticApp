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
        teamName: req.body.teamName,
        img: req.body.img,
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
      (err, player) => {
        err
          ? res.send(`Sorry, looks like we've got an Error: ${err}`)
          : Player.find({ _id: player._id },(err, stats) => {
              checkError(err, res);
            }).populate("stats")
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

    //Get player by ID
router.get("/:id", (req, res) => {
  const { id } = req.params
  Player.findById(id, (err, player) => {
    checkError(err, res);
  })
    .populate("stats")
    .exec(function (err, player) {
      err ? res.send(`Oops! There was an error: ${err}`) : res.json(player);
    });
});


//Delete a player by id
router.delete("/:id", (req, res) => {
  playerID = req.params.id
  Player.deleteOne({ _id: playerID}, (err) => {
    err
      ? res.send(`Error! ${err}`)
      : res.send(`Player ID ${playerID} removed`);
  }).then(Stats.deleteOne({player: playerID}, (err) =>{
    if (err) res.send(`Error! ${err}`)
  }));
});

//Delete all players
router.delete("/purge/all", (req, res) => {
  Player.deleteMany({ '_id': {$ne: "5fc739722364be364460032b" } }, (err, result) => {
    err
      ? res.send(`Error! ${err}`)
      : res.send(`Deleted ${result.deletedCount} players.`);
  })
});

//Find and change Player key's value by id via direct params
router.put("/editFieldForOne/:id/:key/:value", (req, res) => {
  const { id, key, value } = req.params;
  data = { [key]: value };
  Player.findByIdAndUpdate(id, data, { new: true }, function (
    err,
    player
  ) {
    err ? res.send(`Put method says: Error! ${err}`) : res.json(player);
  });
});

// Edit/update a global field for all players
router.put("/editTeamForAll/:key/:oldValue/:newValue", (req, res) => {
  const { key, oldValue, newValue } = req.params;
  console.log(key, newValue)
  data = { [key]: newValue };
  console.log(data)
  Player.updateMany({ [key]: oldValue }, { [key]: newValue }, function (
    err,
    result
  ) {
    let status = "";
    result.ok === 0 ? (status = false) : (status = true);
    err
      ? res.send(`Stat to all method says: Error! ${err}`)
      : res.send(
          `Successful: ${status}! Matches found: ${result.n}. Matches changed: ${result.nModified}`
        );
  });
});


  module.exports = router;
