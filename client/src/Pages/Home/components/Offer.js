import React from 'react'
import { Link } from "react-router-dom";
const Offer = () => {
    return (
        <div className='bg-[#F7F2E2] section-padding font-JosefinSans'>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:p-0">
                    {/* 1 */}
                    <div className='bg-white p-10 flex items-center justify-between cursor-pointer rounded-md group'>
                        <div className='text-left basis-1/2 mr-1'>
                            <h2 className='text-2xl md:text-3xl font-bold mb-3'>Any day offers</h2>
                            <p className='text-lg md:text-xl capitalize mb-5'>New phenomenon burger taste</p>
                            <span className='text-secondary text-xl font-bold'>$12.90</span>
                        </div>
                        <div className=' basis-1/2'>
                            <div className='relative'>
                                <img className='w-full group-hover:scale-[1.15] transition-all easy-in-out duration-200' src={require("../../../assets/images/h1_banner1-bg.png")} alt="banner-one" />
                                <img className='w-full absolute top-4 -left-2' src={require("../../../assets/images/h1_banner1-food.png")} alt="banner-one-food" />
                            </div>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className='bg-[url("https://i.ibb.co/hXcsdd5/h1-banner2-bg.jpg")] bg-cover bg-no-repeat bg-center p-10 flex items-center justify-between cursor-pointer rounded-md group text-white'>
                        <div className='text-left basis-1/2 mr-1'>
                            <h2 className='text-2xl md:text-3xl font-bold mb-3'>Other flavors</h2>
                            <p className='text-lg md:text-xl capitalize mb-5'>Save Room. We made salats.</p>
                            <span className='text-primary text-xl font-bold'>$12.90</span>
                        </div>
                        <div className='basis-1/2'>
                            <div className='relative'>
                                <img className='w-full group-hover:scale-[1.15] transition-all easy-in-out duration-200' src={require("../../../assets/images/h1_banner2.png")} alt="banner-one" />
                                <img className='w-full absolute top-4 -left-3' src={require("../../../assets/images/h1_banner2-food.png")} alt="banner-two-food" />
                            </div>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className='bg-white p-10 flex items-center justify-between cursor-pointer rounded-md group'>
                        <div className='text-left basis-1/2 mr-1'>
                            <h2 className='text-2xl md:text-3xl font-bold mb-3'>Find a FoodU store near you</h2>
                            <Link to="/contact" className='text-primary text-lg md:text-xl font-bold'>Contact Us</Link>
                        </div>
                        <div className=' basis-1/2'>
                            <div className='relative'>
                                <img className='w-full group-hover:scale-[1.15] transition-all easy-in-out duration-200' src={require("../../../assets/images/h1_banner2.png")} alt="banner-one" />
                                <img className='w-full absolute top-4 -left-2' src={require("../../../assets/images/h1_banner3-map.png")} alt="banner-three-map" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Offer