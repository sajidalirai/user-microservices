const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  updatePartialUser,
} = require("../controller/userController");

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById)
  .patch(updatePartialUser);

module.exports = router;
