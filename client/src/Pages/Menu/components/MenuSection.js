import React, { useState } from "react";
import MenuItemLoader from "../../../Shared/Loader/MenuItemLoader";
import Tab from "../../../Shared/Tab";
import { useAllCategoryQuery, useAllProductQuery } from "../../../store/services/productServices";
import MenuItem from "./MenuItem";
const MenuSection = () => {
  const { data:allCategory} = useAllCategoryQuery();
  const [openTab, setOpenTab] = useState(allCategory?.allCategory[0]?.categoryName);
  const { data, isLoading } = useAllProductQuery();
  const filteredData = data?.allProducts.filter(
    (product) => product.category === openTab
  );
  return (
    <div className="container section-padding font-JosefinSans">
      <h2 className="section-title text-center text-4xl">Menus Of The Day</h2>
      <Tab openTab={openTab} setOpenTab={setOpenTab} />
      {/* menu item */}
      {isLoading ? (
        <MenuItemLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredData?.slice(0, 6).map((product) => (
            <MenuItem product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuSection;
