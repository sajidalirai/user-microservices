const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const globalErrorHnadler = require("./controller/errorController");
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

//Routes
app.use("/api/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHnadler);

module.exports = app;
