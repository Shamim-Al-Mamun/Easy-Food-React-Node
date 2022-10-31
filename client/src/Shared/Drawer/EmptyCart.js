import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div className="text-3xl text-primary w-16 h-16 mx-auto bg-yellow-300/30 rounded-full flex items-center justify-center">
          <FaShoppingCart />
        </div>
        <h2 className="text-xl font-bold my-3">Your cart is empty</h2>
        <p className="text-lg">
          No items added in your cart. Please add product to your cart list.
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;
