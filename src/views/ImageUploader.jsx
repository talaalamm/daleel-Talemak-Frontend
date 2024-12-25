import React, { useState } from "react";

const ImageUploader = () => {
  const [imageFile, setImageFile] = useState(null); // لتخزين ملف الصورة المرفوع
  const [imagePreview, setImagePreview] = useState(null); // لمعاينة الصورة قبل التأكيد

  // دالة لمعالجة رفع الصورة
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // إنشاء رابط معاينة مؤقت
    }
  };

  // دالة لمسح الصورة المرفوعة
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="flex-1 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100">
      {!imageFile ? (
        <>
          {/* واجهة رفع الصورة */}
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label htmlFor="imageUpload" className="block cursor-pointer">
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
                d="M3 16l3-3m0 0l3 3m-3-3v9m0-9a9 9 0 110-6.75M21 21v-6a9 9 0 10-18 0v6"
              />
            </svg>
            <span className="text-gray-500">رفع صورة</span>
          </label>
        </>
      ) : (
        <>
          {/* عرض الصورة بعد الرفع */}
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRemoveImage}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              حذف الصورة
            </button>
            <button
              onClick={() => alert("تم تأكيد الصورة!")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              تأكيد الصورة
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
