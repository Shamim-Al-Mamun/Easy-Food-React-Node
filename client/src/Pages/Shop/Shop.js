import React, { useState } from "react";
import ScreenHeader from "../../Shared/ScreenHeader";
import Product from "../../Shared/Product";
import { Link } from "react-router-dom";
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import Sidebar from "./components/Sidebar";
import NavBar from "../../Shared/NavBar";
import Footer from "../../Shared/Footer";
import { useAllProductQuery } from "../../store/services/productServices";
import { useDispatch, useSelector } from "react-redux";
import { sortProduct } from "../../store/reducers/cartSlice";
import NotFound from "../../Shared/DataNotFound";
import MenuLoader from "../../Shared/Loader/MenuLoader";
import Pagination from "../../Shared/Pagination";

const Shop = () => {
  const [gridView, setGridView] = useState(true);
  const [searchProducts, setSearchProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(8);
  const { data, isLoading } = useAllProductQuery();
  const dispatch = useDispatch();
  const { sort, category } = useSelector((state) => state.cart);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = data?.allProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleChange = (e) => {
    dispatch(sortProduct(e.target.value));
  };
  const productSortByPriceAndCategory = () => {
    let sortedProduct = currentProducts;
    if (sort && data) {
      sortedProduct = currentProducts.sort((a, b) =>
        sort === "high_to_low" ? a.price - b.price : b.price - a.price
      );
    }
    if (category && data) {
      sortedProduct = data?.allProducts?.filter(
        (item) => item.category === category
      );
    }
    console.log(sortedProduct);
    return sortedProduct;
  };

  return (
    <>
      <NavBar />
      <ScreenHeader>
        <div>
          <h1 className="font-JosefinSans font-bold text-5xl text-center">
            Shop
          </h1>
          <Link to="/" className="text-gray-400 hover:text-primary">
            Home
          </Link>
          <span className="text-gray-400 space-x-3"> {">"} </span>
          <span>Shop</span>
        </div>
      </ScreenHeader>
      <div className="container section-padding font-JosefinSans">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="col-span-1 md:col-span-3">
            {/* sorting product part */}
            <div className="flex items-center justify-center md:justify-between mb-12">
              <p className="text-black text-lg hidden md:block">
                Showing results {productSortByPriceAndCategory()?.length}
              </p>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={
                      gridView
                        ? "text-primary cursor-pointer"
                        : "text-gray-500 cursor-pointer"
                    }
                    onClick={() => setGridView(true)}
                  >
                    <BsFillGridFill />
                  </span>
                  <span
                    className={
                      !gridView
                        ? "text-primary cursor-pointer"
                        : "text-gray-500 cursor-pointer"
                    }
                    onClick={() => setGridView(false)}
                  >
                    <FaList />
                  </span>
                </div>
                <select
                  className="outline-none text-lg px-8 py-4 bg-light-gray text-black rounded-md"
                  onClick={handleChange}
                >
                  <option className="text-black text-lg" value="">
                    Default Sorting
                  </option>
                  <option className="text-black text-lg" value="high_to_low">
                    High to low
                  </option>
                  <option className="text-black text-lg" value="low_to_high">
                    Low to high
                  </option>
                </select>
              </div>
            </div>
            {/* product part */}
            {isLoading ? (
              <MenuLoader />
            ) : !productSortByPriceAndCategory()?.length ? (
              <NotFound>
                No products were found matching your selection.
              </NotFound>
            ) : (
              <div
                className={
                  gridView
                    ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`
                    : `grid grid-cols-1 gap-5`
                }
              >
                {productSortByPriceAndCategory()
                  ?.map((product) => (
                    <Product
                      key={product._id}
                      gridView={gridView}
                      product={product}
                    />
                  ))
                  .reverse()}
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              productPerPage={productPerPage}
              totalProducts={data?.allProducts?.length}
              paginate={paginate}
            />
          </div>
          <Sidebar
            searchProducts={searchProducts}
            setSearchProducts={setSearchProducts}
            products={data?.allProducts}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
