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
        ? res.send(`Looks like we've got an Error in create stats: ${err}`)
        : Player.findByIdAndUpdate(
            stats.player,
            { "stats": stats._id },
            { new: true },
            function (err, player) {
              err
                ? res.send(`Create stats player edit says ERROR!: ${err}`)
                : res.json(player);
            }
          );
    }
  );
});

//delete a stat by id
router.delete("/:id", (req, res) => {
  Stats.deleteOne({ _id: req.params.id }, (err) => {
    err
      ? res.send(`Error here! ${err}`)
      : res.send(`Category ID ${req.params.id} removed.`);
  });
});

//Delete all stats

router.delete("/purge/all", (req, res) => {
  Stats.deleteMany({ __v: 0 }, (err) => {
    err
      ? res.send(`Error! ${err}`)
      : res.send(`Deleted ${res.deletedCount} categories.`);
  }).then(Player.updateMany({ __v: 0 }, { "stats": " " }), (err) => {
    err
      ? res.send(`Error here! ${err}`)
      : res.send(`Added single blank category.`);
  });
});

//Find and change player's stat by stat id via direct params
router.put("/changeStat/:id/:key/:value", (req, res) => {
  const { id, key, value } = req.params;
  data = { [key]: value };
  Stats.findByIdAndUpdate(id, data, { new: true }, function (err, player) {
    err ? res.send(`Survey says: Error! ${err}`) : res.json(player);
  });
});

//Edit/update all players by adding a global Stat category

router.put("/statToAll/:key/:value", (req, res) => {
  const { key, value } = req.params;
  data = { [key]: value };
  Stats.updateMany({ __v: 0 }, data, function (err, stats) {
    err ? res.send(`Stat to all method says: Error! ${err}`) : res.json(stats);
  });
});

module.exports = router;
