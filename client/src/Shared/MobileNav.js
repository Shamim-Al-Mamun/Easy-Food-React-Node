import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { mobileNavClose } from "../store/reducers/drawerSlice";

const MobileNav = ({ menus }) => {
  const { mobileNav } = useSelector((state) => state.drawer);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`fixed overflow-hidden z-50 bg-gray-900 bg-opacity-25 inset-0 transform ${
          mobileNav
            ? "transition-opacity opacity-100 duration-500 translate-x-0"
            : "transition-all delay-300 opacity-0 -translate-x-full"
        }`}
        onClick={() => dispatch(mobileNavClose())}
      >
        <div
          className={`md:w-[420px] w-9/12 left-0 absolute bg-black h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform" +
          ${
            mobileNav ? "translate-x-0 " : " -translate-x-full"
          } text-white p-4 pt-6 flex flex-col gap-4`}
        >
          <div
            className="absolute text-red-600 top-3 right-3  rounded-full text-4xl cursor-pointer w-8 h-8 flex items-center justify-center -rotate-45"
            onClick={() => dispatch(mobileNavClose())}
          >
            +
          </div>

          {menus.map((menu, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "mx-4 text-lg text-primary"
                  : "mx-4 text-lg hover:text-primary duration-500"
              }
              to={menu.path}
              onClick={() => dispatch(mobileNavClose())}
            >
              {menu.item}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
