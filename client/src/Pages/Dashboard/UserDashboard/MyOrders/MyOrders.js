import React from "react";
import NotFound from "../../../../Shared/DataNotFound";
import TableLoader from "../../../../Shared/Loader/TableLoader";
import { useGetSingleUserQuery } from "../../../../store/services/userServices";
import MyOrderTable from "./MyOrderTable";
const MyOrders = () => {
  const { data, isLoading, isSuccess } = useGetSingleUserQuery();
  // const pendingOrder = data?.user?.order?.map(
  //   (item) => item.orderStatus === "Pending"
  // );
  // const processingOrder = data?.user?.order?.filter(
  //   (item) => item.orderStatus === "Processing"
  // );
  // const completeOrder = data?.user?.order?.filter(
  //   (item) => item.orderStatus === "Delivered"
  // );
  // const cencleOrder = data?.user?.order?.filter(
  //   (item) => item.orderStatus === "Cancel"
  // );
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-4">My Orders</h2>
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
                data?.user?.order?.map((item) => (
                  <MyOrderTable key={item._id} order={item} />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MyOrders;
