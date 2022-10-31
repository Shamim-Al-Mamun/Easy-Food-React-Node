import React, { useEffect } from "react";
import { BsPerson, BsEnvelope } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { useSignupMutation } from "../../../../store/services/authServices";
import { useUploadImagesMutation } from "../../../../store/services/uploadServices";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  showModalFalse,
  setToken,
  setUser,
} from "../../../../store/reducers/authSlice";
import { useState } from "react";
const SignupModal = ({ setIsSignUpModal }) => {
  const [userInfo, setUserInfo] = React.useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [profilePic, setProfilePic] = React.useState(null);
  const [signupData, result] = useSignupMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadImages] = useUploadImagesMutation();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  // image upload
  const handleImage = (pics) => {
    setIsLoading(true);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "maolcn4b");
      uploadImages(data).then((result) => {
        setProfilePic(result.data.url.toString());
      }, setIsLoading(false));
    }
  };
  // create new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profilePic) {
      await signupData({
        ...userInfo,
        profilePic,
      });
    } else {
      alert("Please select a profile photo");
    }
  };
  // set user info in local storage
  useEffect(() => {
    if (result?.isSuccess) {
      localStorage.setItem("token", result?.data?.token);
      dispatch(setToken(result?.data?.token));
      localStorage.setItem("user", JSON.stringify(result?.data?.newUser));
      dispatch(setUser(result?.data?.newUser));
      toast.success(result?.data.msg, {
        theme: "colored",
      });
      dispatch(showModalFalse(false));
    }
  }, [result?.isSuccess]);

  // handle error
  useEffect(() => {
    if (result?.isError) {
      if (result?.error?.data?.error?.email) {
        toast.error("Email already use", {
          theme: "colored",
          closeOnClick: true,
          hideProgressBar: false,
        });
      }
      if (result?.error?.data?.error?.password) {
        toast.error("Password should be 6 characters long", {
          theme: "colored",
          closeOnClick: true,
          hideProgressBar: false,
        });
      }
    }
  }, [result?.isError]);
  return (
    <>
      <div className="relative my-6 mx-auto w-full max-w-lg">
        {/*content*/}
        <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-center justify-center p-5 rounded-t">
            <div>
              <h3 className="text-3xl font-bold text-center">Signing Up</h3>
              <p className="text-gray-400 text-lg text-center">
                Create an account with email
              </p>
            </div>
          </div>
          {/*body*/}
          <form onSubmit={handleSubmit}>
            <div className="relative p-9 flex-auto grid grid-cols-1 gap-4">
              {/* full name */}
              <div>
                <label
                  htmlFor="fullname"
                  className="my-4 text-slate-500 text-lg leading-relaxed"
                >
                  Name
                </label>
                <div className="form-group">
                  <div className=" text-gray-500 font-xl">
                    <BsPerson />
                  </div>
                  <input
                    type="text"
                    onChange={handleChange}
                    className="block border-none w-full p-2 rounded outline-none"
                    name="fullname"
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="my-4 text-slate-500 text-lg leading-relaxed"
                >
                  Email
                </label>
                <div className="form-group">
                  <div className=" text-gray-500 font-xl">
                    <BsEnvelope />
                  </div>
                  <input
                    type="email"
                    onChange={handleChange}
                    className="block border-none w-full p-2 rounded outline-none"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              {/* password */}
              <div>
                <label
                  htmlFor="password"
                  className="my-4 text-slate-500 text-lg leading-relaxed"
                >
                  Password
                </label>
                <div className="form-group">
                  <div className=" text-gray-500 font-xl">
                    <FiLock />
                  </div>
                  <input
                    type="password"
                    onChange={handleChange}
                    className="block border-none w-full p-2 rounded outline-none"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              {/* choose file */}
              <div>
                <div className="form-group border-none my-2">
                  <span className="sr-only">Choose File</span>
                  <input
                    type="file"
                    onChange={(e) => handleImage(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    name="profilePic"
                    required
                  />
                </div>
              </div>
              <input
                className={`btn-primary py-2 block ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
                type="submit"
                value="Register"
              />
              <p className="text-gray-500 text-center">
                Already have a account ?&nbsp;
                <span
                  className="hover:text-primary cursor-pointer"
                  onClick={() => setIsSignUpModal(false)}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
