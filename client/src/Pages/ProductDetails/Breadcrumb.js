import React from "react";
import { Link } from "react-router-dom";
const Breadcrumb = ({data}) => {
  return (
    <div className='bg-[url("https://i.ibb.co/FxpPTLD/breadcrumb.jpg")] py-6 px-5 lg:px-0'>
      <div className="container">
        <Link to="/" className="text-gray-400 hover:text-primary">
          Home
        </Link>
        <span className="text-gray-400 space-x-3"> {">"} </span>
        <Link to="/" className="text-gray-400 hover:text-primary">
          {data?.getProduct?.category}
        </Link>
        <span className="text-gray-400 space-x-3"> {">"} </span>
        <span className="text-black space-x-3"> {data?.getProduct?.title} </span>
      </div>
    </div>
  );
};

export default Breadcrumb;
