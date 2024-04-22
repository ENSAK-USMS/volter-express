import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import package_arrived from '../assets/package_arrived.svg';
import location_tracking from '../assets/location_tracking.svg';
import delivery_address from '../assets/delivery_address.svg';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="p-4 text-center">
                <h2>Package Arrived</h2>
                <p>The package will arrive at the right time.</p>
                <img src={package_arrived} width={400} height={300} alt="Package arrived" />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="p-4 text-center">
                <h2>Location Tracking</h2>
                <p>The user can track his order in real-time.</p>
                <img src={location_tracking} width={400} height={300} alt="Location tracking" />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="p-4 text-center">
                <h2>Delivery Address</h2>
                <p>The selection of your current location is easy using new technologies.</p>
                <img src={delivery_address} width={400} height={300} alt="Delivery address" />
            </div>
        </SwiperSlide>

      </Swiper>
    </>
  );
}
