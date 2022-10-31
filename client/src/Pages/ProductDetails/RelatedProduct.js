import React, { useState } from "react";
import NotFound from "../../Shared/DataNotFound";
import Product from "../../Shared/Product";
import { useAllProductQuery } from "../../store/services/productServices";
const RelatedProduct = ({ data }) => {
  const [gridView, setGridView] = useState(true);
  const { data: products, isLoading, isSuccess } = useAllProductQuery();
  const relatedData =
    isSuccess &&
    products?.allProducts
      ?.filter((product) => product?.category === data?.getProduct?.category)
      .filter((product) => product._id !== data?.getProduct?._id);

  return (
    <div className="section-padding pt-0 font-JosefinSans">
      <h2 className="text-4xl py-8 text-black font-bold text-center">
        Related Product
      </h2>
      {!relatedData.length ? (
        <NotFound>Related Product Not Found</NotFound>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5 lg:px-0">
          {relatedData?.map((product) => (
          <Product gridView={gridView} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProduct;
