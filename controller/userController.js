const User = require("./../model/userModel");
const bcrypt = require("bcrypt");
const catchAsync = require("./../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  //encrypt the password
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;
  const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
  req.body.password = hash;

  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.updateUserById = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndReplace(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updatePartialUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: `user with name: ${user.username} deleted successfully`,
  });
});
