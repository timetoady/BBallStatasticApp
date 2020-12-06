const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Player = new Schema({
    name: {type: String, required: true},
    teamName: {type: String, min: 1, max: 50},
    img: {type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"},
    number: {type: Number, min: 0, required: true},
    height: {type: String, required: true},
    weight: {type: String, min: 0},
    position: String,
    class: {type: String, default: "Freshman"},
    hometown: String,
    rosterSeason: {type: String, default: new Date().getFullYear()},
    role: {type: String, default: 'Playmaker'},
    starter: {type: Boolean, default: false},
    stats: [{type: Schema.Types.ObjectId, ref: 'Stats'}]
  });
  
  module.exports = mongoose.model("Player", Player);
  