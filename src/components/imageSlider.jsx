import { useState, useEffect } from "react";

export default function ImageSlider(props) {
    const images = props.images;
    const [currentIndex, setCurrentIndex] = useState(0);


    // Auto-slide effect
    useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <div className="w-[500px] h-[600px] flex items-center justify-center bg-gray-100">
                <span className="text-gray-500">No images available</span>
            </div>
        );
    }

    return (
        <div className="w-[90%] md:w-[500px] h-[600px] ">
            <img
                src={images[currentIndex]}
                className="w-[500px] md:w-full h-[400px] object-cover rounded-2xl"
                alt="missing main image.."
            />
            <div className="w-full h-[100px]  flex justify-center items-center">
                {images.map((image, index) => {
                    return (
                        <img
                            key={index}
                            className={
                                "w-[90px] h-[90px] m-2 rounded-3xl object-cover cursor-pointer " +
                                (index === currentIndex ? "border-2 border-yellow-500" : "")
                            }
                            src={image}
                            alt="missing thumbnail.."
                            onClick={() => {
                                setCurrentIndex(index);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
