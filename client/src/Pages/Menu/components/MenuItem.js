import React from "react";
import { Link } from "react-router-dom";
import { BsMinecart } from "react-icons/bs";
import { toast } from "react-toastify";
import { addToCart } from "../../../store/reducers/cartSlice";
import { useDispatch } from "react-redux";
const MenuItem = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added your cart", {
      theme: "colored",
      closeOnClick: true,
      hideProgressBar: false,
    });
  };
  return (
    <>
      <div className="recipe border-2 border-gray-200 rounded-3xl p-2">
        <div className="bg-light-gray flex flex-col md:flex-row items-center justify-between rounded-3xl gap-2 p-4">
          <div className="md:basis-1/3 basis-full">
            <img className="w-full" src={product.images[0]} alt="food" />
          </div>
          <div className="content md:basis-2/3 basis-full text-left mt-5 relative">
            <Link
              to={`../product/${product._id}`}
              className="text-2xl font-bold text-heading hover:text-primary cursor-pointer"
            >
              {product.title}
            </Link>
            <p className="text-gray-500 text-lg">{product.shortDescription.slice(0, 100)}...</p>
            <span className="text-primary text-lg font-bold">
              $ {product.price}
            </span>
            <span
              className="cart-icon absolute right-3 bottom-[0px]"
              onClick={() => handleAddToCart(product)}
            >
              <BsMinecart />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
