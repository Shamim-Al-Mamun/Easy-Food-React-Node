import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import DrawerCart from "../../../Shared/Drawer/DrawerCart";
import EmptyCart from "../../../Shared/Drawer/EmptyCart";
import {toast} from "react-toastify";
const OrderSummary = ({ shippingCost }) => {
  const { cart } = useSelector((state) => state);
  const [coupon, setCoupon] = useState("");
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [discount, setDiscount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (coupon === "Al Amin" && !applyCoupon) {
    //   cart.totalAmount = cart.totalAmount - 10;
    //   setApplyCoupon(true);
    //   alert("Coupon code apply successfull");
    // } else if (coupon !== "Al Amin") {
    //   alert("Invalid Coupon code");
    // } else {
    //   alert("Coupon Already Applied");
    // }
    // e.target.reset();

    toast.warning("Coupon code is not available", {
      theme: "colored",
      closeOnClick: true,
      hideProgressBar: false,
    });
    e.target.reset();
  };
  return (
    <>
      <div className="bg-light-gray p-5 border-2 border-gray-200 rounded-lg">
        <h3 className="text-2xl font-bold text-left">Order Summary</h3>
        <div className="w-full h-[220px] overflow-y-auto hide-scrollbar">
          {/* <DrawperCart /> */}
          {cart.cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            cart.cartItems.map((product) => {
              return <DrawerCart key={product._id} product={product} />;
            })
          )}
        </div>
        {/* coupon */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between gap-3"
        >
          <input
            className="px-4 py-2 w-full focus:outline-none border-2 border-transparent focus:border-primary rounded-md bg-white"
            type="text"
            placeholder="Apply Coupon Code"
            required
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button type="submit" className="btn-primary py-2">
            Apply
          </button>
        </form>
        <div className="py-5 border-b-2 border-border">
          <div className="flex items-center justify-between text-lg">
            <h5>Subtotal</h5>
            <span> ${cart.totalAmount + Number(shippingCost)}</span>
          </div>
          <div className="flex items-center justify-between text-lg">
            <h5>Shipping Cost</h5>
            <span> $0.00</span>
          </div>
          <div className="flex items-center justify-between text-lg">
            <h5>Discount</h5>
            <span className="text-primary"> ${discount}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-lg uppercase font-bold mt-4">
          <h5>Total Cost</h5>
          <span> ${cart.totalAmount + Number(shippingCost)}</span>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
