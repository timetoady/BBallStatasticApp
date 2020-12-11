"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var router = express.Router();

var Player = require("../schema/playerInfo");

var Stats = require("../schema/stats");

var checkError = function checkError(err, res) {
  err && res.send("Looks like we've got an Error: ".concat(err));
}; //Get all current stats


router.get("/", function (req, res) {
  Stats.find(function (err, stats) {
    checkError(err, res);
  }).sort("number").populate("player", "name").exec(function (err, stats) {
    err ? res.send("Oops! There was an error: ".concat(err)) : res.json(stats);
  });
}); //Get stats by ID

router.get("/:id", function (req, res) {
  var id = req.params.id;
  Stats.findById(id, function (err, player) {
    checkError(err, res);
  }).populate("player", "name").exec(function (err, player) {
    err ? res.send("Oops! There was an error: ".concat(err)) : res.json(player);
  });
});
router.post("/", function (req, res) {
  // const { playerID } = req.params
  Stats.create({
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
    otherStats: req.body.otherStats
  }, function (err, stats) {
    err ? res.send("Looks like we've got an Error in create stats: ".concat(err)) : Player.findByIdAndUpdate(stats.player, {
      stats: stats._id
    }, {
      "new": true
    }, function (err, player) {
      err ? res.send("Create stats player edit says ERROR!: ".concat(err)) : res.json(player);
    });
  });
}); //delete a stat by id

router["delete"]("/:id", function (req, res) {
  Stats.deleteOne({
    _id: req.params.id
  }, function (err) {
    err ? res.send("Error here! ".concat(err)) : res.send("Category ID ".concat(req.params.id, " removed."));
  });
}); //Delete all stats

router["delete"]("/purge/all", function (req, res) {
  Stats.deleteMany({
    _id: {
      $ne: "5fcb6087eceb1569ac393437"
    }
  }, function (err, result) {
    err ? res.send("Error! ".concat(err)) : res.send("Deleted all players' stats. Count: ".concat(result.deletedCount));
  }).then(Player.updateMany({}, {
    stats: " "
  }), function (err) {
    err ? res.send("Error here! ".concat(err)) : res.send("Added single blank category.");
  });
}); //Find and change player's stat by stat id via direct params

router.put("/changeBaseStat/:id/:key/:value", function (req, res) {
  var _req$params = req.params,
      id = _req$params.id,
      key = _req$params.key,
      value = _req$params.value;
  data = _defineProperty({}, key, value);
  Stats.findByIdAndUpdate(id, data, {
    "new": true
  }, function (err, player) {
    err ? res.send("Survey says: Error! ".concat(err)) : res.json(player);
  });
}); //Edit/update all players by adding a global Stat category

router.put("/addUniqueStatToAll/:key/:value", function (req, res) {
  var _req$params2 = req.params,
      key = _req$params2.key,
      value = _req$params2.value;
  data = _defineProperty({}, key, value);
  Stats.updateMany({}, {
    $addToSet: {
      otherStats: data
    }
  }, function (err, stats) {
    var status = "";
    stats.ok === 0 ? status = false : status = true;
    err ? res.send("Stat to all method says: Error! ".concat(err)) : res.send("Successful: ".concat(status, ". Matches found: ").concat(stats.n, ". Matches changed: ").concat(stats.nModified));
  });
}); //Edit/update all players by removing a global Stat category

router.put("/removeUniqueStatFromAll/:key", function (req, res) {
  var key = req.params.key;
  data = _defineProperty({}, key, {
    $gte: 0
  });
  Stats.updateMany({}, {
    $unset: {
      otherStats: data
    }
  }, function (err, stats) {
    var status = "";
    stats.ok === 0 ? status = false : status = true;
    err ? res.send("Stat to all method says: Error! ".concat(err)) : res.send("Successful: ".concat(status, ". Matches found: ").concat(stats.n, ". Matches changed: ").concat(stats.nModified));
  });
}); //Update one unique stat

router.put("/updateUniqueStat/:statID/:statName/:newValue", function (req, res) {
  var _req$params3 = req.params,
      statID = _req$params3.statID,
      statName = _req$params3.statName,
      newValue = _req$params3.newValue;
  data = _defineProperty({}, statName, {
    $gte: 0
  });
  newData = _defineProperty({}, statName, newValue);
  Stats.updateOne({
    _id: statID
  }, {
    $unset: {
      otherStats: statName
    }
  }, function (err, stats) {
    err ? res.send("Error! ".concat(err)) : Stats.updateOne({
      _id: statID
    }, {
      $addToSet: {
        otherStats: newData
      }
    }, function (err, stats) {
      err ? res.send("Error, captain! ".concat(err)) : res.send("Updated ".concat(statName, " for ID ").concat(statID, " to ").concat(newValue, "."));
    });
  });
}); //Add one unique stat to a player

router.put("/addUniqueStat/:statID/:statName/:newValue", function (req, res) {
  var _req$params4 = req.params,
      statID = _req$params4.statID,
      statName = _req$params4.statName,
      newValue = _req$params4.newValue;
  data = _defineProperty({}, statName, {
    $gte: 0
  });
  newData = _defineProperty({}, statName, newValue);
  Stats.updateOne({
    _id: statID
  }, {
    $addToSet: {
      otherStats: newData
    }
  }, function (err, stats) {
    err ? res.send("Error, captain! ".concat(err)) : res.send("Updated ".concat(statName, " for ID ").concat(statID, " to ").concat(newValue, "."));
  });
}); //Add set of unique stats to one player

router.put("/updateUniqueStats/:statID", function (req, res) {
  var _console;

  var statID = req.params.statID;
  newStats = req.body;
  console.log(newStats);
  var newArray = []; //console.log(statID)

  for (var _i = 0, _Object$entries = Object.entries(newStats); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    newField = {};
    newField[key] = value;
    newArray.push(newField);
  }

  (_console = console).log.apply(_console, newArray);

  Stats.updateOne({
    _id: statID
  }, {
    $addToSet: {
      otherStats: [].concat(newArray)
    }
  }, function (err, stats) {
    err ? res.send("Error, sir! ".concat(err)) : res.send("Updated all unique stats for ID ".concat(statID, "."));
  });
}); //Add set of unique stats

router.put("/updateUniqueStatsbyPlayer/:playerID/", function (req, res) {
  newStats = req.body;
  Stats.updateOne({
    _id: statID
  }, {
    $addToSet: {
      newStats: newStats
    }
  }, function (err, stats) {
    err ? res.send("Error, captain! ".concat(err)) : res.send("Updated ".concat(statName, " for ID ").concat(statID, " to ").concat(newValue, "."));
  });
});
router.put("/replaceViaEdit/:id", function (req, res) {
  var id = req.params.id;
  var update = req.body;
  var options = {
    omitUndefined: true,
    "new": true
  };
  console.log(update);
  Stats.findOneAndReplace({
    _id: id
  }, update, options, function (err, result) {
    err ? res.send(err) //console.log(err)
    : //console.log(result)
    res.send(result);
  });
});
module.exports = router;