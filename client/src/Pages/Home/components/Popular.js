import React, { useState } from "react";
import Tab from "../../../Shared/Tab";
import Product from "../../../Shared/Product";
import { Link } from "react-router-dom";
import {
  useAllCategoryQuery,
  useAllProductQuery,
} from "../../../store/services/productServices";
import MenuLoader from "../../../Shared/Loader/MenuLoader";
import { useEffect } from "react";

const Popular = () => {
  const { data: allCategory } = useAllCategoryQuery();
  const [openTab, setOpenTab] = useState(
    allCategory?.allCategory[0]?.categoryName
  );
  const [gridView, setGridView] = useState(true);
  const { data, isLoading, isSuccess } = useAllProductQuery();
  const filteredData = data?.allProducts.filter(
    (product) => product.category === openTab
  );

  useEffect(() => {
    setOpenTab(allCategory?.allCategory[0]?.categoryName);
  }, [allCategory]);

  console.log(allCategory);
  console.log(data);
  return (
    <div className="bg-white font-JosefinSans section-padding">
      <div className="container">
        <h2 className="section-title text-center">Popular dishes</h2>
        {/* tab */}
        <Tab openTab={openTab} setOpenTab={setOpenTab} />
        {/* product */}

        {isLoading ? (
          <MenuLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:px-0">
            {filteredData
              ?.slice(0, 8)
              .map((product) => (
                <Product
                  key={product._id}
                  gridView={gridView}
                  product={product}
                />
              ))
              .reverse()}
          </div>
        )}
        <div className="flex items-center justify-center mt-12">
          <Link to="/shop" className="btn-primary">
            All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Popular;
