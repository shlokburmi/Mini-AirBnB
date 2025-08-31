const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./modules/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


main()
.then (() => {console.log("Connected to MongoDB");})
.catch((err) => {console.log(err)});

async function main() {
    await mongoose.connect(MONGO_URL);
}   


app.get("/", (req, res) => {
    res.send("Hello , I am Root");
});
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));

//index route

app.get("/Listings",async(req, res) => {
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
    });
// new route
app.get("/Listings/new",(req, res) => {
    res.render("./listings/new.ejs");

});

// show route 
app.get("/Listings/:id",async(req, res) => {
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
});

// Create route
app.post("/Listings",async(req, res) => {
    // let {title,description,image,price,location,country}=req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/Listings");
});


// Edit route
app.get("/Listings/:id/edit",async(req, res) => {
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

// Update route
app.put("/Listings/:id",async(req, res) => {
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/Listings/${id}`);

});

// Delete route
app.delete("/Listings/:id",async(req,res) =>{
    let {id} =req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/Listings");

})


// app.get("/testListing", async(req, res) => {
//     let sampleListing =new Listing({
//         title:"My New Villa",
//         description:"A beautiful villa located in the heart of the city.",
//         price:5000,
//         location:"Miami",
//         country:"USA"
//     });
//     await sampleListing.save();
    
//     console.log("sample was saved");
//     res.send("Listing saved");
// });
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});