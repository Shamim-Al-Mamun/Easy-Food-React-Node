import React from "react";
import ScreenHeader from "../../Shared/ScreenHeader";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import NavBar from "../../Shared/NavBar";
import Footer from "../../Shared/Footer";
import {
  useAddWishlistMutation,
  useGetSingleUserQuery,
} from "../../store/services/userServices";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/reducers/cartSlice";
import { toast } from "react-toastify";
import NotFound from "../../Shared/DataNotFound";
import CategoryLoader from "../../Shared/Loader/CategoryLoader";
const Wishlist = () => {
  const { data, isLoading, isSuccess } = useGetSingleUserQuery();
  const [addProductWishlist, result] = useAddWishlistMutation();
  const dispatch = useDispatch();
  const handleWishlist = (productId) => {
    addProductWishlist({ productId }).then((res) => {
      toast.success(res?.data?.msg, {
        theme: "colored",
        closeOnClick: true,
        hideProgressBar: false,
      });
    });
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    addProductWishlist({ productId:product._id });
    toast.success("Product added your cart and remove from wishlist", {
      theme: "colored",
      closeOnClick: true,
      hideProgressBar: false,
    });
  };
  return (
    <>
      <NavBar />
      <ScreenHeader>
        <div>
          <h1 className="font-JosefinSans font-bold text-5xl text-center">
            Wishlist
          </h1>
          <Link to="/" className="text-gray-400 hover:text-primary">
            Home
          </Link>
          <span className="text-gray-400 space-x-3"> {">"} </span>
          <span>Wishlist</span>
        </div>
      </ScreenHeader>
      <div className="container section-padding">
        <table className="w-full">
          <tbody>
            {/* 1 */}
            {isLoading
              ? <CategoryLoader />
              : !data?.user?.wishlist.length
              ? <NotFound>
                You are not wishlist any product
              </NotFound>
              : data?.user?.wishlist?.map((product) => (
                  <tr className="w-full" key={product._id}>
                    <td className="border border-gray-400 w-1/6">
                      <img
                        className="w-36 mx-auto"
                        src={product?.images[0]}
                        alt="food one"
                      />
                    </td>
                    <td className="border border-gray-400 w-3/6 pl-5">
                      <div className="flex flex-col items-start justify-center">
                        <h3 className="text-primary font-bold hover:text-primary_hover">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 font-bold">
                          ${product.price}
                        </p>
                      </div>
                    </td>
                    <td className="border border-gray-400 w-2/6">
                      <div className="flex items-center justify-center">
                        <span
                          className="text-3xl cursor-pointer font-bold text-primary hover:text-primary_hover"
                          onClick={() => handleAddToCart(product)}
                        >
                          <AiOutlineShoppingCart />
                        </span>
                        <span
                          className="text-3xl cursor-pointer font-bold text-red-500 hover;text-red-600"
                          onClick={() => handleWishlist(product._id)}
                        >
                          <MdDelete />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
