import React from "react";
import { Link } from "react-router-dom";

const AboutWelcome = () => {
  return (
    <div className="bg-white section-padding">
      <div className="container font-JosefinSans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
          <div className="content text-center md:text-left">
            <p className="text-primary font-Norican text-3xl md:text-4xl lg:text-5xl mb-3">
              Wellome!
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-JosefinSans leading-[50px] md:leading-[60px] lg:leading-[70px]">
              Best burger ideas <br /> & traditions from the whole world
            </h2>
            <p className="text-gray-500 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
            <br />
            <p className="mb-14 text-gray-500 text-lg">
              Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat
              fermentum. Aliquam non tincidunt urna. Integer tincidunt nec nisl
              vitae ullamcorper. Proin sed ultrices erat.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Now
            </Link>
          </div>
          <div className="imgs hidden md:block">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <img
                  className="w-full rounded-md hover:-translate-y-2 transition-all ease-linear duration-200"
                  src="https://i.ibb.co/K2LxJwg/about-hero-2.jpg"
                  alt="about"
                />
              </div>
              <div>
                <img
                  className="mb-5 w-full rounded-md hover:-translate-y-2 transition-all ease-linear duration-200"
                  src="https://i.ibb.co/Sndz2dX/about-hero-1.jpg"
                  alt="about"
                />
                <img
                  className="w-full rounded-md hover:-translate-y-2 transition-all ease-linear duration-200"
                  src="https://i.ibb.co/F6PbBqD/about-hero-3.jpg"
                  alt="about"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWelcome;
