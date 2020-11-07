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
    shots: Number,
    makes: Number,
    blocks: Number,
    fouls: Number,
    tos: Number,
    off: Number,
    def: Number,
    reb: {type: Number, default: () => this.off + this.def},
    ppg: {type: Number, default: () => this.points / this.gp},
    apg: {type: Number, default: () => this.assists / this.gp},
    rpg: {type: Number, default: () => this.reb / this.gp},
    spg: {type: Number, default: () => this.steals / this.gp},
    bpg:{type: Number, default: () => this.blocks / this.gp},

    fgPER: {type: String, default: () => `${this.fgm} - ${this.fga}`},

  });
  
  module.exports = mongoose.model("Stats", Stats);