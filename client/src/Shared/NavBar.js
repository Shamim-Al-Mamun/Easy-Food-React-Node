import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GiScooter } from "react-icons/gi";
import { MdOutlineShoppingCart, MdAddIcCall } from "react-icons/md";
import { RiMenuLine } from "react-icons/ri";
import { BsFillPersonFill, BsFillSuitHeartFill } from "react-icons/bs";
import Drawer from "./Drawer/Drawer";
import { showModalTrue } from "../store/reducers/authSlice";
import { drawerOpenTrue, mobileNavOpen } from "../store/reducers/drawerSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetSingleUserQuery } from "../store/services/userServices";
import MobileNav from "./MobileNav";
const NavBar = () => {
  const menus = [
    {
      item: "Home",
      path: "/",
    },
    {
      item: "Menu",
      path: "/menu",
    },
    {
      item: "About",
      path: "/about",
    },
    {
      item: "Shop",
      path: "/shop",
    },
    {
      item: "Contact",
      path: "/contact",
    },
  ];
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(false);
  const { data } = useGetSingleUserQuery();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollPosition(true);
      } else {
        setScrollPosition(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleNavigate = () => {
    if (user?.role === "user") {
      navigate("/user/dashboard");
    }
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <>
      <nav
        className={`bg-white shadow-lg font-JosefinSans sticky ${
          !scrollPosition ? "py-6" : "py-2"
        } top-0 transition-all ease-in-out duration-300 z-[38]`}
      >
        <div className="container flex justify-between">
          <div className="lg:hidden text-2xl text-left flex items-center justify-center !ml-[15px]">
            <span onClick={() => dispatch(mobileNavOpen())}>
              <RiMenuLine />
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="mr-6">
              <Link to="/">
                {/* <img src="https://i.ibb.co/THs3Nv9/food-U-removebg-preview.png" alt="logo" /> */}
                Easy Food
              </Link>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              {menus.map((menu, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    isActive
                      ? "mx-4 text-lg text-primary font-semibold"
                      : "mx-4 text-lg hover:text-primary font-semibold"
                  }
                  to={menu.path}
                >
                  {menu.item}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="lg:hidden text-2xl text-left flex items-center justify-center !mr-[15px]">
            <MdAddIcCall />
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <span className="!text-secondary mr-4">
              <GiScooter className="text-6xl" />
            </span>
            <div>
              <p className="text-gray-400 text-sm text-left">Call for order</p>
              <h3 className="text-3xl font-bold text-primary">
                +1 718-904-4450
              </h3>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-between">
            <Link to="/wishlist" className="navbar-icon relative group">
              <BsFillSuitHeartFill />
              <span className="flex items-center justify-center w-6 h-6 text-sm font-semibold text-white bg-primary rounded-[50%] absolute top-0 right-0 group-hover:bg-primary_hover">
                {data?.user?.wishlist.length ? data?.user?.wishlist.length : 0}
              </span>
            </Link>
            <span
              className="navbar-icon relative group"
              onClick={() => dispatch(drawerOpenTrue(true))}
            >
              <MdOutlineShoppingCart />
              <span className="flex items-center justify-center w-6 h-6 text-sm font-semibold text-white bg-primary rounded-[50%] absolute top-0 right-0 group-hover:bg-primary_hover">
                {cart.totalQuantity}
              </span>
            </span>
            {user?.profilePic ? (
              <div className="cursor-pointer" onClick={handleNavigate}>
                <img
                  className="w-[50px] h-[50px] rounded-full"
                  src={user?.profilePic}
                  alt="profile"
                />
              </div>
            ) : (
              <span
                className="navbar-icon"
                onClick={() => dispatch(showModalTrue(true))}
              >
                <BsFillPersonFill />
              </span>
            )}
          </div>
        </div>
      </nav>
      {/* mobile bottom navbar */}
      <div className="fixed block lg:hidden bottom-0 left-0 right-0 w-full bg-white py-3 z-50">
        <ul className="flex items-center justify-between">
          <li className="list-none flex items-center justify-center">
            <Link
              to="/wishlist"
              className="navbar-icon border-0 relative group"
            >
              <BsFillSuitHeartFill />
              <span className="flex items-center justify-center w-6 h-6 text-sm font-semibold text-white bg-primary rounded-[50%] absolute top-0 right-0 group-hover:bg-primary_hover">
                {data?.user?.wishlist.length ? data?.user?.wishlist.length : 0}
              </span>
            </Link>
          </li>
          <li className="list-none  flex items-center justify-center">
            <span
              className="navbar-icon border-0 relative group"
              onClick={() => dispatch(drawerOpenTrue(true))}
            >
              <MdOutlineShoppingCart />
              <span className="flex items-center justify-center w-6 h-6 text-sm font-semibold text-white bg-primary rounded-[50%] absolute top-0 right-0 group-hover:bg-primary_hover">
                {cart.totalQuantity}
              </span>
            </span>
          </li>
          <li className="list-none flex items-center justify-center">
            {user?.profilePic ? (
              <div className="cursor-pointer" onClick={handleNavigate}>
                <img
                  className="w-[50px] h-[50px] rounded-full"
                  src={user?.profilePic}
                  alt="profile"
                />
              </div>
            ) : (
              <span
                className="navbar-icon border-0"
                onClick={() => dispatch(showModalTrue(true))}
              >
                <BsFillPersonFill />
              </span>
            )}
          </li>
        </ul>
      </div>
      <Drawer />
      <MobileNav menus={menus} />
    </>
  );
};

export default NavBar;
