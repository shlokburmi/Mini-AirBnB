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
            "https://unsplash.com/photos/snowy-mountain-peak-peeks-through-the-clouds-LTIrGbdmCgk",
          set: (v) =>
            v === ""
              ? "https://unsplash.com/photos/snowy-mountain-peak-peeks-through-the-clouds-LTIrGbdmCgk"
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
