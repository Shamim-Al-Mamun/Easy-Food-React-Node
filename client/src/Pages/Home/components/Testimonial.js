import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";
import { AiFillStar } from "react-icons/ai";
import { useAllReviewQuery } from "../../../store/services/productServices";
import ReactStars from "react-rating-stars-component";

const Testimonial = () => {
  const { data } = useAllReviewQuery();
  return (
    <div className="font-JosefinSans section-padding bg-light-gray">
      <div className="container">
        <h2 className="section-title text-4xl md:text-5xl text-center capitalize">
          What our customer says{" "}
        </h2>

        {/* slider */}
        <Swiper
          slidesPerView={
            window.innerWidth < 768
              ? 1
                ? window.innerWidth < 1024
                : 2
                ? window.innerWidth < 1280
                : 3
              : 3
          }
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {data?.allReview
            .slice(0, 8)
            .map((review, index) => (
              <SwiperSlide>
                <div
                  className="bg-white p-7 rounded-xl  min-h-[330px]"
                  key={index}
                >
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div className="basis-1/5">
                      <img
                        className="w-20 rounded-full h-16"
                        src={review?.user?.profilePic}
                        alt="avatar"
                      />
                    </div>
                    <div className="text-left basis-4/5">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl text-heading font-bold capitalize">
                          {review?.fullname}
                        </h2>
                        <div className="flex items-center justify-center gap-1 text-primary text-xl">
                          <ReactStars
                            count={5}
                            value={review?.ratingStar}
                            edit={false}
                            size={24}
                            isHalf={true}
                            fullIcon={<AiFillStar />}
                            activeColor="#ffd700"
                          />
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm font-semibold">
                        {review?.user?.role === "user" && "User"}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-lg text-left">
                    {review?.reviewText}
                  </p>
                </div>
              </SwiperSlide>
            ))
            .reverse()}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
