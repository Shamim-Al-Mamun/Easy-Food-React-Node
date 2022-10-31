import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../../store/reducers/authSlice";
import { useUpdateProfileMutation } from "../../../store/services/userServices";
import { useUploadImagesMutation } from "../../../store/services/uploadServices";
const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [updateProfileInfo, result] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const [uploadImages] = useUploadImagesMutation();
  const [profilePic, setProfilePic] = useState();
  const [profileInfo, setProfileInfo] = useState({
    fullname: user?.fullname,
    email: user?.email,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };
  // image upload
  const handleImage = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "poco-site");
      data.append("cloud_name", "online-poco");
      uploadImages(data).then((result) =>
        setProfilePic(result.data.url.toString())
      );
    }
  };
  // update function
  const handleUpdateProfile = async () => {
    await updateProfileInfo({
      ...profileInfo,
      profilePic,
      _id: user._id,
    });
  };
  useEffect(() => {
    if (result?.isSuccess){
      localStorage.setItem("user", JSON.stringify(result?.data?.updateUser));
      dispatch(setUser(result?.data?.updateUser));
      toast.success(result?.data?.msg, {
        theme: "colored",
        closeOnClick: true,
        hideProgressBar: false,
      });
    }
  }, [result?.isSuccess]);
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-4">Update Profile</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <label htmlFor="Full Name" className="text-gray-600 text-lg">
          Change Image
        </label>
        <div className="form-group border-none col-span-2 bg-white py-2">
          <span className="sr-only">Choose File</span>
          <input
            type="file"
            onChange={(e) => handleImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            name="profilePic"
          />
        </div>
        <div className="mb-3 col-span-2 lg:col-span-1">
          <label htmlFor="Full Name" className="text-gray-600 text-lg">
            Full Name
          </label>
          <br />
          <input
            className="px-4 py-2 w-full focus:outline-none border-2 border-transparent focus:border-primary rounded-md bg-white"
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={profileInfo?.fullname}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3 col-span-2 lg:col-span-1">
          <label htmlFor="Email" className="text-gray-600 text-lg">
            Email
          </label>
          <br />
          <input
            className="px-4 py-2 w-full focus:outline-none border-2 border-transparent focus:border-primary rounded-md bg-white"
            type="email"
            name="email"
            placeholder="Email"
            value={profileInfo?.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button className="btn-primary py-2" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </div>
    </>
  );
};

export default UpdateProfile;
