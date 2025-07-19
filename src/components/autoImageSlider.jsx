import React, { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function AutoImageSlider() {



    const sliderRef = useRef();
    const [current, setCurrent] = useState(0);
    const images = [
        "herosection/image01.jpg",
        "herosection/image02.jpg",
        "herosection/image03.jpg",
        "herosection/image04.jpg",
        "herosection/image05.jpg",
        "herosection/image06.jpg",
        "herosection/image07.jpg",
        "herosection/image08.jpg",
        "herosection/image09.jpg",
    ];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: '20px',
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        fade: true,
        cssEase: 'linear',
        beforeChange: (oldIndex, newIndex) => setCurrent(newIndex),
        arrows: false,
    };
    // Custom arrow handlers
    // const goToPrev = () => sliderRef.current && sliderRef.current.slickPrev();
    // const goToNext = () => sliderRef.current && sliderRef.current.slickNext();

    return (
        // <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">

        <div className="w-full min-w-full max-w-screen-2xl h-full p-4 mb-8 mx-auto rounded-full relative">

            <Slider ref={sliderRef} {...settings}>
                {images.map((img, idx) => (
                    <div key={idx} className="relative w-full min-w-full max-w-screen-2xl h-96 rounded-full overflow-hidden flex items-center justify-center mx-auto">
                        <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-contain rounded-full transition-all duration-700 shadow-xl shadow-gray-200" />
                    </div>
                ))}
            </Slider>
            {/* Slide number indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-40 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wider">
                {current + 1} / {images.length}
            </div>
        </div>
        // </div>
    );


}