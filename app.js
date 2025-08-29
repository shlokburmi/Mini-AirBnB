const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./modules/listing");


main()
.then (() => {console.log("Connected to MongoDB");})
.catch((err) => {console.log(err)});

async function main() {
    await mongoose.connect(MONGO_URL);
}   


app.get("/", (req, res) => {
    res.send("Hello , I am Root");
});

app.get("/testListing", async(req, res) => {
    let sampleListing =new Listing({
        title:"My New Villa",
        description:"A beautiful villa located in the heart of the city.",
        price:5000,
        location:"Miami",
        country:"USA"
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("Listing saved");
});
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});