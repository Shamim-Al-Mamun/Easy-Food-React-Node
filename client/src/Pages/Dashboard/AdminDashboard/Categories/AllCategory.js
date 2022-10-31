import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  useAllCategoryQuery,
  useDeleteCategoryMutation,
} from "../../../../store/services/productServices";
import Swal from "sweetalert2";
import NotFound from "../../../../Shared/DataNotFound";
import CategoryLoader from "../../../../Shared/Loader/CategoryLoader";
const AllCategory = () => {
  const navigate = useNavigate();
  const { data, isSuccess, isLoading } = useAllCategoryQuery();
  const [categoryIdSend] = useDeleteCategoryMutation();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure!",
      icon: "warning",
      showCancelButton: true,
      text: "Delete this category and all this category included product",
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted", "", "success");
        categoryIdSend(id);
      }
    });
  };
  const handleNavigate = (id) => {
    navigate(`updateCategory/${id}`);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-4">All Category</h2>
      {isLoading ? (
        <CategoryLoader />
      ) : !data?.allCategory?.length ? (
        <NotFound>Category Not Found</NotFound>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {data?.allCategory
            ?.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-col cursor-pointer hover:text-primary transition-all duration-150 group bg-white p-6 relative"
              >
                <div className="mx-auto overflow-hidden">
                  <img
                    className="group-hover:scale-110 transition-all duration-300 ease-in-out w-36"
                    src={category.categoryImage}
                    alt="category-img"
                  />
                </div>
                <h2 className="uppercase text-sm font-bold text-center mt-3">
                  {category.categoryName}
                </h2>
                <div className="absolute top-4 right-2 flex items-center justify-end gap-2 translate-x-0 opacity-0 group-hover:-translate-x-0 group-hover:opacity-100 origin-left transition-all ease-linear duration-300">
                  <span
                    className="text-2xl font-bold text-green-600"
                    onClick={() => handleNavigate(category._id)}
                  >
                    <FaEdit />
                  </span>
                  <span
                    className="text-2xl font-bold text-red-600"
                    onClick={() => handleDelete(category._id)}
                  >
                    <MdDelete />
                  </span>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      )}
    </>
  );
};

export default AllCategory;
