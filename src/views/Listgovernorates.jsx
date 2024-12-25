import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; // استيراد Axios لإجراء طلبات HTTP.

function ListGovernorates({ name, onSelect, top, value,setFilter,fi, handleChange }) {
    const [governorates, setGovernorates] = useState([]); // حالة لتخزين قائمة المحافظات.
    const [isOpen, setIsOpen] = useState(false); // حالة لتحديد ما إذا كانت القائمة مفتوحة أو مغلقة.
    const [selname, setSelname] = useState(""); // لتخزين اسم المحافظة المختارة.

    useEffect(() => {
        // طلب لجلب قائمة المحافظات من API عند تحميل المكون.
        axios.get('https://react-server-k3id.onrender.com/api/GetGovernarate') // استدعاء API لجلب المحافظات.
            .then(response => { // عند نجاح الطلب:
                const governoratesData = response.data.map(governorate => ({ // تحويل البيانات إلى صيغة مناسبة.
                    value: governorate._id, // استخدام الـ id كمفتاح.
                    label: governorate.governorateName // اسم المحافظة.
                }));
                setGovernorates(governoratesData); // تخزين البيانات في الحالة.
            })
            .catch(error => { // في حالة حدوث خطأ:
                console.error('Error fetching governorates:', error); // طباعة الخطأ في وحدة التحكم.
            });
    }, []); // تشغيل التأثير مرة واحدة فقط عند تحميل المكون.

    // فتح أو غلق القائمة عند النقر.
    const toggleDropdown = () => setIsOpen(!isOpen);

    // التعامل مع اختيار المحافظة.
    const handleSelect = (option) => {
        onSelect(option); // استدعاء دالة onSelect من المكون الأب مع قيمة المحافظة المختارة.
        setIsOpen(false); // غلق القائمة بعد اختيار المحافظة.
    };

    return (
        <div className="relative w-64 mx-auto"> {/*  القائمة */}
            {/* زر فتح القائمة */}
            <button
                className="w-full p-3 bg-white  rounded-lg shadow-lg flex justify-between items-center"
                onClick={toggleDropdown} // فتح/غلق القائمة عند النقر.
            >
                <span>{selname || `اختر ${name}`}</span> {/* عرض النص الافتراضي أو اسم المحافظة المختارة. */}
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

            {/* قائمة المحافظات */}
            {isOpen && ( // عرض القائمة فقط إذا كانت مفتوحة.
                <ul className={`absolute left-0 w-full ${top === true ? "bottom-[100%]" : ""} mt-2 bg-white  z-10 shadow-lg rounded-lg border border-gray-200`}>
                    {governorates.map((governorate) => ( // تكرار المحافظات لعرضها في القائمة.
                        <li
                            key={governorate.value} // مفتاح لكل عنصر.
                            className="p-3 hover:bg-blue-500 max-h-44 overflow-y-auto hover:text-customGreen2 cursor-pointer" // نمط العنصر.
                            onClick={() => handleSelect(governorate.value) & setSelname(governorate.label)} // تعيين المحافظة المختارة وإغلاق القائمة.
                            onChange={`${fi?setFilter(governorate.value):handleChange}`} // تمرير القيمة المختارة إلى handleChange إذا كانت موجودة.
                       
                        >
                            {governorate.label} {/* اسم المحافظة. */}
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    );
}

export default ListGovernorates; // تصدير المكون لاستخدامه في مكونات أخرى.
