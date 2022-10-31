import React, { useState } from "react";
import ReviewTabContent from "./ReviewTabContent";

const ProductDetailsTab = ({ data }) => {
  const [selectTab, setSelectTab] = useState("Review");
  return (
    <div className="font-JosefinSans section-padding pt-0">
      {/* tab */}
      <div className="space-x-6 flex items-center justify-center mb-10">
        <button
          className={
            selectTab === "Description"
              ? "btn-primary px-[2rem] md:px-[2.5rem] text-white"
              : "btn-primary px-[2rem] md:px-[2.5rem] bg-transparent"
          }
          onClick={() => setSelectTab("Description")}
        >
          Description
        </button>
        <button
          className={
            selectTab === "Review"
              ? "btn-primary px-[2rem] md:px-[2.5rem] text-white whitespace-nowrap"
              : "btn-primary  px-[2rem] md:px-[2.5rem] bg-transparent whitespace-nowrap"
          }
          onClick={() => setSelectTab("Review")}
        >
          Reviews (
          {data?.getProduct?.review?.length
            ? data?.getProduct?.review?.length
            : 0}
          )
        </button>
      </div>
      {/* Description tab content  */}
      <div className={selectTab === "Description" ? "block md:px-16 px-4" : "hidden"}>
        <p className="text-gray-500 text-xl">{data?.getProduct?.description}</p>
      </div>
      {/* Review tab content  */}
      <div className={selectTab === "Review" ? "block" : "hidden"}>
        <ReviewTabContent data={data} />
      </div>
    </div>
  );
};

export default ProductDetailsTab;
