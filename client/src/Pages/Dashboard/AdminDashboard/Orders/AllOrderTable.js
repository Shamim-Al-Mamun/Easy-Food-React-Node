import React from "react";
import { toast } from "react-toastify";
import { useUpdateOrderStatusMutation } from "../../../../store/services/userServices";
const AllOrderTable = ({ order }) => {
  const [sendUpdateStatus] = useUpdateOrderStatusMutation();
  const handleChange = (e) => {
    sendUpdateStatus({
      selectStatus: e.target.value,
      _id: order._id,
    }).then((res) => {
      if (res.data) {
        toast.success(res?.data?.msg, {
          theme: "colored",
          closeOnClick: true,
          hideProgressBar: false,
        });
      }
    });
  };
  return (
    <>
      <tr className="bg-white border-b">
        <td
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {order.personalDetails.email}
        </td>
        <td
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {new Date(order.createdAt).toLocaleDateString()}
        </td>
        <td className="px-6 py-4">
          {order.shippingCostAndMethod.shippingMethod === "Cash on Delivery"
            ? "COD" : order.shippingCostAndMethod.shippingMethod === "SSL Commerze" ?
              "SSL" : "Card"}
        </td>
        <td className="px-6 py-4">${order.paymentDetails.totalCost}</td>
        <td
          className={`${order?.orderStatus === "Pending"
              ? "text-yellow-500"
              : order?.orderStatus === "Processing"
                ? "text-blue-500"
                : order?.orderStatus === "Delivered"
                  ? "text-green-500"
                  : order?.orderStatus === "Cencel"
                    ? "text-red-500"
                    : null
            } px-6 py-4`}
        >
          {order?.orderStatus}
        </td>
        <td className="px-6 py-4">
          <select
            name="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary focus:border-primary block lg:w-full w-[150px] p-2.5 outline-none"
            onChange={handleChange}
          >
            <option selected={order.orderStatus === "Pending"} value="Pending">
              Pending
            </option>
            <option
              selected={order.orderStatus === "Delivered"}
              value="Delivered"
            >
              Delivered
            </option>
            <option
              selected={order.orderStatus === "Processing"}
              value="Processing"
            >
              Processing
            </option>
            <option selected={order.orderStatus === "Cencel"} value="Cencel">
              Cencel
            </option>
          </select>
        </td>
      </tr>
    </>
  );
};

export default AllOrderTable;
