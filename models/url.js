const mongoose = require("mongoose");

//schema
const urlSchema = new mongoose.Schema(
  {
    //properties of url
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      rquired: true,
    },
    //an array which will contain objects
    visitHistory: [{ timestamp: { type: Number } }],
  },
  //to find out kaun si entry kitne baje hui
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
