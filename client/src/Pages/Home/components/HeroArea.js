import React from 'react'
import { Link } from "react-router-dom";
const HeroArea = () => {
  return (
    <div className='bg-hero bg-[#333] bg-cover bg-center bg-no-repeat md:h-[750px] h-auto py-5 md:py-2 relative z-0 font-JosefinSans' >
      <div className="container grid grid-cols-1 md:grid-cols-2 items-center h-full z-20 gap-2 relative">
        {/* col - 1 */}
        <div className="md:text-left text-center py-6 md:py-0 z-20">
          <h1 className="text-3xl md:text-5xl lg:text-7xl uppercase text-white font-bold mb-3 leading-tight">UNLIMITED <br />
            MEDIUM <span className='text-primary text-shadow-lg'>PIZZAS</span></h1>
          <h2 className="text-secondary text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Medium 2-topping* pizza</h2>
          <p className="text-white text-lg md:text-xl mb-5">*Additional charge for premium toppings. Minimum of 2 required.</p>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
            <Link to='/menu' className="btn-primary my-4 md:my-0">Order Now</Link>
            <p className="text-secondary text-3xl lg:text-5xl font-bold ml-7">$12.99</p>
          </div>
        </div>
        {/* col - 2 */}
        <div className="p-5 md:p-0 z-30">
          <img src={require("../../../assets/images/hero_food.png")} alt="hero food" />
        </div>
        {/* absolute image */}
          <div className='absolute -top-36 right-20 left-0 z-0'>
            <img className='hover:scale-125 transition-all duration-200 ease-in-out' src={require("../../../assets/images/hero_tomato.png")} alt="tomato" />
          </div>
      </div>
    </div>
  )
}

export default HeroArea