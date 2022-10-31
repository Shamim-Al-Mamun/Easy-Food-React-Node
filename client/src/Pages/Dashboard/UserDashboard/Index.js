import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FcProcess } from "react-icons/fc";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { GiScooter } from "react-icons/gi";
import NotFound from "../../../Shared/DataNotFound";
import TableLoader from "../../../Shared/Loader/TableLoader";
import { useGetSingleUserQuery } from "../../../store/services/userServices";
import MyOrderTable from "./MyOrders/MyOrderTable";
const Index = () => {
  const { data, isLoading, isSuccess } = useGetSingleUserQuery();
  const pendingOrder = data?.user?.order?.filter(
    (item) => item.orderStatus === "Pending"
  );
  const processingOrder = data?.user?.order?.filter(
    (item) => item.orderStatus === "Processing"
  );
  const completeOrder = data?.user?.order?.filter(
    (item) => item.orderStatus === "Delivered"
  );
  const cencleOrder = data?.user?.order?.filter(
    (item) => item.orderStatus === "Cancel"
  );
  console.log(processingOrder);
  const userOrders = [
    {
      icon: <FaShoppingCart />,
      title: "Total Orders",
      numbers: data?.user?.order?.length || 0,
      bgColor:"bg-yellow-200",
      textColor:"text-yellow-600"
    },
    {
      icon: <FcProcess />,
      title: "Pending Orders",
      numbers: pendingOrder?.length || 0,
      bgColor:"bg-orange-200",
      textColor:"text-orange-700"
    },
    {
      icon: <GiScooter />,
      title: "Processing Orders",
      numbers: processingOrder?.length || 0,
      bgColor:"bg-blue-200",
      textColor:"text-blue-700"
    },
    {
      icon: <GiCancel />,
      title: "Cancel Orders",
      numbers: cencleOrder?.length || 0,
      bgColor:"bg-red-200",
      textColor:"text-red-700"
      
    },
    {
      icon: <GiConfirmed />,
      title: "Complete Orders",
      numbers: completeOrder?.length || 0,
      bgColor:"bg-green-200",
      textColor:"text-green-700"
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 mt-4">
        {userOrders.map((item, index) => (
          <div
            className="p-4 flex items-center bg-white border border-border rounded-md shadow-md"
            key={index}
          >
            <div className={`p-3 rounded-full ${item.textColor} ${item.bgColor} mr-4 text-xl`}>
              {item.icon}
            </div>
            <div>
              <p className="text-lg font-medium  text-gray-600 whitespace-nowrap">
                {item.title}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {item.numbers}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* my orders */}
      <h2 className="text-2xl font-bold mb-3">Recent Orders</h2>
      {isLoading ? (
        <TableLoader />
      ) : !data?.user?.order.length ? (
        <NotFound />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-gray-500  table-auto whitespace-nowrap">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Order time
                </th>

                <th scope="col" className="px-6 py-3">
                  Method
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="text-[16px]">
              {data?.user?.order.length &&
                data?.user?.order
                  ?.slice(0, 10)
                  .map((item) => <MyOrderTable key={item._id} order={item} />)}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Index;
