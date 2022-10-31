const { validationResult } = require("express-validator");
const errorFormater = require("../utils/errorFormater");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/envConfig");

// sign up
const signupController = async (req, res) => {
  const { fullname, email, password, profilePic } = req.body;
  try {
    const errors = validationResult(req).formatWith(errorFormater);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.mapped(),
        value: { fullname, email, password },
      });
    }
    const newUser = await User.create({
      fullname,
      email,
      profilePic,
      password: await bcrypt.hash(password, 10),
    });
    const token = jwt.sign(
      {
        id: newUser._id,
        fullname: newUser.fullname,
        password: newUser.password,
      },
      JWT_SECRET,
      { expiresIn: "7 d" }
    );
    return res
      .status(201)
      .json({ msg: "Your account successfully created", newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// login
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const errors = validationResult(req).formatWith(errorFormater);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.mapped(),
        value: { email, password },
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { id: user._id, fullname: user.fullname, password: user.password },
          JWT_SECRET,
          { expiresIn: "7 d" }
        );
        return res.status(200).json({ msg: "Login Successfull", token, user });
      } else {
        return res.status(400).json({ error: "Password does not matched" });
      }
    } else {
      return res.status(401).json({ error: "User not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// update Profile
const updateProfile = async (req, res) => {
  try {
    const { _id } = req.body;
    const updateProfileInfo = await User.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      msg: "Profile update successfull",
      updateUser: updateProfileInfo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// change password
const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      if (await bcrypt.compare(oldPassword, existUser.password)) {
        const updatePassword = await User.findOneAndUpdate(
          { email },
          {
            $set: {
              password: await bcrypt.hash(newPassword, 10),
            },
          },
          {
            new: true,
          }
        );
        return res
          .status(200)
          .json({ msg: "Password changed", updateUser: updatePassword });
      } else {
        return res.status(400).json({ error: "Old password does not matched" });
      }
    } else {
      return res.status(400).json({ error: "Email Not valid" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// get all user
const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({});
    // .populate("wishlist");
    const totalWishlist = allUser.reduce(
      (acc, curr) => acc + curr.wishlist.length,
      0
    );
    return res
      .status(200)
      .json({ allUser, totalUser: allUser.length, totalWishlist });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// update user role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updateRole = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          role,
        },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ msg: "Successfully user role updated", updateRole });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "Successfully User deleted", deleteUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// product wishlist
const productWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const user = await User.findOne({ _id: userId });
    let wishlist = null;
    let msg;
    if (user.wishlist.includes(productId)) {
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          $pull: {
            wishlist: productId,
          },
        },
        {
          new: true,
        }
      );
      wishlist = false;
      msg = "Product remove your wishlist";
    } else {
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            wishlist: productId,
          },
        },
        {
          new: true,
        }
      );
      wishlist = true;
      msg = "Product added your wishlist";
    }
    return res.status(200).json({ wishlist, msg });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// get single user
const singleUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId })
      .populate("wishlist")
      .populate("order");
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

module.exports = {
  signupController,
  loginController,
  updateProfile,
  changePassword,
  getAllUser,
  updateUserRole,
  deleteUser,
  productWishlist,
  singleUser,
};
