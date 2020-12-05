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
    .sort("number")
    .populate("player", "name")
    .exec(function (err, stats) {
      err ? res.send(`Oops! There was an error: ${err}`) : res.json(stats);
    });
});

router.post("/", (req, res) => {
  // const { playerID } = req.params
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
      otherStats: req.body.otherStats,
    },
    (err, stats) => {
      err
        ? res.send(`Looks like we've got an Error in create stats: ${err}`)
        : Player.findByIdAndUpdate(
            stats.player,
            { stats: stats._id },
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
  Stats.deleteMany({ '_id': {$ne: "5fcb6087eceb1569ac393437" } }, (err, result) => {
    err
      ? res.send(`Error! ${err}`)
      : res.send(`Deleted all players' stats. Count: ${result.deletedCount}`);
  }).then(Player.updateMany({}, { stats: " " }), (err) => {
    err
      ? res.send(`Error here! ${err}`)
      : res.send(`Added single blank category.`);
  });
});

//Find and change player's stat by stat id via direct params
router.put("/changeBaseStat/:id/:key/:value", (req, res) => {
  const { id, key, value } = req.params;
  data = { [key]: value };
  Stats.findByIdAndUpdate(id, data, { new: true }, function (err, player) {
    err ? res.send(`Survey says: Error! ${err}`) : res.json(player);
  });
});

//Edit/update all players by adding a global Stat category
router.put("/addUniqueStatToAll/:key/:value", (req, res) => {
  const { key, value } = req.params;
  data = { [key]: value };
  Stats.updateMany({}, { $addToSet: { otherStats: data } }, function (
    err,
    stats
  ) {
    let status = "";
    stats.ok === 0 ? (status = false) : (status = true);
    err
      ? res.send(`Stat to all method says: Error! ${err}`)
      : res.send(
          `Successful: ${status}. Matches found: ${stats.n}. Matches changed: ${stats.nModified}`
        );
  });
});

//Edit/update all players by removing a global Stat category
router.put("/removeUniqueStatFromAll/:key", (req, res) => {
  const { key } = req.params;
  data = { [key]: { $gte: 0 } };
  Stats.updateMany({}, { $unset: { otherStats: data } }, function (err, stats) {
    let status = "";
    stats.ok === 0 ? (status = false) : (status = true);
    err
      ? res.send(`Stat to all method says: Error! ${err}`)
      : res.send(
          `Successful: ${status}. Matches found: ${stats.n}. Matches changed: ${stats.nModified}`
        );
  });
});

//Update one unique stat
router.put("/updateUniqueStat/:statID/:statName/:newValue", (req, res) => {
  const { statID, statName, newValue } = req.params;
  data = { [statName]: { $gte: 0 } };
  newData = { [statName]: newValue };
  Stats.updateOne(
    { _id: statID },
    { $unset: { otherStats: statName } },
    function (err, stats) {
      err
        ? res.send(`Error! ${err}`)
        : Stats.updateOne(
            { _id: statID },
            { $addToSet: { otherStats: newData } },
            function (err, stats) {
              err
                ? res.send(`Error, captain! ${err}`)
                : res.send(
                    `Updated ${statName} for ID ${statID} to ${newValue}.`
                  );
            }
          );
    }
  );
});

//Add one unique stat
router.put("/addUniqueStat/:statID/:statName/:newValue", (req, res) => {
  const { statID, statName, newValue } = req.params;
  data = { [statName]: { $gte: 0 } };
  newData = { [statName]: newValue };
  Stats.updateOne(
    { _id: statID },
    { $addToSet: { otherStats: newData } },
    function (err, stats) {
      err
        ? res.send(`Error, captain! ${err}`)
        : res.send(`Updated ${statName} for ID ${statID} to ${newValue}.`);
    }
  );
});

//Add set of unique stats
router.put("/updateUniqueStats/:statID", (req, res) => {
    const { statID } = req.params
    newStats = req.body
    console.log(newStats)
    const newArray = []
    //console.log(statID)
  for (const [key, value] of Object.entries(newStats)) {
    newField = {}
    newField[key] = value
    newArray.push(newField)
    
    

  }
    console.log(...newArray)
    Stats.updateOne(
      { _id: statID },
      { $addToSet: { otherStats: [...newArray] } },
      function (err, stats) {
        err
          ? res.send(`Error, sir! ${err}`)
          : res.send(`Updated all unique stats for ID ${statID}.`);
      }
    );
});

//Add set of unique stats
router.put("/updateUniqueStatsbyPlayer/:playerID/", (req, res) => {
  newStats = req.body
 Stats.updateOne(
  { _id: statID },
  { $addToSet: { newStats } },
  function (err, stats) {
    err
      ? res.send(`Error, captain! ${err}`)
      : res.send(`Updated ${statName} for ID ${statID} to ${newValue}.`);
  }
);
});

module.exports = router;
