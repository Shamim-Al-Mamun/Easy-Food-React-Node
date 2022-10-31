import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAddCategoryMutation } from "../../../../store/services/productServices";
import { useUploadImagesMutation } from "../../../../store/services/uploadServices";
import { useNavigate } from "react-router-dom";
const AddCategory = () => {
  const [categoryName, setCategoryName] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);
  const [uploadImages] = useUploadImagesMutation();
  const [categoryInfo, result] = useAddCategoryMutation();
  const navigate = useNavigate();
  // category image upload
  const handleImage = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "maolcn4b");
      uploadImages(data).then((result) => {
        console.log(result.data);
        setCategoryImage(result.data.url.toString());
      });
    }
  };
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (categoryImage) {
      categoryInfo({
        categoryName,
        categoryImage,
      }).then((res) => {
        if (res?.data) {
          navigate("../allCategories");
        }
      });
      e.target.reset();
    } else {
      alert("Please select Category Image");
    }
  };

  useEffect(() => {
    toast.success(result?.data?.msg, {
      theme: "colored",
    });
  }, [result?.isSuccess]);
  useEffect(() => {
    toast.error(result?.error?.data?.error?.categoryName, {
      theme: "colored",
    });
  }, [result?.isError]);
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-4">Add Category</h2>
      <form
        onSubmit={handleAddCategory}
        className="grid grid-cols-1 bg-white shadow-md p-6 rounded-md"
      >
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
            onChange={(e) => setCategoryName(e.target.value)}
            required
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
        <button className="btn-primary py-2" type="submit">
          Add Category
        </button>
      </form>
    </>
  );
};

export default AddCategory;
