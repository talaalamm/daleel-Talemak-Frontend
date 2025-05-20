import React, { useState, useEffect } from "react";
import location from "../../assets/download.png";

import axios from "axios";
import { Link } from "react-router-dom";
import img from "../../assets/home.jpeg";
import img2 from "../../assets/home2.jpeg";
import img3 from "../../assets/home3.jpeg";

import ListGovernorates from "../Listgovernorates";
function ListSchool({ schools }) {
  const [ratings, setRatings] = useState({}); // تخزين التقييمات باستخدام ID المدرسة كمفتاح

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsData = {}; // كائن لتخزين التقييمات للمدارس

        // مرور على جميع المدارس وإرسال طلب للحصول على التقييم لكل مدرسة
        for (const school of schools) {
          try {
            const response = await axios.get(
              `http://localhost:5027/api/Rate/AverageRating/${school.schoolId}`
            );
            if (response.data && response.data.averageRating) {
              ratingsData[school.schoolId] = response.data.averageRating;
            } else {
              ratingsData[school.schoolId] = 0; // لا توجد تقييمات
            }
          } catch (error) {
            console.error(
              `Error fetching rating for school ${school.schoolId}:`,
              error
            );
            ratingsData[school.schoolId] = 0; // في حال حدوث خطأ
          }

        }
        console.log(ratingsData);
        setRatings(ratingsData); // تحديث الحالة بالتقييمات
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    if (schools.length > 0) {
      fetchRatings(); // جلب التقييمات عند تحميل المدارس
    }
  }, [schools]);

  function renderStars(rating) {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            {/* {i < rating ? '★' : '☆'} */}
            <svg
              key={i}
              className={`h-6 w-6 cursor-pointer ${i < rating
                ? "fill-current text-accent"
                : "text-white "
                }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.99a1 1 0 00.95.69h4.181c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.286 3.99c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.286-3.99a1 1 0 00-.364-1.118L2.05 9.417c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.95-.69l1.286-3.99z" />
            </svg>
          </span>
        ))}
      </div>
    );
  }




  return (
    <div className="">
      <div className="  gap-4 grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5  justify-center ">
        {schools.length>0?(<>
            {schools.map((school) => (
          <Link
            to={`/SchoolPage/${school.schoolId}`}
            key={school.schoolId}
            className="relative max-w-sm bg-white h-96 border border-redd rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all duration-300 transform"
          >
            <img
              className="w-full h-48 object-cover"
              src={img2}
              alt={school.schoolName}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold  text-center mb-2 font-cairo text-bluee">
                {school.schoolName}
              </h2>
              <p className="text-sm  text-bluee flex items-center justify-center  mb-4  font-bold">
                {school.governorateName}
              </p>
              <hr className="w-full h-1 bg-gray-200 mb-4 " />
              <div className="text-center text-bluee">
                {school.region.governorateId.governorateName}
                {school.region.regionName}

              </div>
              <br />

              <div className="flex items-center justify-center">
                { school.ratings.length > 0 ? (
                  <div className="flex items-center">
                    {renderStars(school.ratings[0].rating) || " لا يوجد تقييم"}
                  </div>
                ) : (<p>
                  لا يوجد تقييم
                </p>)}
                {/* عرض النجوم حسب قيمة r.rating */}






              </div>
            </div>
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
              {school.type}
            </div>
          </Link>
        ))}
        </>)
        :(<h1> لاتوجد مدارس</h1>)}
    
      </div>
    </div>
  );
}

export default ListSchool;
