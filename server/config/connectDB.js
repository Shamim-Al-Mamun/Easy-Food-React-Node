const mongoose = require("mongoose");
const { DB_USER, DB_PASS } = require("../config/envConfig");

const connectDB = async () => {
  try {
    mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.90uvvsv.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDb is connected successfully");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
