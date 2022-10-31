import React, { useState, useEffect } from "react";
import {
  useAddProductMutation,
  useAllCategoryQuery,
} from "../../../../store/services/productServices";
import { useNavigate } from "react-router-dom";
import { useUploadImagesMutation } from "../../../../store/services/uploadServices";
import { toast } from "react-toastify";
const AddProduct = () => {
  const { data: categories, isSuccess } = useAllCategoryQuery();
  const [sendAddProduct, result] = useAddProductMutation();
  const [productImages, setProductImages] = useState();
  const [productInfo, setProductInfo] = useState({});
  const [uploadImages] = useUploadImagesMutation();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };
  // image upload
  const handleImage = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "maolcn4b");
      uploadImages(data).then((result) =>
        setProductImages(result?.data?.url?.toString())
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendAddProduct({
      ...productInfo,
      productImages,
    }).then((res) => {
      if (res.data) {
        navigate("../allProducts");
      }
    });
  };
  useEffect(() => {
    if (result?.isSuccess) {
      toast.success(result?.data.msg, {
        theme: "colored",
      });
    }
  }, [result?.isSuccess]);
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-4">Add Product</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 bg-white shadow-md p-6 rounded-md"
      >
        <div className="mb-4">
          <label htmlFor="title" className="text-xl font-bold">
            Product Title
          </label>
          <br />
          <input
            type="text"
            name="title"
            className="mt-2 px-4 py-2 w-full focus:outline-none border-2 border-transparent focus:border-primary rounded-md bg-light-gray"
            placeholder="Product title"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="text-xl font-bold">
            Product Price
          </label>
          <br />
          <input
            type="text"
            name="price"
            className="mt-2 px-4 py-2 w-full focus:outline-none border-2 border-transparent focus:border-primary rounded-md bg-light-gray"
            placeholder="Product Price"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="text-xl font-bold">
            Select Category
          </label>
          <br />
          <select
            name="category"
            className="bg-light-gray border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 outline-none"
            required
            onChange={handleCategoryChange}
          >
            <option selected value="">
              Select Category
            </option>
            {isSuccess &&
              categories.allCategory.map((category) => (
                <option value={category.categoryName} key={category._id}>
                  {category.categoryName}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="text-xl font-bold">
            Product Images
          </label>
          <br />
          <div className="form-group border-none my-2 bg-light-gray py-2">
            <span className="sr-only">Choose File</span>
            <input
              type="file"
              onChange={(e) => handleImage(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              name="profilePic"
              multiple
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="shortDescription" className="text-xl font-bold">
            Product Short Description
          </label>
          <br />
          <textarea
            name="shortDescription"
            className="mt-2 px-4 py-2 w-full focus:outline-none border-2 border-transparent focus:border-primary rounded-md bg-light-gray"
            placeholder=" Product Short Description"
            rows="5"
            required
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-xl font-bold">
            Product Description
          </label>
          <br />
          <textarea
            name="description"
            className="mt-2 px-4 py-2 w-full focus:outline-none border-2 border-transparent focus:border-primary rounded-md bg-light-gray"
            placeholder=" Product Description"
            rows="5"
            required
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="btn-primary py-2" type="submit">
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
