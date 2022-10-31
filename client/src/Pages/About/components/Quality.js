import React from "react";
import { Link } from "react-router-dom";

const Quality = () => {
  return (
    <div className="bg-white section-padding pt-5">
      <div className="container">
        <div className="grid grid-cols-1 gap-16 md:gap-28">
          {/* 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-24 mb-5">
            <div className="content mb-3 mb:mb-0 text-center md:text-left">
              <h2 className="text-primary font-Norican text-lg md:text-2xl lg:text-3xl mb-3">
                Our Quality
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-JosefinSans leading-[50px] md:leading-[60px] lg:leading-[70px] mb-4">
                Chicken
              </h2>
              <p className="text-gray-500 mb-10 text-lg leading-[30px]">
                Quality is our #1 ingredient. That’s why our Chicken Wings,
                Chicken Bites and Grilled Chicken Topping are made from chickens
                raised without antibiotics and fed an all vegetable-grain diet,
                with no animal by-products. Plus, our Bites are made with 100%
                chicken breast meat.
              </p>
              <Link to="/shop" className="btn-primary">
                Order Now
              </Link>
            </div>
            <div className="img mt-4 md:mt-0">
              <img
                src="https://i.ibb.co/w6F48mW/about-checken.png"
                alt="chicken"
              />
            </div>
          </div>
          {/* 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-24 mb-5">
            <div className="img mt-4 md:mt-0 order-2 md:order-1">
              <img
                src="https://i.ibb.co/R3zjvcx/about-burger.png"
                alt="chicken"
              />
            </div>
            <div className="content mb-3 mb:mb-0 text-center md:text-left order-1 md:order-2">
              <h2 className="text-primary font-Norican text-lg md:text-2xl lg:text-3xl mb-3">
                Our Quality
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-JosefinSans leading-[50px] md:leading-[60px] lg:leading-[70px] mb-4">
                Burger
              </h2>
              <p className="text-gray-500 mb-10 text-lg leading-[30px]">
                Some of the world’s best cheese is made close to home! All our
                deliciously melty Mozzarella is made with 100% Canadian milk.
                We’re proud to support Canadian dairy farmers.
              </p>
              <Link to="/shop" className="btn-primary">
                Order Now
              </Link>
            </div>
          </div>
          {/* 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-24 mb-5">
            <div className="content mb-3 mb:mb-0 text-center md:text-left">
              <h2 className="text-primary font-Norican text-lg md:text-2xl lg:text-3xl mb-3">
                Our Quality
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-JosefinSans leading-[50px] md:leading-[60px] lg:leading-[70px] mb-4">
                Pizza Douch
              </h2>
              <p className="text-gray-500 mb-10 text-lg leading-[30px]">
                Quality is our #1 ingredient. That’s why our Chicken Wings,
                Chicken Bites and Grilled Chicken Topping are made from chickens
                raised without antibiotics and fed an all vegetable-grain diet,
                with no animal by-products. Plus, our Bites are made with 100%
                chicken breast meat.
              </p>
              <Link to="/shop" className="btn-primary">
                Order Now
              </Link>
            </div>
            <div className="img mt-4 md:mt-0">
              <img
                src="https://i.ibb.co/nnRKWR4/about-pizza.png"
                alt="chicken"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quality;
