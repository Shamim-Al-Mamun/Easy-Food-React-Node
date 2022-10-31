import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  personalInfo,
  shippingInfo,
  shippinCost,
  paymentInfo,
} from "../userData";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { removeAllProduct } from "../../../store/reducers/cartSlice";
import {
  useCreateOrderBySSLMutation,
  useCreateOrderMutation,
  useSaveOrderInfoMutation,
} from "../../../store/services/userServices";
const CheckoutForm = ({ totalCost, shippingCost, setShippingCost }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state.auth);
  const [shippingDetails, setshippingDetails] = useState({});
  const [processing, setProcessing] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const [sendOrderInfo] = useSaveOrderInfoMutation();
  const [sendOrderBySSL] = useCreateOrderBySSLMutation();
  const [clientSecret, setClientSecret] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    createOrder({ totalCost }).then((res) =>
      setClientSecret(res.data?.clientSecret)
    );
  }, [totalCost, createOrder]);
  const handleCost = (e) => {
    setShippingCost(Number(e.target.value));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setshippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let checkOutInfo;
    if (selectedPaymentMethod === "Cash on Delivery") {
      setProcessing(true);
      checkOutInfo = {
        ...shippingDetails,
        selectedPaymentMethod,
        shippingCost,
        totalCost,
      };
      await sendOrderInfo({ checkOutInfo });
      toast.success("Your Order is successfull", {
        theme: "colored",
        closeOnClick: true,
        hideProgressBar: false,
      });
      setProcessing(false);
      dispatch(removeAllProduct());
      navigate("/confirmOrder", { replace: true });
    } else if (selectedPaymentMethod === "Credit Card") {
      checkOutInfo = {
        ...shippingDetails,
        selectedPaymentMethod,
        shippingCost,
        totalCost,
      };
      if (!stripe || !elements) {
        return;
      }
      const card = elements.getElement(CardElement);
      if (card === null) {
        return;
      }
      setProcessing(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });
      if (error) {
        toast.error(error.message, {
          theme: "colored",
          closeOnClick: true,
          hideProgressBar: false,
        });
        setProcessing(false);
      }
      const { paymentIntent, error: intentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user.fullname,
              email: user.email,
            },
          },
        });
      if (intentError) {
        toast.error(intentError.message, {
          theme: "colored",
          closeOnClick: true,
          hideProgressBar: false,
        });
        setProcessing(false);
      } else {
        sendOrderInfo({
          checkOutInfo,
          transaction: paymentIntent.client_secret,
          last4: paymentMethod.card.last4,
        });

        toast.success("Your Order is successfull", {
          theme: "colored",
          closeOnClick: true,
          hideProgressBar: false,
        });
        setProcessing(false);
        dispatch(removeAllProduct());
        navigate("/confirmOrder");
      }
    } else if (selectedPaymentMethod === "SSL Commerze") {
      checkOutInfo = {
        ...shippingDetails,
        selectedPaymentMethod,
        shippingCost,
        totalCost,
      };
      sendOrderInfo({
        checkOutInfo,
      }).then((res) => console.log(res));
      dispatch(removeAllProduct());
      await sendOrderBySSL({ checkOutInfo }).then((res) => {
        console.log(res);
        window.location.replace(res.data);
      });
    }
  };
  return (
    <>
      <form className="col-span-3 lg:col-span-2" onSubmit={handleSubmit}>
        {/* personal info */}
        <h2 className="text-xl text-black mb-3">01. Personal Details</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
          {personalInfo.map((item, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={item.label} className="text-gray-600">
                {item.label}
              </label>
              <br />
              <input
                onChange={handleChange}
                className="px-4 py-2 w-full focus:outline-none border-2 border-transparent focus:border-primary rounded-md bg-light-gray"
                type={item.type}
                placeholder={item.placeholder}
                name={item.name}
                required
              />
            </div>
          ))}
        </div>
        {/* shipping info */}
        <h2 className="text-xl text-black mb-3">02. Shipping Details</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
          {shippingInfo.map((item, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={item.label} className="text-gray-600">
                {item.label}
              </label>
              <br />
              <input
                className="px-4 py-2 w-full focus:outline-none border-2 border-transparent focus:border-primary rounded-md bg-light-gray"
                type={item.type}
                placeholder={item.placeholder}
                name={item.name}
                required
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        {/* shipping cost */}
        <h2 className="text-xl text-black mb-3">03. Shipping Cost</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
          {shippinCost.map((item, index) => (
            <label
              htmlFor={item.id}
              id={item.id}
              key={index}
              className="mb-3 border-2 border-gray-200 bg-light-gray rounded-md p-3 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center ">
                <span className="text-5xl color-gray-300 mr-3">
                  {item.icon}
                </span>
                <div>
                  <label htmlFor={item.name} className="text-gray-600 ">
                    {item.title}
                  </label>
                  <p>{item.text}</p>
                </div>
              </div>
              <br />
              <input
                onChange={handleCost}
                className="bg-light-gray w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                name={item.name}
                type={item.type}
                placeholder={item.placeholder}
                value={item.cost}
                id={item.id}
                required
              />
            </label>
          ))}
        </div>
        {/* payment method */}
        <h2 className="text-xl text-black mb-3">04. Payment Details</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
          {selectedPaymentMethod === "Credit Card" ? (
            <CardElement
              className="col-span-2 border border-border mb-2 py-3 rounded-md px-3 bg-light-gray focus:border-primary"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          ) : null}
          {paymentInfo.map((item, index) => (
            <div className="col-span-2 lg:col-span-1">
              {/* select method */}
              <label
                htmlFor={item.id}
                id={item.id}
                key={index}
                className="mb-3 border-2 border-gray-200 bg-light-gray rounded-md p-3 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <span className="text-4xl color-gray-300 mr-3">
                    {item.icon}
                  </span>
                  <div>
                    <label>{item.text}</label>
                  </div>
                </div>
                <input
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className=" bg-light-gray w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  name={item.name}
                  type={item.type}
                  value={item.text}
                  required
                  id={item.id}
                />
              </label>
            </div>
          ))}
        </div>
        {/* confirm order btn */}
        <div className="grid gric-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <Link
            to="/shop"
            className="bg-gray-200 text-black py-2 px-4 flex items-center justify-center rounded-md hover:bg-gray-300"
          >
            <span className="text-xl mr-2">
              <IoReturnUpBackOutline />
            </span>
            Continue Shopping
          </Link>
          {processing ? (
            <div class="flex items-center justify-center">
              <div class="w-[56px] h-[56px] border-l-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-primary text-black py-2 px-4 flex items-center justify-center rounded-md hover:bg-primary_hover hover:text-white"
              disabled={!stripe || cart.cartItems.length === 0}
            >
              Confirm Order
              <span className="text-xl ml-2">
                <BsArrowRight />
              </span>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
