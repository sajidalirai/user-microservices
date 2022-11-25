const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  permissionLevel: {
    type: String,
    required: [true, "permissionLevel is required"],
    enum: ["Admin", "User"],
  },
  firstName: {
    type: String,
    required: [true, "firstName is required"],
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    index: true,
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
  },
  password: {
    type: String,
  },
  birthDate: {
    type: String,
    required: [true, "birthDate is required"],
  },
  avatar: {
    type: String,
    required: [true, "avatar is required"],
  },
  addresses: [
    {
      address: {
        type: String,
        required: [true, "address is required"],
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      state: {
        type: String,
      },
      primary: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        default: "home",
      },
    },
  ],
  status: {
    type: String,
    required: [true, "status is required"],
    enum: ["active", "closed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

User.createIndexes();

module.exports = User;
