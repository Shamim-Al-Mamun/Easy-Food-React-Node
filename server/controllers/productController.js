const { validationResult } = require("express-validator");
const errorFormater = require("../utils/errorFormater");
const Product = require("../models/Product");
const Review = require("../models/Review");
const { STRIPE_SECRET } = require("../config/envConfig");
const Order = require("../models/Order");
const User = require("../models/User");
const stripe = require("stripe")(STRIPE_SECRET);
const SSLCommerzPayment = require("sslcommerz");
const store_id = "foodu630a1f4b5f276";
const store_passwd = "foodu630a1f4b5f276@ssl";

// create product
const createProductController = async (req, res) => {
  try {
    const {
      name,
      title,
      price,
      description,
      category,
      productImages,
      shortDescription,
    } = req.body;
    const errors = validationResult(req).formatWith(errorFormater);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
    }
    const product = Product({
      name,
      title,
      price,
      description,
      shortDescription,
      category,
      images: productImages,
    });
    const createProduct = await product.save();
    res
      .status(200)
      .json({ msg: "Product Created Successfull", product: createProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// update product
const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(req.body);
    const errors = validationResult(req).formatWith(errorFormater);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
    }
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "Product updated", updateProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

// delete product
const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleteProduct = await Product.findByIdAndDelete({ _id: productId });
    res.status(200).json({ msg: "Product deleted", deleteProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

// get all product
const getAllProductController = async (req, res) => {
  console.log("all product");
  try {
    const allProducts = await Product.find({});
    // .populate({
    //   path: "review",
    //   populate: {
    //     path: "user",
    //   },
    // });
    return res.status(200).json({ msg: "All product", allProducts });
  } catch (error) {
    return res.status(500).json("Internal Server Errorr");
  }
};

// get single product
const getSingleProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const getProduct = await Product.findOne({ _id: productId });
    // .populate({
    //   path: "review",
    //   populate: {
    //     path: "user",
    //   },
    // });
    return res.status(200).json({ msg: "Single product found", getProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

//  add product review
const addProductReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const { fullname, email, reviewText, ratingStar } = req.body;
    const review = Review({
      user: userId,
      fullname,
      email,
      reviewText,
      ratingStar,
    });
    const addReview = await review.save();
    await Product.findOneAndUpdate(
      { _id: productId },
      {
        $push: {
          review: addReview._id,
        },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ msg: "Thanks for your review", review: addReview });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// order controller
const orderController = async (req, res) => {
  try {
    const { totalCost } = req.body;
    const amount = Number(totalCost) * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// ssl order controller
const orderBySSLCommerz = async (req, res) => {
  try {
    const { checkOutInfo } = req.body;
    const data = {
      total_amount: checkOutInfo.totalCost,
      currency: "BDT",
      tran_id: Math.floor(new Date().getTime() * Math.random() * 10000), // use unique tran_id for each api call
      success_url: "https://food-you.herokuapp.com/api/v1/product/success",
      fail_url: "https://food-you.herokuapp.com/api/v1/product/fail",
      cancel_url: "https://food-you.herokuapp.com/api/v1/product/cancel",
      ipn_url: "https://food-you.herokuapp.com/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: checkOutInfo.fullname,
      cus_email: checkOutInfo.email,
      cus_add1: checkOutInfo.address,
      cus_add2: "Dhaka",
      cus_city: checkOutInfo.city,
      cus_state: "Dhaka",
      cus_postcode: checkOutInfo.zip,
      cus_country: checkOutInfo.country,
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    const sslcommer = new SSLCommerzPayment(store_id, store_passwd, false); //true for live default false for sandbox
    sslcommer.init(data).then((data) => {
      if (data.GatewayPageURL) {
        res.json(data.GatewayPageURL);
      } else {
        res.status(400).json("Payment Session failed");
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// ssl success route
const redirectSuccessRoute = async (req, res) => {
  return res.status(200).redirect(`https://food-u.netlify.app/confirmOrder`);
};

// ssl fail route
const redirectFailRoute = async (req, res) => {
  return res.status(200).redirect(`https://food-u.netlify.app`);
};

// ssl cancle route
const redirectCancelRoute = async (req, res) => {
  return res.status(200).redirect(`https://food-u.netlify.app`);
};

// save order info controller
const saveCheckOutInfo = async (req, res) => {
  try {
    const {
      fullname,
      email,
      address,
      city,
      country,
      zip,
      selectedPaymentMethod,
      shippingCost,
      totalCost,
    } = req.body.checkOutInfo;
    const { last4, transaction } = req.body;
    const userId = req.userId;
    const orderInfo = await Order({
      personalDetails: {
        fullname,
        email,
      },
      shippingDetails: {
        address,
        city,
        country,
        zip,
      },
      shippingCostAndMethod: {
        shippingMethod: selectedPaymentMethod,
        shippingCost,
      },
      paymentDetails: {
        totalCost,
        transaction,
        last4,
      },
    });
    const saveOrder = await orderInfo.save();
    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          order: saveOrder._id,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ msg: "Success", saveOrder, updateUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// get all order controller
const getAllOrders = async (req, res) => {
  try {
    const allOrder = await Order.find({});
    return res.status(200).json({ msg: "All Order", allOrder });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

// update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { selectStatus } = req.body;
    const { id } = req.params;
    const updateStatus = await Order.findByIdAndUpdate(
      { _id: id },
      { orderStatus: selectStatus },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ msg: `Order ${updateStatus.orderStatus}`, updateStatus });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

// all review controller
const getAllReview = async (req, res) => {
  try {
    const allReview = await Review.find({}).populate("user");
    return res.status(200).json({ msg: "All Review", allReview });
  } catch (error) {
    console.log(error);
    return res.json(500).json("Internal Server Error");
  }
};
module.exports = {
  getSingleProductController,
  getAllProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  getAllOrders,
  saveCheckOutInfo,
  addProductReview,
  orderController,
  orderBySSLCommerz,
  getAllReview,
  updateOrderStatus,
  redirectSuccessRoute,
  redirectFailRoute,
  redirectCancelRoute,
};
