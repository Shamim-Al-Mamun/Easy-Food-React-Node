import React from "react";
import { FaShoppingCart, FaUsers, FaHeart } from "react-icons/fa";
import {
  MdOutlineProductionQuantityLimits,
  MdOutlineReviews,
} from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import SingleProduct from "./Products/SingleProduct";
import AllUserTable from "./Users/AllUserTable";
import AllOrderTable from "./Orders/AllOrderTable";
import { useAllUsersQuery } from "../../../store/services/authServices";
import {
  useAllCategoryQuery,
  useAllProductQuery,
  useAllReviewQuery,
} from "../../../store/services/productServices";
import TableLoader from "../../../Shared/Loader/TableLoader";
import ProductLoader from "../../../Shared/Loader/ProductLoader";
import { useAllOrderQuery } from "../../../store/services/userServices";
import NotFound from "../../../Shared/DataNotFound";
const Index = () => {
  const { data: userData } = useAllUsersQuery();
  const { data: categories } = useAllCategoryQuery();
  const { data: allProducts, isLoading } = useAllProductQuery();
  const { data: allOrders } = useAllOrderQuery();
  const { data: allReviews } = useAllReviewQuery();
  const { data } = useAllUsersQuery();
  const sidebarMenu = [
    {
      icon: <FaShoppingCart />,
      title: "Total Orders",
      numbers: allOrders?.allOrder?.length || 0,
      bgColor: "bg-[#3ae374]/40",
      textColor: "text-[#3ae374]",
    },
    {
      icon: <FaUsers />,
      title: "Total User",
      numbers: userData?.allUser.length || 0,
      bgColor: "bg-[#7d5fff]/40",
      textColor: "text-[#7d5fff]",
    },
    {
      icon: <FaHeart />,
      title: "Total Wishlist",
      numbers: userData?.totalWishlist || 0,
      bgColor: "bg-[#ff9f1a]/40",
      textColor: "text-[#ff9f1a]",
    },
    {
      icon: <MdOutlineProductionQuantityLimits />,
      title: "Total Product",
      numbers: allProducts?.allProducts.length || 0,
      bgColor: "bg-[#FC427B]/40",
      textColor: "text-[#FC427B]",
    },
    {
      icon: <BiCategoryAlt />,
      title: "Total Category",
      numbers: categories?.allCategory?.length || 0,
      bgColor: "bg-[#2bcbba]/40",
      textColor: "text-[#2bcbba]",
    },
    {
      icon: <MdOutlineReviews />,
      title: "Total Review",
      numbers: allReviews?.allReview?.length || 0,
      bgColor: "bg-[#A3CB38]/40",
      textColor: "text-[#A3CB38]",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mt-4">
        {sidebarMenu.map((item, index) => (
          <div
            className="p-4 flex items-center bg-white border border-border rounded-md shadow-md"
            key={index}
          >
            <div
              className={`p-3 rounded-full ${item.bgColor} ${item.textColor}  mr-4 text-2xl`}
            >
              {item.icon}
            </div>
            <div>
              <p className="text-xl font-medium  text-gray-600 ">
                {item.title}
              </p>
              <p className="text-xl font-semibold text-gray-700">
                {item.numbers}
              </p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold mb-4">Dashboard Summary</h2>
      {isLoading ? (
        <ProductLoader />
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Some Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allProducts?.allProducts
              ?.slice(0, 4)
              .map((product) => <SingleProduct product={product} />)
              .reverse()}
          </div>
        </>
      )}
      {isLoading ? (
        <TableLoader />
      ) : !data?.allUser?.length ? (
        <NotFound />
      ) : (
        <>
          <h2 className="text-xl font-bold my-4">Some Users</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-16">
            <table className="w-full text-left text-gray-500 whitespace-nowrap">
              <thead className="text-[16px] text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Update Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Profile
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-[16px]">
                {data?.allUser
                  .slice(0, 5)
                  .map((user) => <AllUserTable key={user._id} user={user} />)
                  .reverse()}
              </tbody>
            </table>
          </div>
        </>
      )}
      {isLoading ? (
        <TableLoader />
      ) : !allOrders?.allOrder?.length ? (
        <NotFound />
      ) : (
        <>
          <h2 className="text-xl font-bold my-4">Some Orders</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-gray-500 whitespace-nowrap">
              <thead className="text-[16px] text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Method
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-[16px]">
                {allOrders?.allOrder
                  ?.slice(0, 6)
                  .map((item) => <AllOrderTable order={item} />)
                  .reverse()}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
