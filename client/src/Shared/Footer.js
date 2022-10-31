import React from 'react';
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaDev } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className='bg-black section-padding font-JosefinSans'>
        <div className="container">
          <div className='mb-12'>
            <img className='mx-auto' src="https://i.ibb.co/THs3Nv9/food-U-removebg-preview.png" alt="logo" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* 1 */}
            <div className='text-center mb-12 md:mb-0'>
              <h2 className="uppercase mb-3 text-white text-2xl font-bold">Address</h2>
              <p className='text-gray-300'>570 8th Ave,<br /> New York, NY 10018 <br /> United States</p>
            </div>
            {/* 2 */}
            <div className='text-center mb-12 md:mb-0'>
              <h2 className="uppercase mb-3 text-white text-2xl font-bold">Book Table</h2>
              <p className='text-gray-300'>Dogfood och Sliders foodtruck.<br /> Under Om oss kan ni läsa</p>
              <p className='text-primary font-bold text-xl mt-3'>(850) 435-4155</p>
            </div>
            {/* 3 */}
            <div className='text-center mb-12 md:mb-0'>
              <h2 className="uppercase mb-3 text-white text-2xl font-bold">Opening Hours</h2>
              <p className='text-gray-300'>Monday – Friday: <span className='font-bold text-white'>8am – 4pm</span></p>
              <p className='text-gray-300'>Saturday:
                <span className='font-bold text-white'> 9am – 5pm</span></p>
              <div className="flex items-center gap-3 justify-center mt-5">
                <Link to="#" className='footer-icon'>
                  <FaFacebookSquare />
                </Link>
                <Link to="#" className='footer-icon'>
                  <FaTwitterSquare />
                </Link>
                <Link to="#" className='footer-icon'>
                  <FaLinkedin />
                </Link>
                <Link to="#" className='footer-icon'>
                  <FaDev />
                </Link>
              </div>
            </div>
            {/* 4 */}
            <div className='text-center mb-12 md:mb-0'>
              <h2 className="uppercase mb-3 text-white text-2xl font-bold">Newsletter</h2>
              <p className='text-gray-300'>Subscribe to the weekly newsletter for all the latest updates</p>
            </div>
          </div>
        </div>
      </div>
      {/* footer bottom */}
      <div className='bg-secondary py-5 font-JosefinSans mb-20 lg:mb-0'>
        <div className="container flex items-center justify-between flex-col md:flex-row">
          <h2 className='text-white text-lg mb-4 md:mb-0 text-center lg:text-left'>Copyright © 2022 Al Mamun. All Rights Reserved.</h2>
          <div>
            <img src={require("../assets/images/footer_bottom.png")} alt="footer bottom img" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer