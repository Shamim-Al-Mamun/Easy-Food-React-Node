import React, { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BsSuitHeartFill } from "react-icons/bs";
import ProductDetailsTab from "./ProductDetailsTab/ProductDetailsTab";
import RelatedProduct from "./RelatedProduct";
import ProductDetailsBottom from "./ProductDetailsBottom";
import NavBar from "../../Shared/NavBar";
import Footer from "../../Shared/Footer";
import ReactStars from "react-rating-stars-component";
import { useSingleProductQuery } from "../../store/services/productServices";
import { toast } from "react-toastify";
import { useAddWishlistMutation } from "../../store/services/userServices";
import { addToCart } from "../../store/reducers/cartSlice";
import { useDispatch } from "react-redux";
import { FiMinus } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
const ProductDetails = () => {
  const [productCount, setProductCount] = useState(1);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data } = useSingleProductQuery({
    productId,
  });
  const [addProductWishlist] = useAddWishlistMutation();
  const handleWishlist = () => {
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
    toast.success("Product added your cart", {
      theme: "colored",
      closeOnClick: true,
      hideProgressBar: false,
    });
  };
  let average = data?.getProduct?.review.reduce(
    (sum, curr, _, array) => sum + curr.ratingStar / array.length,
    0
  );
  console.log("single");
  return (
    <div>
      <NavBar />
      <Breadcrumb data={data} />
      <div className="container scroll-smooth">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 section-padding font-JosefinSans lg:px-0">
          <div>
            {/* big image  */}
            <div className="border-2 border-gray-200 rounded-2xl p-2 h-[500px]">
              <div className="bg-light-gray h-full overflow-hidden">
                <img
                  className="h-full hover:scale-125 transition-all ease-linear duration-300 w-full object-contain object-center"
                  src={data?.getProduct?.images[0]}
                  alt="single food"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              {data?.getProduct?.title}
            </h2>
            <div className="flex items-center justify-start gap-1 text-lg mb-4">
              {average && (
                <ReactStars
                  count={5}
                  value={average}
                  edit={false}
                  size={24}
                  isHalf={true}
                  fullIcon={<AiFillStar />}
                  activeColor="#ffd700"
                />
              )}

              <a
                href="#reviews"
                className="text-gray-400 ml-2 cursor-pointer hover:text-primary hover:underline hover:decoration-primary"
              >
                {data?.getProduct?.review?.length
                  ? data?.getProduct?.review?.length
                  : 0}{" "}
                Customer Reviews
              </a>
            </div>
            <p className="text-gray-600 text-xl mb-8">
              {data?.getProduct?.shortDescription}
            </p>
            <p className="text-primary text-4xl font-bold mb-4">
              ${data?.getProduct?.price}
            </p>
            <div className="flex items-center justify-between border-t border-t-gray-200 border-b border-b-gray-200 py-4 mb-6 flex-wrap gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="w-8 h-8 rounded-full bg-light-gray text-black flex items-center justify-center text-lg cursor-pointer"
                    onClick={() =>
                      setProductCount((prevCount) =>
                        prevCount > 1 ? prevCount - 1 : prevCount
                      )
                    }
                  >
                    <FiMinus />
                  </p>
                </div>
                <p className="text-black px-3 text-xl">{productCount}</p>
                <div>
                  <p
                    className="w-8 h-8 rounded-full bg-light-gray text-black flex items-center justify-center text-lg cursor-pointer"
                    onClick={() =>
                      setProductCount((prevCount) => prevCount + 1)
                    }
                  >
                    <BiPlus />
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="btn-primary px-12 lg:px-32 mr-3 whitespace-nowrap"
                  onClick={() => handleAddToCart(data?.getProduct)}
                >
                  Add to cart
                </button>
                <span
                  className="text-xl text-gray-400 cursor-pointer hover:text-black px-4 py-5 rounded-lg bg-light-gray"
                  onClick={() => handleWishlist(data?.getProduct?._id)}
                >
                  <BsSuitHeartFill />
                </span>
              </div>
            </div>
            <h4 className="text-black border-b border-border pb-5">
              Category:{" "}
              <span className="font-bold">{data?.getProduct?.category}</span>
            </h4>
            <ul className="mt-5">
              <li className="text-gray-500 relative before:absolute before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-600 before:mt-1.5 pl-4 before:left-0">
                Free global shipping on all orders
              </li>
              <li className="text-gray-500 relative before:absolute before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-600 before:mt-1.5 pl-4 before:left-0">
                30 days easy returns if you change your mind
              </li>
              <li className="text-gray-500 relative before:absolute before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-600 before:mt-1.5 pl-4 before:left-0">
                Order before noon for same day dispatch
              </li>{" "}
            </ul>
          </div>
        </div>
        {/* tab */}
        <ProductDetailsTab data={data} />
        {/* related product */}
        <RelatedProduct data={data} />
      </div>
      {/* product details bottom */}
      <ProductDetailsBottom data={data} />
      <Footer />
    </div>
  );
};

export default ProductDetails;
