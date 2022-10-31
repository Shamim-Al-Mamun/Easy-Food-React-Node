import { GiScooter } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ImCreditCard } from "react-icons/im";
import { MdPayments } from "react-icons/md";

const personalInfo = [
  {
    label: "Full Name",
    type: "text",
    name: "fullname",
    placeholder: "Full Name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Email",
  },
];

const shippingInfo = [
  {
    label: "Street address",
    placeholder: "123 Dhaka road",
    name: "address",
    type: "text",
  },
  {
    label: "City",
    placeholder: "City",
    name: "city",
    type: "text",
  },
  {
    label: "Country",
    placeholder: "Country",
    name: "country",
    type: "text",
  },
  {
    label: "ZIP/Postal",
    placeholder: "3500",
    name: "zip",
    type: "text",
  },
];

const shippinCost = [
  {
    icon: <GiScooter />,
    name: "cost",
    title: "FedEx",
    type: "radio",
    text: `Delivary: today cost: $ ${50.0}`,
    cost:50,
  },
  {
    icon: <GiScooter />,
    name: "cost",
    title: "UPS",
    type: "radio",
    text: `Delivary: 7 day cost: $ ${20.0}`,
    cost:20,
  },
];

const paymentInfo = [
  {
    icon: <BsCashCoin />,
    name: "payment_method",
    type: "radio",
    card: false,
    text: `Cash on Delivery`,
  },
  {
    icon: <ImCreditCard />,
    card: true,
    name: "payment_method",
    type: "radio",
    text: `Credit Card`,
  },
  {
    icon: <FaMoneyBillAlt />,
    card: true,
    name: "payment_method",
    type: "radio",
    text: `Bkash`,
  },
  {
    icon: <MdPayments />,
    card: true,
    name: "payment_method",
    type: "radio",
    text: `SSL Commerze`,
  },
];

export { personalInfo, shippingInfo, shippinCost, paymentInfo };
