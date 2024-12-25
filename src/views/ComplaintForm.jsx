import React, { useState, useEffect } from "react";
import { useSchool } from "../context/SchoolContext"; // تأكد من أن schools تحتوي على بيانات المدارس
import ImageUploader from "./ImageUploader";
const ComplaintForm = () => {
  // حالة البحث عن النص المدخل
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [complaint, setComplaint] = useState("");
  const { schools } = useSchool(); // الوصول إلى المدارس من السياق
  const [videoFile, setVideoFile] = useState(null); // لتخزين ملف الفيديو الذي تم رفعه
  const [videoPreview, setVideoPreview] = useState(null); // لمعاينة الفيديو قبل التأكيد

  // دالة لمعالجة رفع الفيديو
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file)); // إنشاء رابط معاينة مؤقت
    }
  };

  // دالة لمسح الفيديو المرفوع
  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
  };

  // تحديث المدارس المتوافقة مع النص المدخل
  useEffect(() => {
    if (searchTerm) {
      const filtered = schools.filter((school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSchools(filtered);
    } else {
      setFilteredSchools([]); // إذا كان البحث فارغًا، لا يتم عرض المدارس
    }
  }, [searchTerm, schools]);

  // التعامل مع تغيير النص في حقل البحث
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // التعامل مع اختيار المدرسة
  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setSearchTerm(school.name); // تحديث النص ليظهر اسم المدرسة
    setFilteredSchools([]); // إخفاء المقترحات بعد اختيار المدرسة
  };

  // التعامل مع تقديم الشكوى
  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إرسال البيانات إلى السيرفر أو حفظها في الحالة
    alert(`تم تقديم الشكوى للمدرسة: ${selectedSchool.name}`);
    setComplaint(""); // إعادة تعيين الشكوى بعد التقديم
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-gray-50 shadow-lg rounded-b-lg p-6 mt-4">
        <h2 className="text-blue-900 text-xl font-bold mb-6">تقديم شكوى</h2>

        {/* حقل البحث عن المدرسة */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-2">
            بحث عن المدرسة:
          </label>
          <input
            type="text"
            placeholder="ابحث عن اسم المدرسة"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3  border-2 border-body text-navbar outline-none  rounded-lg shadow-md transition-transform duration-300 scale-95  hover:scale-100 focus:ring-blue-500"
          />

          {/* عرض المدارس المتوافقة مع البحث داخل نفس مربع البحث */}
          {filteredSchools.length > 0 && !selectedSchool && (
            <div className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-10">
              <ul className="max-h-40 overflow-y-auto">
                {filteredSchools.map((school) => (
                  <li
                    key={school.id}
                    className="p-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSchoolSelect(school)}
                  >
                    {school.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* عرض المدرسة المحددة */}
        {selectedSchool && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">المدرسة المحددة:</h3>
            <p className="bg-white rounded-md shadow-md w-20">
              <strong>اسم المدرسة:</strong> {selectedSchool.name}
            </p>
            <p>
              <strong>الموقع:</strong> {selectedSchool.location}
            </p>
            <p>
              <strong>النوع:</strong> {selectedSchool.type}
            </p>
          </div>
        )}

        {/* الحقول الأخرى */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              اكتب الشكوى أو المشكلة التي تواجهها
            </label>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="انقر هنا للكتابة..."
              rows="4"
              className="w-full  border-2 border-body text-navbar outline-none  rounded-lg shadow-md transition-transform duration-300 scale-95 hover:scale-100 p-3 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* رفع الصورة */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              يمكنك إرسال دليل للمشكلة (صورة أو فيديو):
            </label>
            <div className="flex gap-4">
              {/* رفع صورة */}
              <ImageUploader />
              {/* رفع فيديو */}
              <div className="flex-1 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100">
                {!videoFile ? (
                  <>
                    {/* واجهة رفع الفيديو */}
                    <input
                      type="file"
                      accept="video/*"
                      id="videoUpload"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="videoUpload"
                      className="block cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-10 w-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132a1 1 0 00-1.555.832v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6v12m16-6H4"
                        />
                      </svg>
                      <span className="text-gray-500">رفع فيديو</span>
                    </label>
                  </>
                ) : (
                  <>
                    {/* عرض الفيديو بعد الرفع */}
                    <video
                      src={videoPreview}
                      controls
                      className="w-full h-48 mb-4 rounded-lg border"
                    />
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleRemoveVideo}
                        className="px-4 py-2 bg-red-600 text-navbar rounded-lg"
                      >
                        حذف الفيديو
                      </button>
                      <button
                        onClick={() => alert("تم تأكيد الفيديو!")}
                        className="px-4 py-2 bg-green-600 text-navbar rounded-lg"
                      >
                        تأكيد الفيديو
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* الأزرار */}
        <div className="mt-6 flex justify-between">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            إرسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
