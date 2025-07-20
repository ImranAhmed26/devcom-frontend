"use client";
import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { motion } from "framer-motion";
import { Navigation } from "swiper/modules";
import { Card } from "@/components/Home/Resources/Projects/Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BANNER_DATA } from "@/constants/landingPage";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NavigationBtn = () => {
  const swiper = useSwiper();

  return (
    <div className="flex gap-4 swiper-nav-btns absolute  bottom-4 left-4 z-20 ">
      <button
        onClick={() => swiper.slidePrev()}
        className="w-12 h-12 bg-gray-400/80 dark:bg-gray-800/80 rounded-full flex justify-center items-center"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="w-12 h-12 bg-gray-400/80 dark:bg-gray-800/80 rounded-full flex justify-center items-center"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default function Carousel() {
  return (
    <motion.div className=" py-0 md:px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-10">Our Past Projects</h1>
      <div className="relative max-w-xs md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-gray-300/40 dark:bg-gray-900/70 backdrop-blur-2xl rounded-xl lg:rounded-3xl drop-shadow-md overflow-hidden">
        <Swiper
          modules={[Navigation]}
          className="mySwiper"
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          speed={1000}
          effect="slide"
        >
          {BANNER_DATA.projectData.map((card, index) => (
            <SwiperSlide key={index}>
              <Card index={index} {...card} />
            </SwiperSlide>
          ))}
          <NavigationBtn />
        </Swiper>
      </div>
    </motion.div>
  );
}
