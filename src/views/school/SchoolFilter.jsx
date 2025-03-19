import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchFilter from "../SearchFilter";
import ListSchool from "./ListSchool";


const SchoolFilter = () => {
  const location = useLocation();

  // استلام البيانات المرسلة من الصفحة الرئيسية
  const initialResults = location.state?.results || [];

  // حالة النتائج الحالية
  const [schools, setSchools] = useState(initialResults);

  // التأكد من أن النتائج ليست فارغة
  const hasResults = schools && schools.length > 0;

  // تحديث النتائج بناءً على البحث الجديد
  const handleResults = (results) => {
    setSchools(results);
  };

  useEffect(() => {
    // تحديث النتائج إذا تم إعادة تحميل الصفحة
    if (initialResults.length > 0) {
      setSchools(initialResults);
    }
  }, [initialResults]);

  return (
    <div className="container mx-auto mt-20">
      {/* عرض محرك البحث */}
      <SearchFilter onResults={handleResults} />

      {/* عرض النتائج بناءً على البحث */}
      {hasResults ? (
        <ListSchool schools={schools} />
      ) : (
        <p className="text-center text-gray-600 mt-10">
          لا توجد مدارس مطابقة لنتائج البحث.
        </p>
      )}
    </div>
  );
};

export default SchoolFilter;
