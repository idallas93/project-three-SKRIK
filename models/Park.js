const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkSchema = new Schema(
  {
    parkName: { type: String, required: true },
    hasPoopBags: { type: Boolean },
    // rating: { type: Number },
    groundType: { type: String },
    address: { type: String, required: true },
    reviews: { type: Array },
    ratings: { type: Array },
  },
  { toJSON: { virtuals: true } }
);

parkSchema.virtual("rating").get(function () {
  return (
    this.ratings.reduce((total, rating) => {
      return total + parseInt(rating);
    }, 0) / this.ratings.length
  ).toFixed(2);
});

const Park = mongoose.model("Park", parkSchema);

module.exports = Park;
