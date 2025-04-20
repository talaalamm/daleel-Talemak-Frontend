import { useState, useEffect, useRef } from "react"; // استيراد useState و useEffect و useRef من React

function ProvinceDropdown({ options, name, top, value, onSelect }) {
  const [isOpen, setIsOpen] = useState(false); // حالة لتحديد ما إذا كانت القائمة مفتوحة.
  const dropdownRef = useRef(null); // إنشاء مرجع للمكون لإغلاق القائمة عند النقر خارجها.
  const [selname, setSelname] = useState(value || ""); // لتخزين اسم المنطقة المختارة.

  const toggleDropdown = () => setIsOpen(!isOpen); // تغيير حالة القائمة بين الفتح والإغلاق.

  const handleSelect = (option) => {
    setSelname(option.label); // تحديث اسم المنطقة المختارة.
    onSelect(option); // استدعاء دالة onSelect من المكون الأب مع قيمة المنطقة المختارة.
    setIsOpen(false); // إغلاق القائمة بعد اختيار المنطقة.
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // إغلاق القائمة عند النقر خارجها.
    }
  };

  useEffect(() => {
    // إضافة مستمع للنقر على المستند (document).
    document.addEventListener("click", handleClickOutside);
    return () => {
      // إزالة المستمع عند تفكيك المكون.
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // التأثير يتم فقط عند تحميل المكون.

  return (
    <div ref={dropdownRef} className="relative w-64 mx-auto"> {/* حاوية القائمة */}
      {/* زر فتح/غلق القائمة */}
      <button
        className="w-full p-3 bg-white text-blue-950 rounded-lg shadow-lg flex justify-between items-center"
        onClick={toggleDropdown} // تغيير حالة القائمة عند النقر على الزر.
      >
        <span>{selname || `اختر ${name}`}</span> {/* عرض اسم المنطقة المختارة أو النص الافتراضي */}
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`} // أيقونة السهم مع التحريك عند فتح القائمة.
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7" // رسم السهم.
          />
        </svg>
      </button>

      {/* قائمة الخيارات */}
      {isOpen && (
        <ul className={`absolute left-0 w-full ${top === true ? "bottom-[100%]" : ""} mt-2 bg-white  z-10 shadow-lg rounded-lg border border-gray-200`}>
          {options.map((option) => (
            <li
              key={option.value} // تعيين قيمة المفتاح لكل عنصر في القائمة.
              className="p-3 hover:bg-blue-500 hover:text-bluee cursor-pointer"
              onClick={() => handleSelect(option.label)} // عند النقر على الخيار، يتم تحديده.
            >
              {option.label} {/* عرض اسم المنطقة. */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProvinceDropdown; // تصدير المكون لاستخدامه في مكونات أخرى.
