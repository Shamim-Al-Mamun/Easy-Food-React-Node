import React from "react";
import { useAllCategoryQuery } from "../store/services/productServices";

const Tab = ({ openTab, setOpenTab }) => {
  const { data, isLoading } = useAllCategoryQuery();
  return (
    <>
      <div className="tab-wrapper flex flex-wrap items-center justify-center gap-4 mb-12">
        {isLoading
          ? "Loading..."
          : data?.allCategory.slice(0, 5).map((category, index) => (
              <button
                key={index}
                className={
                  openTab === category.categoryName
                    ? "btn-tab text-[15px] md:btn-tab bg-primary border-primary text-white"
                    : "btn-tab text-[15px] md:btn-tab"
                }
                onClick={() => setOpenTab(category.categoryName)}
              >
                {category.categoryName}
              </button>
            ))}
      </div>
    </>
  );
};

export default Tab;
