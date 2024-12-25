import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/home.jpeg";

function ListSchool({ schools }) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 mt-32 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {schools.map((school) => (
          <Link
            to={`/SchoolPage/${school._id}`}
            key={school._id}
            className="max-w-sm bg-white h-80 border text-customRed border-body rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all duration-300 transform"
          >
            <img
              className="w-full h-48 object-cover"
              src={img}
              alt={school.schoolName}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {school.schoolName}
              </h2>
              <p className="text-sm flex items-center text-text mb-2">
                {school.governorateName}
              </p>
              <hr className="w-full h-1 bg-navbar" />
              <div className="mt-3 flex items-center">
                {/* هنا يمكنك إضافة التقييمات إذا كانت متوفرة */}
                {/* على سبيل المثال، عرض النجوم وعدد المقيّمين */}
                <p className="text-sm text-gray-500 ml-2">تقييمات</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListSchool;
