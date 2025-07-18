import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useEffect, useState } from "react"
import axios from "axios";

export default function ReviewsCarousel() {
    const [reviews, setReviews] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const settings = {
        // dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        speed: 6000,
        autoplaySpeed: 4000,
        cssEase: "linear",
        arrows: false
    };

    useEffect(() => {
        try {
            axios.get(import.meta.env.VITE_API_BASE_URL + '/api/reviews/all'
                // axios.get(import.meta.env.VITE_API_BASE_URL + '/api/reviews/',
                // {
                //     headers: {
                //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
                //         'Content-Type': 'application/json'
                //     }
                // }
            )
                .then((response) => {
                    setReviews(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {

                })
        } catch (error) {
            console.log(error);
        }
    }, [])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const url = import.meta.env.VITE_API_BASE_URL + '/api/reviews/';
    //         console.log("Fetching from:", url);

    //         try {
    //             const response = await axios.get(url, {
    //                 headers: {
    //                     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             });
    //             console.log("Reviews fetched:", response.data);
    //             setReviews(response.data);
    //         } catch (error) {
    //             console.error("Fetch error:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // console.log(reviews);
    return (
        <>
            <div className="w-[1600px] h-[380px] bg-accent/5 rounded-2xl shadow-xl px-4  p-6 mt-4 mb-1">
                <Slider {...settings} className="-mx-3 " >
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-white/70 rounded-xl shadow-xl p-5 mx-3 w-[280px] h-[340px] flex-shrink-0 snap-center hover:shadow-lg transition-all duration-200"
                        >
                            {/* Review Header with User Info */}
                            <div className="flex flex-col justify-center items-center mb-4">
                                {review?.userImage && (
                                    <img
                                        src={review.userImage}
                                        alt={review?.name || "User"}
                                        className="w-12 h-12  rounded-full object-cover mr-3"
                                    />
                                )}
                                <div className="flex-1 justify-center items-center">
                                    <h4 className=" text-accent font-medium text-lg">
                                        {review?.name || "Anonymous"}
                                    </h4>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <div className="flex items-center justify-between text-2xl text-yellow-400">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star}>
                                                    {star <= (review?.rating || 0) ? '★' : '☆'}
                                                </span>
                                            ))}
                                            <p className="text-gray-500 font-bold text-lg ml-2">({review?.rating})</p>

                                        </div>
                                        <span className="text-gray-500 text-sm">


                                            {new Date(review?.reviewDate).toDateString().split(' ').slice(1).join('-')}

                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Review Text Content */}
                            <div className="mb-4 ">
                                <p className="text-gray-600 leading-relaxed line-clamp-4">
                                    {review?.reviewText}
                                </p>
                            </div>

                            {/* Review Images Gallery */}
                            {/* {review?.reviewImages?.length > 0 && (
                            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                                {review.reviewImages.map((img, imgIndex) => (
                                    <img
                                        key={imgIndex}
                                        src={img}
                                        alt={`Review ${index} image ${imgIndex}`}
                                        className="h-20 rounded object-cover flex-shrink-0"
                                    />
                                ))}
                            </div>
                        )} */}
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}