const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Stats = new Schema({
    player: {type: Schema.Types.ObjectId, ref: 'Player'},
    minutes: {type: Number, min: 0, default: 0 },
    gp: {type: Number, min: 0, default: 0 },
    points: {type: Number, min: 0, default: 0 },
    fga: {type: Number, min: 0, default: 0 },
    fgm: {type: Number, min: 0, default: 0 },
    fta: {type: Number, min: 0, default: 0 },
    ftm: {type: Number, min: 0, default: 0 },
    assists: {type: Number, min: 0, default: 0 },
    steals: {type: Number, min: 0, default: 0 },
    blocks: {type: Number, min: 0, default: 0 },
    fouls: {type: Number, min: 0, default: 0 },
    tos: {type: Number, min: 0, default: 0 },
    off: {type: Number, min: 0, default: 0 },
    def: {type: Number, min: 0, default: 0 },
    reb: {type: Number, min: 0, default: function() {return this.off + this.def}},
    ppg: {type: Number, min: 0, default: function() {return this.points / this.gp}},
    apg: {type: Number, min: 0, default: function() {return this.assists / this.gp}},
    rpg: {type: Number, min: 0, default: function() {return this.reb / this.gp}},
    spg: {type: Number, min: 0, default: function() {return this.steals / this.gp}},
    bpg: {type: Number, min: 0, default: function() {return this.blocks / this.gp}},
    fgam: {type: String, default: function() {return `${this.fgm} - ${this.fga}`}},
    otherProps: [],

  });
  
  module.exports = mongoose.model("Stats", Stats);