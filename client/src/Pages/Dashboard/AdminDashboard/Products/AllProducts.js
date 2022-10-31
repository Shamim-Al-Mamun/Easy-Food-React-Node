import React, { useState } from "react";
import SingleProduct from "./SingleProduct";
import { useAllProductQuery } from "../../../../store/services/productServices";
import NotFound from "../../../../Shared/DataNotFound";
import MenuLoader from "../../../../Shared/Loader/MenuLoader";
import Pagination from "../../../../Shared/Pagination";
const AllProducts = () => {
  const { data, isLoading } = useAllProductQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(8);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = data?.allProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-4">Products</h2>
      <div className="antialiased text-gray-900 font-JosefinSans">
        <div className="container mx-auto">
          {isLoading
            ? <MenuLoader />
            : (!data?.allProducts.length && (
                <NotFound>Product Not Found</NotFound>
              )) || (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 -mx-4">
                  {currentProducts
                    ?.map((product) => <SingleProduct product={product} />)
                    .reverse()}
                </div>
              )}
              <Pagination
              currentPage={currentPage}
              productPerPage={productPerPage}
              totalProducts={data?.allProducts.length}
              paginate={paginate}
            />
        </div>
      </div>
    </>
  );
};

export default AllProducts;
