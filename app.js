    const express = require("express");
    const app = express();
    const mongoose = require("mongoose");
    const Listing = require("./modules/listing"); // Ensure this file exists
    const path = require("path");
    const methodOverride = require("method-override");
    const ejsMate = require("ejs-mate");
    require("dotenv").config();

    const PORT = process.env.PORT || 8080;

    // Use environment variables for credentials (recommended)
    const username = "shlok257";
    const rawPassword = "PMRGJw9m6YlyOpg8";
    const encodedPassword = encodeURIComponent(rawPassword);
    const MONGO_URI = `mongodb+srv://${username}:${encodedPassword}@airbnb.hdqmurp.mongodb.net/test?retryWrites=true&w=majority&appName=Airbnb`;

    async function main() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
        // Start the server only after DB is connected
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
    }
    main();

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "/views"));
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.engine("ejs", ejsMate);
    app.use(express.static(path.join(__dirname, "/public")));

    app.get("/", (req, res) => {
    res.send("Hi, I am root");
    });

    // Index Route
    app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
    });

    // New Route
    app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
    });

    // Show Route
    app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
    });

    // Create Route
    app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    });

    // Edit Route
    app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
    });

    // Update Route
    app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
    });

    // Delete Route
    app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    });

