import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import imge from "../images/1.jpg";
import test from "../images/2.jpg";
import homes1 from "../images/homes1.jpg";
import SearchFilterH from "./SearchFilterH";



function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [IN, setIN] = useState(false); // إضافة حالة لتفعيل التنقل
  const images = [homes1, test, imge];
  const navigate = useNavigate();

  // تغيير الصورة كل 3 ثوانٍ
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleResults = (results) => {
    console.log("Results:", results);
  };

  // تعديل handleSearch
 const handleSearch = (searchTerm, selectedGovernorate, selectedArea) => {
   const queryParams = new URLSearchParams();

   // إضافة الكلمة المفتاحية إذا كانت موجودة
   if (searchTerm) {
     queryParams.append("searchTerm", searchTerm);
   }

   // إضافة المحافظة إذا كانت موجودة
   if (selectedGovernorate) {
     queryParams.append("selectedGovernorate", selectedGovernorate);
   }

   // إضافة المنطقة إذا كانت موجودة
   if (selectedArea) {
     queryParams.append("selectedArea", selectedArea);
   }

   // التنقل إلى صفحة SchoolFilter مع جميع المعلمات
   navigate(`/Filter?${queryParams.toString()}`, {
     state: {
       searchTerm,
       selectedGovernorate,
       selectedArea,
     },
   });
   
 };


  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-[1100px] h-[1100px] -translate-x-1/3 -translate-y-1/4">
        <div
          className="relative w-full h-full"
          style={{
            borderRadius: "50%",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backgroundImage: `url(${images[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform 0.7s ease-in-out",
            animation: "rotateImage 15s infinite linear",
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-start min-h-[calc(100vh-200px)]">
          <div className="lg:w-1/2 text-right space-y-8 pr-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-cairo font-extrabold text-bluee leading-tight ">
                عالم التعليم مليء بالفرص والتنوع
              </h1>
              <p className="text-bluee text-lg md:text-2xl leading-relaxed font-cairo text-10xl ">
                ابدأ رحلتك التعليمية بثقة مع دليل شامل للمدارس الخاصة في الأردن
                نساعدك في اتخاذ القرار الأفضل لمستقبل أبنائك التعليمي
              </p>
            </div>

            <div className="flex justify-end">
              <Link
                to="/SchoolFilter"
                
                className="bg-yellow-400 bg-redd hover:bg-bluee text-white font-cairo font-bold py-3 px-6 rounded-lg shadow-lg transition-all ml-60"
              >
                ابدأ رحلتك التعليمية
              </Link>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-bluee z-20">
          <div className="container m-auto font-cairo ">
            <SearchFilterH
              onResults={handleResults}
              handleSearch={handleSearch}

            />
            
          </div>
        </div>
      </div>
      
    </div>
    
  );
}

export default Home;
