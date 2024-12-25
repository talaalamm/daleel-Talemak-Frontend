import React, { useState, useEffect } from "react"; // استيراد useState و useEffect من React
import axios from "axios"; // استيراد axios للتعامل مع الطلبات HTTP
import write from "../../images/logo.png"; // استيراد صورة الشعار
import ProvinceDropdown from "../ProvinceDropdown";
import ListGovernorates from "../Listgovernorates";
const AddSchool = () => {
  const [alert, setAlert] = useState(""); // حالة لعرض رسالة التنبيه للمستخدم
  const [formData, setFormData] = useState({ // حالة لتخزين بيانات النموذج
    schoolName: "", // اسم المدرسة
    regionName: "", // المنطقة
    governorateName:""
    //address: "", //اذا عندك حقل في قاعدة البيانت وحقل في الفرم اسمه address
  });
  

  const [jordanRegions, setJordanRegions] = useState([]); // لتخزين البيانات الخاصة بالمناطق
  const [selectedProvince, setSelectedProvince] = useState(""); // للمحافظة المختارة
  const [selectedArea, setSelectedArea] = useState(""); // للمنطقة المختارة
  
  // تحميل المناطق عند اختيار محافظة معينة
  useEffect(() => {
    if (selectedProvince) { // التحقق من اختيار المحافظة.
      axios
        .get(`https://react-server-k3id.onrender.com//api/Regions/GetRegions/${selectedProvince}`) // إرسال طلب للحصول على المناطق المرتبطة بالمحافظة.
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

  const handleChange = (e) => { // دالة التعامل مع التغيير في الحقول
    const { name, value } = e.target; // استخراج الاسم والقيمة من الحدث
    setFormData((prevFormData) => ({ // تحديث حالة بيانات النموذج
      ...prevFormData,
      [name]: value, // تحديث القيمة للخاصية المناسبة
    }));
  };

  const handleSubmit = async (e) => { // دالة التعامل مع إرسال النموذج
    e.preventDefault(); // منع إعادة تحميل الصفحة عند إرسال النموذج
    try {
      const response = await axios.post( // إرسال الطلب لإضافة مدرسة جديدة
        "https://react-server-k3id.onrender.com/api/Schools/CreateSchool",
        formData // إرسال بيانات النموذج
      );
      setAlert("تم إضافة المدرسة بنجاح!"); // عرض رسالة النجاح
      setFormData({ schoolName: "", regionName: "",governorateName:"" }); // إعادة تعيين النموذج بعد الإرسال
      //adress: "" // اذا عندك حقل في قاعدة البيانت وحقل في الفرم اسمه address
      
      // إخفاء الرسالة بعد 5 ثوانٍ
      setTimeout(() => {
        setAlert(""); // إخفاء رسالة التنبيه
      }, 5000);
      
    } catch (error) {
      console.error("Error adding school:", error.response?.data?.message || error.message); // في حال حدوث خطأ
      setAlert("حدث خطأ أثناء إضافة المدرسة. حاول مرة أخرى."); // عرض رسالة الخطأ
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-gray-50 py-8"> {/* الحاوية الرئيسية للمحتوى */}
      <div className="w-full max-w-md p-6 md:p-8"> {/* الجزء العلوي من الصفحة */}
        <div className="flex items-start mb-6"> {/* رأس الصفحة */}
          <img src={write} className="w-12 h-12" alt="Add School Icon" /> {/* عرض الشعار */}
          <h1 className="text-3xl text-customGreen2 font-bold mr-3"> {/* عنوان الصفحة */}
            إضافة مدرسة جديدة
          </h1>
        </div>

        <div className="space-y-4 text-gray-700"> 
          <p className="text-lg leading-relaxed"> 
            نرحب بمساهمتك في توسيع قاعدة بياناتنا التعليمية. يرجى تعبئة النموذج بدقة لضمان جودة المعلومات.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-sm"> {/* صندوق الإرشادات */}
            <h2 className="font-semibold text-lg mb-2 text-customGreen2">إرشادات مهمة:</h2>
            <ul className="space-y-2 list-disc list-inside"> {/* قائمة الإرشادات */}
              <li>تأكد من صحة جميع المعلومات قبل الإرسال</li>
              <li>أدخل اسم المدرسة كاملاً كما هو مسجل رسمياً</li>
              <li>حدد المنطقة والمحافظة بدقة</li>
              <li>شاركنا تعليقك عن المدرسة بأن يكون واضحًا ومختصرًا</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-lg shadow-sm"> 
        {alert && ( // عرض رسالة التنبيه إذا كانت موجودة
          <div className="bg-green-50 border border-green-200 text-customGreen px-4 py-3 rounded-lg mb-6">
            {alert} {/* عرض الرسالة */}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6"> {/* نموذج إضافة المدرسة */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">اسم المدرسة</label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="اسم المدرسة..."
              className="mt-1 block w-full p-2 outline-none border-2 border-body rounded-lg shadow-sm focus:ring-blue-500"
            />
          </div>
       
          <ListGovernorates
                name="governorateName"
                id={governorateName}
                value={selectedProvince} // المحافظة المختارة حاليًا.
                onSelect={(province) => {
                  setSelectedProvince(province); // تحديث المحافظة عند اختيارها.
                }}
              />
        {selectedProvince && (
                <ProvinceDropdown
                  options={jordanRegions} // قائمة المناطق المتوفرة.
                  id={regionName}
                  name="regionName"
                  value={selectedArea} // المنطقة المختارة حاليًا.
                  onSelect={setSelectedArea} // تحديث المنطقة عند اختيارها.
                />
              )}
          {/* اذا تبي اضافة عنوان المدرسة ان كان يوجد */}
          {/* <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">عنوان المدرسة</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="عنوان المدرسة ..."
              className="mt-1 block w-full p-2 outline-none border-2 border-body rounded-lg shadow-sm focus:ring-blue-500"
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-navbar text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            أضف المدرسة
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSchool; // تصدير المكون لإعادة استخدامه
