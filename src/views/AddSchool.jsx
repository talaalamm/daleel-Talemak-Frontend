import React, { useState } from "react";
import { useSchool } from "../context/SchoolContext";
import write from "../images/logo.png";

const AddSchool = () => {
  const { schools, setSchools } = useSchool();
  const [alert, setAlert] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "",
    notes: "",
  });

  // قائمة المواقع
   const locations = [
    "عمان",
    "الزرقاء",
    "اربد",
    "المفرق",
    "العقبة",
    "الكرك",
    "معان ",
    "الطفيلة",
    "عجلون",
    "جرش",
    "مادبا",
    "البلقاء",
  ];

  // تحديث بيانات النموذج
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // إضافة مدرسة جديدة
  const handleSubmit = (e) => {
    e.preventDefault();
    const newSchool = {
      ...formData,
      id: schools.length + 1, // تعيين ID تلقائي
    };
    setSchools([...schools, newSchool]);

    setAlert("تمت إضافة المدرسة بنجاح!");
    setTimeout(() => setAlert(""), 5000);

    // إعادة تعيين الحقول
    setFormData({
      name: "",
      location: "",
      type: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-gray-50 py-8">
      {/* Instructions Section */}
      <div className="w-full max-w-md p-6 md:p-8">
        <div className="flex items-start mb-6">
          <img src={write} className="w-12 h-12" alt="Add School Icon" />
          <h1 className="text-3xl text-customGreen2 font-bold mr-3">
            إضافة مدرسة جديدة
          </h1>
        </div>

        <div className="space-y-4 text-gray-700">
          <p className="text-lg leading-relaxed">
            نرحب بمساهمتك في توسيع قاعدة بياناتنا التعليمية. يرجى تعبئة النموذج بدقة لضمان جودة المعلومات.
          </p>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg mb-2 text-customGreen2">إرشادات مهمة:</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>تأكد من صحة جميع المعلومات قبل الإرسال</li>
              <li>أدخل اسم المدرسة كاملاً كما هو مسجل رسمياً</li>
              <li>حدد المنطقة والمحافظة بدقة</li>
              <li>شاركنا تعليقك عن المدرسة بأن يكون واضحًا ومختصرًا</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2 text-blue-700">ملاحظات إضافية:</h2>
            <ul className="space-y-2 text-blue-600">
              <li>• سيتم مراجعة المعلومات قبل النشر</li>
              <li>• يمكنك تحديث المعلومات لاحقاً</li>
              <li>• نقدر مساهمتك في تطوير منصتنا</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-lg shadow-sm">
        {alert && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {alert}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* اسم المدرسة */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              اسم المدرسة
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="اسم المدرسة..."
              className="mt-1 block w-full p-2 outline-none border-2 border-body rounded-lg shadow-sm focus:ring-blue-500"
            />
          </div>

          {/* الموقع */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              موقع المدرسة
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block outline-none w-full py-2 px-2 border-2 border-body rounded-lg shadow-sm focus:ring-blue-500"
            >
              <option value="" disabled>
                اختيار موقع
              </option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* نوع المدرسة */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              المنطقة
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="mt-1 block outline-none w-full py-2 px-2 border-2 border-body rounded-lg shadow-sm focus:ring-blue-500"
            >
              <option value="" disabled>
                اختيار المنطقة
              </option>
              <option value="public"></option>
              <option value="private"></option>
              <option value="charter"></option>
            </select>
          </div>

          {/* ملاحظات */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              ملاحظات
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="ادخل أي تعليق عن المدرسة."
              className="mt-1 block w-full p-2 border-2 border-body rounded-lg shadow-sm focus:ring-blue-500"
            ></textarea>
          </div>

          {/* زر الإرسال */}
          <button
            type="submit"
            className="w-full py-2 px-4 hover:bg-primaryButton bg-customGreen2 text-white rounded hover:bg-green-700 focus:ring-2 focus:ring-green-500"
          >
            إضافة مدرسة
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSchool;
