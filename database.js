const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/hackerNewsUser")
    .then(() => {
      console.log("Db connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
