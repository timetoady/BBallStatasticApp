const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Player = new Schema({
    name: String,
    number: {type: Number, min: 0},
    height: String,
    weight: {type: Number, min: 0},
    position: String,
    class: {type: String, default: "Freshman"},
    hometown: String,
    rosterSeason: {type: Number, default: new Date().getFullYear()},
    role: {type: String, default: 'Playmaker'},
    starter: {type: Boolean, default: false},
    stats: [{type: Schema.Types.ObjectId, ref: 'Stats'}]
  });
  
  module.exports = mongoose.model("Player", Player);
  