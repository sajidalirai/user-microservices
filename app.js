const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });
const userRoutes = require("./routes/userRoutes");
//DATABASE CONNECTION
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

//Routes
app.use("/api/users", userRoutes);

module.exports = app;
