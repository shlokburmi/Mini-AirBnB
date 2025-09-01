const mongoose =require("mongoose");
const { data: initData } = require("./data.js");
const listing = require("../modules/listing.js");
require("dotenv").config();


main()
.then (() => {console.log("Connected to MongoDB");})
.catch((err) => {console.log(err)});

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}
const initDB= async() => {
    await listing.deleteMany({});
    await listing .insertMany(initData.data);
    console.log("Database Initialized with sample data");
    mongoose.connection.close();
}

initDB();