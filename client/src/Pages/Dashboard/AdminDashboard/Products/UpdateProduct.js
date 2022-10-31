import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useSingleProductQuery,
  useAllCategoryQuery,
  useUpdateProductMutation,
} from "../../../../store/services/productServices";
import { useUploadImagesMutation } from "../../../../store/services/uploadServices";
import { toast } from "react-toastify";
const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data: categories, isSuccess } = useAllCategoryQuery();
  const [sendUpdateProductInfo, result] = useUpdateProductMutation();
  const { data, isFetching } = useSingleProductQuery({
    productId,
  });
  const [productImage, setProductImage] = useState();
  const [uploadImages] = useUploadImagesMutation();
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
    category: "",
    shortDescription: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };
  useEffect(() => {
    if (!isFetching) {
      setProductInfo(data.getProduct);
      setProductImage(data?.getProduct?.images[0])
    }
  }, [data]);
  // image upload
  const handleImage = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "poco-site");
      data.append("cloud_name", "online-poco");
      uploadImages(data).then((result) =>
        setProductImage(result.data.url.toString())
        // console.log(result.data.url.toString())
        );
    }
  };
  const handleUpdate = () => {
    sendUpdateProductInfo({
      ...productInfo,
      images:productImage,
      id: productId,
    }).then((res) => {
      toast.success(res?.data?.msg, {
        theme: "colored",
      });
      if (res.data) {
        navigate("../allProducts");
      }
    });
  };
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-4">Update Product</h2>
      <div className="grid grid-cols-1 bg-white shadow-md p-6 rounded-md mx-0 lg:mx-16">
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
            value={productInfo.title}
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
            value={productInfo.price}
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
            onChange={handleChange}
          >
            {isSuccess &&
              categories.allCategory.map((category) => (
                <option
                  value={category.categoryName}
                  key={category._id}
                  selected={category.categoryName === productInfo.category}
                >
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
            value={productInfo.shortDescription}
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
            value={productInfo.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="btn-primary py-2" onClick={handleUpdate}>
          Update Product
        </button>
      </div>
    </>
  );
};

export default UpdateProduct;
