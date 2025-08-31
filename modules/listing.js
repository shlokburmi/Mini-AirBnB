const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
    filename: { type: String, default: "listingimage" },
  url: {
  type: String,
  default:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  set: (v) =>
    v === ""
      ? "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
      : v,
}

      },
        price: {
            type: Number,
            min: 0,
            default: 0
        },
    location: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
