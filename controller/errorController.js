const AppError = require("../utils/appError");

function duplicateFieldInsertionDB(err) {
  message = `Field ${Object.keys(err.keyValue)[0]} already exist with value: ${
    Object.values(err.keyValue)[0]
  } please use another value instead`;
  return new AppError(message, 400);
}
function ValidationErrorHandler(err) {
  let error = Object.values(err.errors).map((el) => el.message);
  return new AppError(`${error.join(". ")}`, 400);
}

module.exports = (err, req, res, next) => {
  console.log(err);
  let error = { ...err };
  if (err.code == 11000) {
    error = duplicateFieldInsertionDB(err);
  }
  if (err.name == "ValidationError") {
    error = ValidationErrorHandler(err);
  }
  err.statusCode = error.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: error.message,
  });
};
