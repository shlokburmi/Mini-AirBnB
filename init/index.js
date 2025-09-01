const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../modules/listing.js");

const username = "shlok257";
const rawPassword = "PMRGJw9m6YlyOpg8";
const encodedPassword = encodeURIComponent(rawPassword);

const MONGO_URI = `mongodb+srv://${username}:${encodedPassword}@airbnb.hdqmurp.mongodb.net/test?retryWrites=true&w=majority&appName=Airbnb`;

async function main() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected");

        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);
        console.log("✅ Data was initialized");
    } catch (err) {
        console.error("❌ Error:", err);
    } finally {
        await mongoose.connection.close();
    }
}

main();
