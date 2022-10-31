import React from "react";
import { FaHome } from "react-icons/fa";
import { GoListUnordered } from "react-icons/go";
import { AiOutlineSetting } from "react-icons/ai";
import { FiUnlock } from "react-icons/fi";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
const UserSidebar = ({ openMenu, setOpenMenu }) => {
  const sidebarLinks = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/user/dashboard",
    },
    {
      title: "My Orders",
      icon: <GoListUnordered />,
      path: "/user/myOrders",
    },
    {
      title: "Update Profile",
      icon: <AiOutlineSetting />,
      path: "/user/updateProfile",
    },
    {
      title: "Change Password",
      icon: <FaExchangeAlt />,
      path: "/user/changePassword",
    },
    {
      title: "Back Home",
      icon: <MdArrowBackIosNew />,
      path: "/",
    },
    {
      title: "Logout",
      icon: <FiUnlock />,
      path: "/",
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = (title) => {
    if (title === "Logout") {
      dispatch(logout(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  const handleLogoutMobile = (title) => {
    setOpenMenu(!openMenu);
    if (title === "Logout") {
      dispatch(logout(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  return (
    <>
      {/* Desktop menu */}
      <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white lg:block shadow-md">
        <h3 className="px-6 py-3 text-3xl font-bold uppercase mt-4">
          {user?.fullname}
        </h3>
        {sidebarLinks.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "border-l-4 border-primary bg-light-gray px-6 py-3 flex items-center justify-start text-lg"
                : "px-6 py-3 flex items-center justify-start text-lg"
            }
            onClick={() => handleLogout(item.title)}
          >
            <span className="mr-3">{item?.icon}</span>
            {item?.title}
          </NavLink>
        ))}
      </aside>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-20 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center ${
          openMenu ? "opacity-100" : "opacity-0 hidden"
        } transition-all ease-linear duration-500`}
      >
        <aside
          className={`fixed inset-y-0 z-30 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white left-0 ${
            openMenu ? "-translate-x-0" : "-translate-x-[400px]"
          } transition-all ease-linear duration-500`}
        >
          <h3 className="px-6 py-3 text-xl lg:text-3xl font-bold uppercase mt-4">
            {user?.fullname}
          </h3>
          {sidebarLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => handleLogoutMobile(item.title)}
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 border-primary bg-light-gray px-6 py-3 flex items-center justify-start text-lg"
                  : "px-6 py-3 flex items-center justify-start text-lg"
              }
            >
              <span className="mr-3">{item?.icon}</span>
              {item?.title}
            </NavLink>
          ))}
        </aside>
      </div>
    </>
  );
};

export default UserSidebar;
