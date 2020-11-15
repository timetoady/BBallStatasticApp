const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Player = new Schema({
    name: {type: String, required: true},
    teamName: {type: String, required: true},
    imgURL: {type: String, default: "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/"},
    number: {type: Number, min: 0, required: true},
    height: {type: String, required: true},
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
  