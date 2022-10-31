import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="overflow-hidden h-screen">
        <div className="container section-padding font-JosefinSans">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <img
                src={require("../../assets/images/notfound.png")}
                className="w-3/3"
              />
              <Link to="/" className="btn-primary">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
