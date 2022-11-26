const app = require("./app");

const port = 3000;
//Unhandled Exceptions
process.on("uncaughtException", (err) => {
  console.log("UNHANDLED REJECTION! 💔 shutting down");
  console.log(err.name + ": " + err.message);
  process.exit(1);
});

const server = app.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});

//Unhandled Rejections
process.on("unhandledRejection", (err) => {
  console.log(err.name + ": " + err.message);
  console.log("UNHANDLED REJECTION! 💔 shutting down");
  server.close(() => {
    process.exit(1);
  });
});

console.log(x);
