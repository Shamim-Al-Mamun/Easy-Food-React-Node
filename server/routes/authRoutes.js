const router = require("express").Router();
const {
  signupController,
  loginController,
  updateProfile,
  changePassword,
  getAllUser,
  updateUserRole,
  deleteUser,
  productWishlist,
  singleUser,
} = require("../controllers/authController");
const { signupValidation } = require("../validations/authValidation");
const authorized = require("../middlewares/authorized");

router.post("/signup", signupValidation, signupController);
router.post("/login", loginController);
router.get("/allUsers", getAllUser);
router.get("/wishlist/:productId", productWishlist);
router.get("/singleUser", singleUser);
router.put("/updateProfile", updateProfile);
router.put("/changePassword", changePassword);
router.put("/updateRole/:id", updateUserRole);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
