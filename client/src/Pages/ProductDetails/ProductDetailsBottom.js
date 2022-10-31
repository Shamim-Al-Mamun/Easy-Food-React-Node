import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/reducers/cartSlice";
import { toast } from "react-toastify";
const ProductDetailsBottom = ({ data }) => {
  const [showProduct, setShowProduct] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowProduct(true);
      } else {
        setShowProduct(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);
  const handleAddToCart = () => {
    dispatch(addToCart(data.getProduct));
    toast.success("Product added your cart", {
      theme: "colored",
      closeOnClick: true,
      hideProgressBar: false,
    });
  };
  return (
    <>
      <div
        className={
          showProduct
            ? "bg-white shadow-lg shadow-gray-500/50 py-3 fixed bottom-0 w-full z-30 hidden lg:block transition-all ease-linear origin-bottom duration-400 -translate-y-0"
            : "transition-all ease-linear origin-bottom duration-300 translate-y-10"
        }
      >
        <div className="container flex items-center justify-between font-JosefinSans">
          <div className="flex items-center justify-between">
            <div className="border-2 border-border p-2 rounded-lg mr-3">
              <img
                className="w-16"
                src={data?.getProduct?.images[0]}
                alt="bottom image"
              />
            </div>
            <div>
              <p className="text-gray-500 text-xl mb-2">
                You're viewing:
                <span className="text-black font-bold ml-2">
                  {data?.getProduct?.title}
                </span>
              </p>
              <h3 className="text-3xl font-bold text-red-600">
                ${data?.getProduct?.price}
              </h3>
            </div>
          </div>
          <button
            className="btn-primary"
            onClick={() => handleAddToCart(data?.getProduct?._id)}
          >
            {" "}
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsBottom;
