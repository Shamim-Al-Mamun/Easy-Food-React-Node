import React from "react";

const MyOrderTable = ({ order }) => {
  return (
    <>
      <tr className="bg-white border-b">
        <td
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {order?._id.slice(0, 11)}
        </td>
        <td className="px-6 py-4">
          {new Date(order.createdAt).toLocaleDateString()}
        </td>
        <td className="px-6 py-4">
          {order.shippingCostAndMethod.shippingMethod === "Cash on Delivery"
            ? "COD"
            : "Card"}
        </td>
        <td
          className={`${
            order.orderStatus === "Pending"
              ? "text-yellow-500"
              : order.orderStatus === "Processing"
              ? "text-blue-500"
              : order.orderStatus === "Delivered"
              ? "text-green-500"
              : order.orderStatus === "Cencel"
              ? "text-red-500"
              : null
          } px-6 py-4`}
        >
          {order.orderStatus}
        </td>
        <td className="px-6 py-4">${order.paymentDetails.totalCost}</td>
      </tr>
    </>
  );
};

export default MyOrderTable;
