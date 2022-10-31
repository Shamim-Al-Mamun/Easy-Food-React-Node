import React from "react";
import { BsSuitHeartFill, BsMinecart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddWishlistMutation,
  useGetSingleUserQuery,
} from "../store/services/userServices";
import { addToCart } from "../store/reducers/cartSlice";
import { useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { AiFillStar } from "react-icons/ai";
const Product = ({ gridView, product }) => {
  let url = window.location.href;
  const filename = url.split("/").pop().split("#")[0].split("?")[0];
  const [addProductWishlist] = useAddWishlistMutation();
  const { data } = useGetSingleUserQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleWishlist = (productId) => {
    addProductWishlist({ productId }).then((res) => {
      toast.success(res?.data?.msg, {
        theme: "colored",
        closeOnClick: true,
        hideProgressBar: false,
      });
    });
  };
  const handleNavigate = (id) => {
    if (filename === "shop") {
      navigate(`../product/${id}`);
    } else if (filename !== "shop") {
      navigate(`../../product/${id}`);
    } else {
      navigate(`product/${id}`);
    }
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added your cart", {
      theme: "colored",
      closeOnClick: true,
      hideProgressBar: false,
    });
  };
  // let average = product?.review?.reduce(
  //   (sum, currentValue, _, array) =>
  //     sum + currentValue.ratingStar / array.length,
  //   0
  // );
  return (
    <>
      <div
        className={
          gridView
            ? "product border-2 border-gray-200 rounded-2xl p-2 relative group font-JosefinSans"
            : "product border-2 border-gray-200 rounded-2xl p-2 relative group font-JosefinSans flex items-end justify-start"
        }
      >
        {/* image */}
        <div
          className="product-image basis-2/6 overflow-hidden"
          onClick={() => handleNavigate(product?._id)}
        >
          <img
            className="group-hover:scale-110 transition-all ease-linear duration-200 w-full h-[300px] object-contain"
            src={product?.images[0]}
            alt="food"
          />
        </div>
        {/* heart icon */}
        <span
          className="absolute top-4 right-4 text-gray-300 text-2xl cursor-pointer hover:text-black z-20"
          onClick={() => handleWishlist(product?._id)}
        >
          <BsSuitHeartFill />
        </span>
        {data?.user?.wishlist.includes(product?._id) ? (
          <span className="absolute top-4 right-4 text-red-600 text-2xl cursor-pointer hover:text-black z-20">
            <BsSuitHeartFill />
          </span>
        ) : (
          <span
            className="absolute top-4 right-4 text-gray-300 text-2xl cursor-pointer hover:text-black z-20"
            onClick={() => handleWishlist(product?._id)}
          >
            <BsSuitHeartFill />
          </span>
        )}
        <span
          className="absolute top-4 right-4 text-gray-300 text-2xl cursor-pointer hover:text-black z-20"
          onClick={() => handleWishlist(product?._id)}
        >
          <BsSuitHeartFill />
        </span>

        {/* product content */}
        <div className="content relative text-left p-4 pt-5 mb-12">
          {/* {average && (
            <ReactStars
              count={5}
              value={average}
              edit={false}
              size={24}
              isHalf={true}
              fullIcon={<AiFillStar />}
              activeColor="#ffd700"
            />
          )} */}

          <h3
            onClick={() => handleNavigate(product?._id)}
            className="text-2xl font-bold text-heading hover:text-primary_hover cursor-pointer"
          >
            {product?.title}
          </h3>
          <p className="text-lg text-gray-500 ">
            {product?.shortDescription.slice(0, 70)}...
          </p>
        </div>
        <div className="flex items-center justify-between mt-3 absolute bottom-0 left-0 right-0 p-4">
          <h3
            className={`text-2xl text-primary font-bold ${
              !gridView ? "md:ml-[315px] ml-[105px]" : ""
            }`}
          >
            ${product?.price}
          </h3>
          <div className="cart-icon" onClick={() => handleAddToCart(product)}>
            <BsMinecart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
