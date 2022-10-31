import React from "react";
import { Link } from "react-router-dom";
import { BsMinecart } from "react-icons/bs";
import { useAllProductQuery } from "../../../store/services/productServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/reducers/cartSlice";
import TopRecipeLoader from "../../../Shared/Loader/TopRecipeLoader";
const TopRecipe = () => {
  const { data, isLoading, isSuccess } = useAllProductQuery();
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added your cart", {
      theme: "colored",
      closeOnClick: true,
      hideProgressBar: false,
    });
  };
  return (
    <div className="section-padding font-JosefinSans">
      <div className="container grid grid-cols-3 gap-5">
        <div className="col-span-3 lg:col-span-2">
          {/* header */}
          <div className="flex items-center justify-between mb-12 md:px-0">
            <h2 className="text-4xl md:text-5xl font-bold text-heading">
              Top recipes
            </h2>
            <Link to="/shop" className="flex items-center justify-center">
              <span className="hover:text-primary mr-2">see All</span>
              <span className="bg-secondary w-6 h-6 rounded-lg flex items-center justify-center text-white text-sm ">
                {">"}
              </span>
            </Link>
          </div>
          {/* product items */}
          {isLoading ? (
            <TopRecipeLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:px-0">
              {data?.allProducts?.slice(0, 6).map((product) => (
                <>
                  <div
                    className="recipe border-2 border-gray-200 rounded-3xl p-2"
                    key={product._id}
                  >
                    <div className="bg-light-gray flex products-center justify-between rounded-3xl gap-2">
                      <div className="basis-1/3">
                        <img
                          className="w-full"
                          src={require("../../../assets/images/food_2.png")}
                          alt="food"
                        />
                      </div>
                      <div className="content basis-2/3 text-left mt-5 relative">
                        <Link
                          to={`product/${product._id}`}
                          className="text-lg font-bold text-heading hover:text-primary cursor-pointer"
                        >
                          {product?.title}
                        </Link>
                        <h3>{product?.category}</h3>
                        <span className="text-primary text-lg font-bold">
                          $ {product?.price}
                        </span>
                        <span
                          className="cart-icon absolute right-3 bottom-3"
                          onClick={() => handleAddToCart(product)}
                        >
                          <BsMinecart />
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
        {/* banner part */}
        <div className="hidden md:col-span-1 lg:block">
          <div className="relative text-center">
            <img
              className="rounded-lg w-full"
              src={require("../../../assets/images/top_recipe_banner.jpg")}
              alt="recipe banner"
            />
            <div className="banner-content absolute top-10 left-0 right-0">
              <h2 className="font-Norican font-bold text-3xl mb-2 text-white">
                Super Delicious
              </h2>
              <h1 className="text-3xl md:text-4xl lg:text-6xl text-red-500 font-bold my-3">CHICKEN</h1>
              <p className="text-xl font-bold text-white">CALL US NOW:</p>
              <p className="text-3xl font-bold text-red-500">1-800-555-333</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRecipe;
