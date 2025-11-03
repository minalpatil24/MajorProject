// if (process.env.NODE_ENV != "production") {
//     require('dotenv').config();
// }

// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const dbUrl = process.env.ATLASDB_URL;

// main().then(() => {
//     console.log("connected to DB");
// }).catch((err) => {
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(dbUrl);
// }

// //  Updated initDB function
// const initDB = async () => {
//     console.log(" initDB started");
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => ({ ...obj, owner: "65f498de938bbbafdcf350b8" }));
//     await Listing.insertMany(initData.data);
//     console.log(" data was initialized");
// };

// // 👉 Make sure this line is UNCOMMENTED
// initDB();

//  Step 1: Load environment variables correctly
const path = require("path");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

//  Step 2: Import everything else
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log(" Connected to MongoDB");
        await initDB();
        mongoose.connection.close();
        console.log("Connection closed");
    } catch (err) {
        console.error("DB Connection error:", err);
    }
}

async function initDB() {
    console.log(" initDB started");
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "65f498de938bbbafdcf350b8"
    }));
    await Listing.insertMany(initData.data);
    console.log(" Data was initialized successfully!");
}

main();
