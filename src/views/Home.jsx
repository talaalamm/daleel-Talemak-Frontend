import React, { useState, useEffect } from "react"; // استيراد مكونات React الأساسية مثل useState و useEffect.
import { Link } from "react-router-dom"; // استيراد Link للتنقل بين الصفحات.
import imge from "../images/1.jpg"; // استيراد صورة من الملفات المحلية.
import test from "../images/2.jpg"; // استيراد صورة أخرى.
import homes1 from "../images/homes1.jpg"; // استيراد صورة ثالثة.
import axios from "axios"; // استيراد مكتبة Axios للتعامل مع الطلبات HTTP.
import ListGovernorates from "./Listgovernorates"; // استيراد مكون لاختيار المحافظات.
import ProvinceDropdown from "./ProvinceDropdown"; // استيراد مكون لاختيار المناطق.

function Home() {
  const [searchTerm, setSearchTerm] = useState(""); // لتخزين نص البحث الذي يدخله المستخدم.
  const [currentImage, setCurrentImage] = useState(0); // لتتبع الصورة الحالية في شريط الصور المتحركة.
  const [data, setData] = useState([]); // لتخزين البيانات التي يتم جلبها من API.
  const [error, setError] = useState(null); // لتخزين الأخطاء في حال حدوثها أثناء جلب البيانات.

  const images = [homes1, test, imge]; // مصفوفة تحتوي على الصور المستخدمة في شريط الصور.
  const [jordanRegions, setJordanRegions] = useState([]); // لتخزين المناطق المرتبطة بالمحافظة.
  const [selectedProvince, setSelectedProvince] = useState(""); // لتخزين المحافظة المختارة.
  const [selectedArea, setSelectedArea] = useState(""); // لتخزين المنطقة المختارة.

  // تحميل المناطق عند اختيار محافظة معينة
  useEffect(() => {
    if (selectedProvince) { // التحقق من اختيار المحافظة.
      axios
        .get(`https://localhost:5001/api/Regions/GetRegions/${selectedProvince}`) // إرسال طلب للحصول على المناطق المرتبطة بالمحافظة.
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
  }, [selectedProvince]); // تنفيذ هذا التأثير فقط عند تغيير selectedProvince.

  // تغيير الصورة تلقائيًا كل 5 ثوانٍ
  useEffect(() => {
    const interval = setInterval(() => { // تعيين مؤقت.
      setCurrentImage((prev) => (prev + 1) % images.length); // الانتقال إلى الصورة التالية.
    }, 5000); // مدة التأخير (5000 مللي ثانية = 5 ثوانٍ).
    return () => clearInterval(interval); // تنظيف المؤقت عند إزالة المكون.
  }, [images.length]); // تنفيذ هذا التأثير فقط إذا تغير طول قائمة الصور.
 const handelsearch=()=>{
 
 }
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      {/* دائرة جانبية للزخرفة */}
      <div className="absolute top-0 left-0 w-[1000px] h-[1000px] -translate-x-1/3 -translate-y-1/4">
        <div
          className="relative w-full h-full"
          style={{
            borderRadius: "50%", // جعل الشكل دائريًا.
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // إضافة ظل للصورة.
            backgroundImage: `url(${images[currentImage]})`, // تعيين الصورة الحالية كخلفية.
            backgroundSize: "cover", // ملء الدائرة بالصورة.
            backgroundPosition: "center", // تمركز الصورة.
            transition: "transform 0.7s ease-in-out", // تأثير الانتقال عند تغيير الصورة.
            animation: "rotateImage 15s infinite linear", // تدوير الصورة بشكل دائم.
          }}
        ></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-start min-h-[calc(100vh-200px)]">
          {/* النصوص على الجانب الأيمن */}
          <div className="lg:w-1/2 text-right space-y-8 pr-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-customGreen2 leading-tight">
                عالم التعليم مليء بالفرص والتنوع
              </h1>
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-semibold">
                ابدأ رحلتك التعليمية بثقة مع دليل شامل للمدارس الخاصة في الأردن
                نساعدك في اتخاذ القرار الأفضل لمستقبل أبنائك التعليمي
              </p>
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-semibold">
                تساعدك هذه المنصة في كل ما تحتاجه لاختيار المدرسة المثالية تحت
                سقف واحد
              </p>
            </div>

            <div className="flex justify-end">
              {/* زر للتنقل إلى صفحة اختيار المدارس */}
              <Link
                to="/SchoolCard"
                className="bg-yellow-400 bg-customGreen2 hover:bg-primaryButton text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all ml-60"
              >
                ابدأ رحلتك التعليمية
              </Link>
            </div>
          </div>
        </div>

        {/* قسم البحث */}
        <div className="fixed bottom-0 left-0 right-0 bg-customGreen2 z-20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* حقل البحث */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="ابحث عن مدرسة..."
                  value={searchTerm} // النص الحالي المدخل من المستخدم.
                  onChange={(e) => setSearchTerm(e.target.value)} // تحديث النص عند تغييره.
                  className="w-full p-3 pr-12 rounded-xl border-2 border-transparent focus:border-white outline-none transition-all duration-300"
                />
                {/* أيقونة البحث */}
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {/* اختيار المحافظة */}
              <ListGovernorates
                name="المحافظة"
                value={selectedProvince} // المحافظة المختارة حاليًا.
                onSelect={(province) => {
                  setSelectedProvince(province); // تحديث المحافظة عند اختيارها.
                }}
                top={true}
              />
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
              <button className="bg-body text-lg px-4 py-2" onClick={handelsearch()}>search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;  
