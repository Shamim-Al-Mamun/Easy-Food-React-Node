import React, { useState } from "react";
import ScreenHeader from "../../Shared/ScreenHeader";
import { Link } from "react-router-dom";
import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";
import NavBar from "../../Shared/NavBar";
import Footer from "../../Shared/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Checkout = () => {
  const [shippingCost, setShippingCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const { cart } = useSelector((state) => state);
  const stripePromise = loadStripe(
    "pk_test_51L9MIQBwz8DPl6Qn18wc7SeeSnOnAWA2pAehWRILKoJjCt8jTBSXYSaYOSOoBpYcixZprI48dEnYbO0wsoaigm2500YLAuFsy4"
  );

  useEffect(() => {
    setTotalCost(cart.totalAmount + Number(shippingCost));
  }, [cart, shippingCost]);
  return (
    <Elements stripe={stripePromise}>
      <NavBar />
      <ScreenHeader>
        <div>
          <h1 className="font-JosefinSans font-bold text-5xl text-center">
            Checkout
          </h1>
          <Link to="/" className="text-gray-400 hover:text-primary">
            Home
          </Link>
          <span className="text-gray-400 space-x-3"> {">"} </span>
          <span>Checkout</span>
        </div>
      </ScreenHeader>
      <div className="bg-gray-50 font-JosefinSans">
        <div className="container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:px-0 gap-8">
            {/* shipping details */}
            <CheckoutForm
              totalCost={totalCost}
              shippingCost={shippingCost}
              setShippingCost={setShippingCost}
            />
            {/* cart details */}
            <div className="col-span-3 lg:col-span-1">
              <OrderSummary totalCost={totalCost} shippingCost={shippingCost} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Elements>
  );
};

export default Checkout;
