import React, { useState, useEffect } from "react";
import location from "../../assets/download.jpeg";

import axios from "axios";
import { Link } from "react-router-dom";
import img from "../../assets/home.jpeg";
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
              `http://localhost:5027/api/StarRating/AverageRating/${school.schoolId}`
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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) { 
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${i <= rating ? "text-accent" : "text-white"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927a1 1 0 011.902 0l1.502 4.636a1 1 0 00.95.69h4.908a1 1 0 01.592 1.806l-3.974 2.883a1 1 0 00-.363 1.118l1.502 4.636a1 1 0 01-1.54 1.118l-3.974-2.883a1 1 0 00-1.176 0l-3.974 2.883a1 1 0 01-1.54-1.118l1.502-4.636a1 1 0 00-.363-1.118L2.049 9.059a1 1 0 01.592-1.806h4.908a1 1 0 00.95-.69l1.502-4.636z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="">
      <div className="  gap-4 grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5  justify-center ">
        {schools.map((school) => (
          <Link
            to={`/SchoolPage/${school.schoolId}`}
            key={school.schoolId}
            className="relative max-w-sm bg-white h-96 border border-customGreen rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all duration-300 transform"
          >
            <img
              className="w-full h-48 object-cover"
              src={img}
              alt={school.schoolName}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold  text-center mb-2 font-cairo">
                {school.schoolName}
              </h2>
              <p className="text-sm flex items-center justify-center  mb-4  font-bold">
                {school.governorateName}
              </p>
              <hr className="w-full h-1 bg-gray-200 mb-4 " />
              <div className="text-center">
                {school.region.governorateId.governorateName}
                {school.region.regionName}
              </div>
              <br />

              <div className="flex items-center justify-center">
                {ratings[school.schoolId] !== undefined ? (
                  <div className="flex items-center">
                    {renderStars(ratings[school.schoolId])}
                    <span className="ml-2 text-sm text-gray-600">
                      ({ratings[school.schoolId]} نجوم)
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">لا توجد تقييمات بعد</p>
                )}
              </div>
            </div>
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
              {school.type}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListSchool;
