import React from "react";
import ScreenHeader from "../../Shared/ScreenHeader";
import { Link } from "react-router-dom";
import MenuSection from "./components/MenuSection";
import FreeService from "./components/FreeService";
import NavBar from "../../Shared/NavBar";
import Footer from "../../Shared/Footer";

const Menu = () => {
  return (
    <>
    <NavBar />
      <ScreenHeader>
        <div>
          <h1 className="font-JosefinSans font-bold text-5xl text-center">Menu Restaurant</h1>
          <Link to="/" className="text-gray-400 hover:text-primary">
            Home
          </Link>
          <span className="text-gray-400 space-x-3"> {">"} </span>
          <span>Menu Resturant</span>
        </div>
      </ScreenHeader>
      <MenuSection />
      <FreeService />
      <Footer />
    </>
  );
};

export default Menu;
