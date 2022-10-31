import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../../store/services/productServices";
import { useUploadImagesMutation } from "../../../../store/services/uploadServices";
import { toast } from "react-toastify";
const UpdateCateogory = () => {
  const { categoryId } = useParams();
  const { data, isLoading, isSuccess } = useSingleCategoryQuery({
    categoryId,
  });
  const [categoryName, setCategoryName] = useState(
    data?.category?.categoryName
  );
  const [categoryImage, setCategoryImage] = useState(
    data?.category?.categoryImage
  );
  const [uploadImages] = useUploadImagesMutation();
  const navigate = useNavigate();
  const [sendUpdateCateInfo, result] = useUpdateCategoryMutation();
  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };
  const handleImage = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "poco-site");
      data.append("cloud_name", "online-poco");
      uploadImages(data).then((result) =>
        setCategoryImage(result.data.url.toString())
      );
    }
  };
  const handleUpdate = () => {
    sendUpdateCateInfo({
      id: categoryId,
      categoryName,
      categoryImage,
    }).then((res) => {
      console.log(res);
      toast.success(res?.data?.msg, {
        theme: "colored",
      });
      if (res.data) {
        navigate("../allCategories");
      }
    });
  };

  if (result?.isSuccess) {
    navigate("../allCategories");
  }
  console.log(categoryName);
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-4">Update Category</h2>
      <div className="grid grid-cols-1 bg-white shadow-md p-6 rounded-md mx-0 lg:mx-16">
        <div className="mb-4">
          <label htmlFor="category name" className="text-xl font-bold">
            Category Name
          </label>
          <br />
          <input
            type="text"
            name="categoryName"
            className="mt-2 px-4 py-2 w-full focus:outline-none border-2 border-transparent focus:border-primary rounded-md bg-light-gray"
            placeholder="Category Name"
            defaultValue={data?.category?.categoryName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="text-xl font-bold">
            Category Image
          </label>
          <br />
          <div className="form-group border-none my-2 bg-light-gray py-2">
            <span className="sr-only">Choose File</span>
            <input
              type="file"
              onChange={(e) => handleImage(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              name="categoryImage"
            />
          </div>
        </div>
        <button className="btn-primary py-2" onClick={handleUpdate}>
          Update Category
        </button>
      </div>
    </>
  );
};

export default UpdateCateogory;
