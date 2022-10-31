import React from 'react'
import { Link } from 'react-router-dom'

const Offer50 = () => {
    return (
        <div className='relative bg-[url("https://i.ibb.co/0t3rHwy/offer-50-main-bg.jpg")] h-auto lg:h-[400px] w-full py-24 bg-cover bg-no-repeat bg-center z-0'>
            <div className="absolute h-auto md:h-[400px] w-full  bg-overlay bg-[url('https://i.ibb.co/NZnPLxb/offer-50.png')] bg-no-repeat bg-center bottom-0 bg-contain z-[1]"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
                {/* 1 */}
                <div className='relative z-[2]'>
                    <img src={require("../../../assets/images/offer_wave.png")} alt="offer wave" />
                    <div className='absolute top-6 left-12 '>
                        <span className='text-heading font-Norican font-bold text-lg'>Get Up to</span>
                        <h2 className='text-4xl text-primary font-bold'>50% <br />
                            <span className='text-heading'>OFF</span>
                        </h2>
                    </div>
                </div>
                {/* 2 */}
                <div className='text-left z-10'>
                    <h3 className='font-Norican text-white text-3xl lg:text-5xl mb-4 text-shadow-lg font-bold'>Hot Fresh</h3>
                    <h1 className='font-JosefinSans text-primary uppercase text-5xl lg:text-8xl font-bold text-shadow-lg mb-5'>HotDog</h1>
                    <Link to="/menu" className='btn-primary bg-white text-heading text-lg shadow-md shadow-gray-600 shadow-custom font-JosefinSans'>Order Now</Link>
                </div>
            </div>

        </div>
    )
}

export default Offer50