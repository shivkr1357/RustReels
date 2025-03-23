// Require Dependencies
const config = require("../config");
const mongoose = require("mongoose");
require('../models'); // Load all models

// Setup Additional Variables
const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? config.database.productionMongoURI
    : config.database.developmentMongoURI;

// Configure MongoDB and Mongoose
const connectDatabase = async (url) => {
  try {
    await mongoose
      .connect(url || MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB >> Connected!"));
  } catch (error) {
    console.log(`MongoDB ERROR >> ${error.message}`);

    // Exit current process with failure
    process.exit(1);
  }
};

// Export the util
module.exports = connectDatabase;
