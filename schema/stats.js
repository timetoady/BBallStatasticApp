const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Stats = new Schema({
    player: {type: Schema.Types.ObjectId, ref: 'Player'},
    minutes: Number,
    gp: Number,
    points: Number,
    fga: Number,
    fgm: Number,
    fta: Number,
    ftm: Number,
    assists: Number,
    steals: Number,
    blocks: Number,
    fouls: Number,
    tos: Number,
    off: Number,
    def: Number,
    reb: {type: Number, default: function() {return this.off + this.def}},
    ppg: {type: Number, default: function() {return this.points / this.gp}},
    apg: {type: Number, default: function() {return this.assists / this.gp}},
    rpg: {type: Number, default: function() {return this.reb / this.gp}},
    spg: {type: Number, default: function() {return this.steals / this.gp}},
    bpg: {type: Number, default: function() {return this.blocks / this.gp}},
    fgam: {type: String, default: function() {return `${this.fgm} - ${this.fga}`}},


  });
  
  module.exports = mongoose.model("Stats", Stats);