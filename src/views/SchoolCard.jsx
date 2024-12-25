import React, { useState } from "react";
import { Link } from "react-router-dom";
import loc from "../assets/download.jpeg";
import img from "../assets/home.jpeg";
import axios from "axios"; 
import { useSchool } from "../context/SchoolContext";
import ProvinceDropdown from "./ProvinceDropdown";


const SchoolCard = () => {
 
  useEffect(() => {
    if (selectedProvince) { // التحقق من اختيار المحافظة.
      axios
        .get(`http://172.20.10.2:5027/api/Regions/GetRegions/${selectedProvince}`) // إرسال طلب للحصول على المناطق المرتبطة بالمحافظة.
        .then((response) => { // عند نجاح الطلب:
          const regionsData = response.data.map((region) => ({ // تحويل البيانات إلى صيغة يمكن استخدامها.
            value: region.regionId, // تخزين معرّف المنطقة.
            label: region.regionName, // تخزين اسم المنطقة.
            governorateId: region.governorateId, // تخزين معرّف المحافظة المرتبطة.
          }));
          setJordanRegions(regionsData); // تخزين المناطق في الحالة.
        })
        .catch((error) => { // في حالة حدوث خطأ أثناء الطلب:
          console.error("Error fetching regions:", error); // طباعة الخطأ في وحدة التحكم.
        });
    }
  }, [selectedProvince]);

  const [ratings, setRatings] = useState(
    schools.reduce((acc, school) => {
      acc[school.id] = 5; // تقييم افتراضي لكل مدرسة
      return acc;
    }, {})
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // عدد المدارس في كل صفحة

  // تصفية المدارس بناءً على نص البحث
  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);

  // تقسيم المدارس حسب الصفحة الحالية
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSchools = filteredSchools.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleRatingChange = (schoolId, newRating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [schoolId]: newRating,
    }));
  };

  return (
    <div className="p-6 mt-14 bg-gray-100 min-h-screen">
      {/* مربع البحث */}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="ابحث عن مدرسة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border-b-4 border-blue-700 scale-100 hover:scale-105 hover:border-blue-900 rounded-md outline-none transition-all duration-300 transform"
        />
        {/* <ProvinceDropdown jordanProvinces={jordanProvinces} name={"المحافظة"} />
        <ProvinceDropdown jordanProvinces={jordanProvinces} name={"المنطقة"} /> */}
        <button className="p-2 w-28 rounded-lg bg-blue-900 scale-75 text-white hover:scale-105 transition-all duration-300 transform">
          ابحث
        </button>
      </div>
      <hr className="w-full h-2 bg-blue-900 mb-4" />

      {/* قائمة المدارس */}
      <div className="flex flex-wrap gap-4 justify-center">
        {currentSchools.map((school) => (
          <Link
            to={`/SchoolPage/${school.id}`}
            key={school.id}
            className="max-w-sm bg-white h-80 border border-body rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all duration-300 transform"
          >
            <img
              className="w-full h-48 object-cover"
              src={img}
              alt={school.name}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                 {school.name} 
              </h2>
              <p className="text-sm flex items-center text-text mb-2">
                <img src={loc} alt="location icon" className="w-6 h-6 mx-2" />
                {school.location}
              </p>
              <hr className="w-full h-1 bg-navbar" />
              <div className="mt-3 flex items-center">
                <div className="flex text-navbar">
                  <span className="text-navbar">التقييم:</span>
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        handleRatingChange(school.id, index + 1);
                      }}
                      className={`w-6 h-6 cursor-pointer ${
                        index < ratings[school.id]
                          ? "fill-current text-accent"
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
                <span className="ml-2 text-sm text-customGreen">
                  ({ratings[school.id]}/5)
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* أزرار التصفح */}
      <div className="flex justify-center items-center mt-6">
        <button className="p-3 rounded-full border-2 border-primaryButton mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 rounded-full ${
              currentPage === index + 1
                ? "bg-primaryButton text-white"
                : "bg-white text-gray-700"
            } hover:bg-primaryButton hover:text-white`}
          >
            {index + 1}
          </button>
        ))}
        <button className=" p-3 rounded-full border-2 border-primaryButton mx-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </button>
         {/* اختيار المنطقة بناءً على المحافظة */}
         
         {selectedProvince && (
                <ProvinceDropdown
                  options={jordanRegions} // قائمة المناطق المتوفرة.
                  name="المنطقة"
                  value={selectedArea} // المنطقة المختارة حاليًا.
                  onSelect={setSelectedArea} // تحديث المنطقة عند اختيارها.
                  top={true}
                />
              )} 
      </div>
    </div>
  );
};

export default SchoolCard;
