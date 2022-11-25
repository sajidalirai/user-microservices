const User = require("./../model/userModel");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(409).json({
      status: "fail",
      message: error,
    });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findOneAndReplace(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

exports.updatePartialUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: `user with name: ${user.username} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
};
