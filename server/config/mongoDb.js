const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
function dbConnect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Mongo Connected!"))
    .catch((err) => {
      console.log("MongoErro:", err.code);
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Database Connection Closed Gracefully");
    process.exit(0);
  } catch (err) {
    console.error("Error closing database connection:", err);
    process.exit(1);
  }
});

module.exports = dbConnect;
