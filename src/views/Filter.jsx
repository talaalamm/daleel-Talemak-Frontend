import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ListSchool from "./school/ListSchool";
const Filter = () => {
  const location = useLocation();
  const { results, searchTerm, selectedGovernorate, selectedArea } =
    location.state || {}; // التحقق إذا كانت البيانات موجودة
  const [filteredSchools, setFilteredSchools] = useState(results || []);

  useEffect(() => {
    if (!results) {
      // إذا لم تكن هناك نتائج من الحالة، يمكن هنا تحميل المدارس الافتراضية أو عرض رسالة.
      setFilteredSchools([]);
    }
  }, [results]);

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">نتائج البحث</h1>
      {results ? (
        <ListSchool schools={results} />
      ) : (
        <p className="text-center text-gray-600 mt-10">
          لا توجد مدارس مطابقة لنتائج البحث.
        </p>
      )}
    </div>
  );
};

export default Filter;
