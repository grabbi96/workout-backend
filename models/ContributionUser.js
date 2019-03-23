const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const common = {
  type: String,
  required: true,
  trim: true
};
const contributionSchema = new Schema({
  address: {
    ...common
  },
  bestTime: {
    ...common
  },
  category: {
    ...common
  },
  discription: {
    ...common
  },
  feturedPhoto: {
    ...common
  },
  imageUrl: [String],
  language: {
    ...common
  },
  latLng: {
    lat: Number,
    lng: Number
  },
  name: String,
  youtubeLink: String,
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Contribution = mongoose.model("Contribution", contributionSchema);

module.exports = Contribution;
