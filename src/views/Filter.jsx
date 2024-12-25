import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useSchool } from "../context/SchoolContext";
import loc from "../assets/download.jpeg";

export default function Filter() {
    const { schools } = useSchool(); // الوصول إلى المدارس من السياق
    const { searchTerm } = useParams(); // الحصول على id المدرسة من الرابط

    // حالة لتتبع تقييمات المدارس
    const [ratings, setRatings] = useState(
      schools.reduce((acc, school) => {
        acc[school.id] = 5; // تقييم افتراضي لكل مدرسة
        return acc;
      }, {})
    );
  
    // حالة لتتبع نص البحث
   
    // تصفية المدارس بناءً على نص البحث
    const filteredSchools = schools.filter((school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // تحديث التقييم عند النقر على النجوم
    const handleRatingChange = (schoolId, newRating) => {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [schoolId]: newRating,
      }));
    };
  
  return (
    <div>


  
    <div className="p-6 bg-gray-100 min-h-screen ">
      {/* مربع البحث */}
    
      {/* قائمة المدارس */}
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredSchools.map((school) => (
          <Link
            to={`/SchoolPage/${school.id}`}
            key={school.id}
            className="max-w-sm bg-white h-80 border border-gray-200 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all duration-300 transform"
          >
            {/* صورة المدرسة */}
            <img
              className="w-full h-48 object-cover"
              src={school.image}
              alt={school.name}
            />

            <div className="p-4">
              {/* اسم المدرسة */}
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {school.name}
              </h2>

              {/* موقع المدرسة */}
              <p className="text-sm flex items-center text-gray-600 mb-2">
                <img src={loc} alt="location icon" className="w-6 h-6 mx-2" />
                {school.location}
              </p>
              <hr className="w-full h-1 bg-blue-800"/>

              {/* التقييم */}
              <div className="mt-3 flex items-center">
                <div className="flex text-yellow-400">
                  <span className="text-blue-950">التقييم:</span>
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        handleRatingChange(school.id, index + 1);
                      }}
                      className={`w-6 h-6 cursor-pointer ${
                        index < ratings[school.id]
                          ? "fill-current text-yellow-400"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.99a1 1 0 00.95.69h4.181c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.286 3.99c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.286-3.99a1 1 0 00-.364-1.118L2.05 9.417c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.95-.69l1.286-3.99z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({ratings[school.id]}/5)
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

    </div>
  )
}
