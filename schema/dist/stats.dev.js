"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var Stats = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  minutes: {
    type: Number,
    min: 0,
    "default": 0
  },
  gp: {
    type: Number,
    min: 0,
    "default": 0
  },
  points: {
    type: Number,
    min: 0,
    "default": 0
  },
  fga: {
    type: Number,
    min: 0,
    "default": 0
  },
  fgm: {
    type: Number,
    min: 0,
    "default": 0
  },
  fta: {
    type: Number,
    min: 0,
    "default": 0
  },
  ftm: {
    type: Number,
    min: 0,
    "default": 0
  },
  assists: {
    type: Number,
    min: 0,
    "default": 0
  },
  steals: {
    type: Number,
    min: 0,
    "default": 0
  },
  blocks: {
    type: Number,
    min: 0,
    "default": 0
  },
  fouls: {
    type: Number,
    min: 0,
    "default": 0
  },
  tos: {
    type: Number,
    min: 0,
    "default": 0
  },
  off: {
    type: Number,
    min: 0,
    "default": 0
  },
  def: {
    type: Number,
    min: 0,
    "default": 0
  },
  reb: {
    type: Number,
    min: 0,
    "default": function _default() {
      if (this.off < 1 || this.def < 1) {
        return 0;
      } else return this.off + this.def;
    }
  },
  ppg: {
    type: Number,
    min: 0,
    "default": function _default() {
      if (this.points < 1 || this.gp < 1) {
        return 0;
      } else return this.points / this.gp;
    }
  },
  apg: {
    type: Number,
    min: 0,
    "default": function _default() {
      if (this.assists < 1 || this.gp < 1) {
        return 0;
      } else return this.assists / this.gp;
    }
  },
  rpg: {
    type: Number,
    min: 0,
    "default": function _default() {
      if (this.reb < 1 || this.gp < 1) {
        return 0;
      } else return this.reb / this.gp;
    }
  },
  spg: {
    type: Number,
    min: 0,
    "default": function _default() {
      if (this.steals < 1 || this.gp < 1) {
        return 0;
      } else return this.steals / this.gp;
    }
  },
  bpg: {
    type: Number,
    min: 0,
    "default": function _default() {
      if (this.blocks < 1 || this.gp < 1) {
        return 0;
      } else return this.blocks / this.gp;
    }
  },
  fgam: {
    type: String,
    "default": function _default() {
      return "".concat(this.fgm, " - ").concat(this.fga);
    }
  },
  otherStats: []
});
module.exports = mongoose.model("Stats", Stats);