import React from "react";

const NotFound = ({ children }) => {
  return (
    <div className="w-full text-center mt-5">
      <h2 className="text-xl text-white bg-secondary p-2 rounded-md">
        {children ? children : "Order Not Found"}
      </h2>
    </div>
  );
};

export default NotFound;
