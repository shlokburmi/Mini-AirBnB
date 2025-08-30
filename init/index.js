const mongoose =require("mongoose");
const { data: initData } = require("./data.js");
const listing = require("../modules/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";


main()
.then (() => {console.log("Connected to MongoDB");})
.catch((err) => {console.log(err)});

async function main() {
    await mongoose.connect(MONGO_URL);
}
const initDB= async() => {
    await listing.deleteMany({});
    await listing .insertMany(initData);
    console.log("Database Initialized with sample data");
}

initDB();