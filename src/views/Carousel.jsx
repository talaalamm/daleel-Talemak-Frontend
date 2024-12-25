import React from "react";
import Slider from "react-slick";
import im from "../images/about4.png";
import im2 from "../images/about3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// السهم التالي
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-blue-600  p-2 rounded-full cursor-pointer shadow-xl shadow-black z-10"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-90deg-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708z"
        />
      </svg>
    </div>
  );
};

// السهم السابق
const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute  bottom-28   transform -translate-y-1/2 bg-black z-1000 text-blue-600  p-2 rounded-full cursor-pointer shadow-lg z-100 left-10"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-90deg-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708z"
        />
      </svg>
    </div>
  );
};

const Carousel = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />, // استخدام السهم التالي
    prevArrow: <PrevArrow />, // استخدام السهم السابق
  };

  return (
    <div
      className=" curser    relative   "
      style={{}}
    >
      {/* ضبط الحاوية على نصف العرض والطول */}
      <Slider {...settings}>
        <div>
          <img
            src={im}
            alt="Image 1"
            className="w-full h-1/2 object-cover z-0 rounded-lg "
          />
        </div>
        <div>
          <img
            src={im2}
            alt="Image 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <img
            src={im}
            alt="Image 3"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <img
            src={im}
            alt="Image 4"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
