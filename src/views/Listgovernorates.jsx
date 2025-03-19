import React, { useEffect, useState } from "react";
import axios from "axios";

function ListGovernorates({ name, onSelect, top, setFilter, handleChange }) {
  const [governorates, setGovernorates] = useState([]); // حالة لتخزين قائمة المحافظات.
  const [isOpen, setIsOpen] = useState(false); // حالة لتحديد ما إذا كانت القائمة مفتوحة أو مغلقة.
  const [selname, setSelname] = useState(""); // لتخزين اسم المحافظة المختارة.
  useEffect(() => {
    // طلب لجلب قائمة المحافظات من API عند تحميل المكون.
    axios
      .get("http://localhost:5027/api/Governorate/GetGovernarate")
      .then((response) => {
        const governoratesData = response.data.map((governorate) => ({
          value: governorate.governorateId,
          label: governorate.governorateName,
        }));
        setGovernorates(governoratesData);
      })
      .catch((error) => {
        console.error("Error fetching governorates:", error);
      });
  }, []); // تشغيل التأثير مرة واحدة فقط عند تحميل المكون.

  // فتح أو غلق القائمة عند النقر.
  const toggleDropdown = () => setIsOpen(!isOpen);

  // التعامل مع اختيار المحافظة.
  const handleSelect = (governorate) => {
    setSelname(governorate.label); // تحديث اسم المحافظة المختارة.
    setIsOpen(false); // غلق القائمة.
    onSelect(governorate.label); // استدعاء الوظيفة الممررة من المكون الأب.

    if (setFilter) setFilter(governorate.value); // تمرير القيمة إلى setFilter إذا كانت موجودة.
    if (handleChange) handleChange(governorate.value); // تمرير القيمة إلى handleChange إذا كانت موجودة.
  };

  return (
    <div className="relative w-64 mx-auto">
      {/* زر فتح القائمة */}
      <button
        className="w-full p-3 bg-white rounded-lg shadow-lg flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span>{selname || `اختر ${name}`}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* قائمة المحافظات */}
      {isOpen && (
        <ul
          className={`absolute left-0 w-full ${
            top === true ? "bottom-[100%]" : "mt-2"
          } bg-white z-10 shadow-lg rounded-lg border border-gray-200 max-h-44 overflow-y-auto`}
        >
          {governorates.map((governorate) => (
            <li
              key={governorate.value}
              className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => handleSelect(governorate)}
            >
              {governorate.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListGovernorates;
