import React, { useState } from "react";
import { useParams } from "react-router-dom";
import user from "../images/user.png";
import mes from "../images/mes.jpg";
import schoolImage from "../assets/Logo.jpeg";
import location from "../assets/download.jpeg";
{/*import sa from "../assets/alarmclock.png";*/}
import { useComments } from "../context/CommentsProvider";

const SchoolPage = () => {
  const schoolsData = [
    {
      id: '1',
      name: "مدرسة المستقبل",
      address: " ",
      rating: 4.5,
    },
    {
      id: '2',
      name: "مدرسة التفوق",
      address: " ",
      rating: 4.0,
    },
  ];
  
  const { id } = useParams(); // الحصول على id المدرسة من الرابط
  const { comments, addComment } = useComments(); // استخدام Context لإضافة التعليقات
  const school = schoolsData.find((s) => s.id === String(id)); // البحث عن بيانات المدرسة بناءً على id

  // حالة لإضافة تعليق جديد
  const [newComment, setNewComment] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState(school.rating);

  if (!school) {
    return <div className="text-center text-red-500">لم يتم العثور على المدرسة المطلوبة.</div>;
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment({ name: "ولي أمر جديد", text: newComment }); // استخدام addComment من الـ Context
      setNewComment("");
      setIsPopupOpen(false); // إغلاق النافذة
    }
  };
  // دالة لعرض النجوم حسب التقييم
  const renderStars = (rating, setRating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          onClick={() => setRating(i + 1)}
          className={`w-6 h-6 ${i < Math.floor(rating) ? "fill-current text-accent" : "text-gray-300"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.99a1 1 0 00.95.69h4.181c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.286 3.99c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.286-3.99a1 1 0 00-.364-1.118L2.05 9.417c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.95-.69l1.286-3.99z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="relative  w-full overflow-x-hidden">
      <div className="bg-white mt-16 mx-8 ">
<div className="mb-16 ">
<div className="grid grid-cols-1 md:grid-cols-2 mb-6">
          {/* صورة المدرسة */}
          <div className="mb-6 md:col-span-1">
            <img
              src={schoolImage}
              alt="School"
              className="w-full h-72 object-cover rounded-lg"
            />
          </div>

          <div className="md:col-span-1">
            <h1 className="text-3xl font-semibold text-center border-2 border-customGreen2 rounded-2xl p-2 text-blue-700 mb-4">
              {school.name}
            </h1>
            <div className="flex ">
              <div className="  flex items-end">
                <img src={location} alt="" className="w-12 h-15 mx-2" />
                <h1 className="text-lg  text-blue-700 font-bold shadow-md">الاردن /عمان</h1>
              </div>
              <div className="block ">
                <p className="text-lg text-gray-700 text-center  mb-20"style={{ marginRight: '2rem' }}>{school.address}</p>

              </div>
            </div>
          </div>
        </div>

        <div className="mb-6  text-navy3 flex items-center justify-center mx-2"style={{ marginLeft: '-15rem',marginTop: '-8rem' }}>
          <span className="text-lg font-bold text-blue-600">التقييم: </span>
          {/* عرض النجوم */}
          <div className="flex items-center ml-2 shadow-md">
          {renderStars(currentRating, setCurrentRating)} {/* تمرير دالة التحديث */}
          </div>
          <span className="ml-2">{currentRating} / 5</span>

        </div>
</div>
<div className="">
  
        {/* التعليقات */}
        <div className="mb-6 mt-16">
          <h2 className="text-xl text-navy3 font-semibold text-blue-700 mb-2 border-2 border-customGreen2 p-2"> 
            آراء أولياء الأمور
          </h2>
          <div>
            {comments.map((comment, index) => (
              <div
                key={index}
                className="p-4 mb-4 text-navy1 flex border border-customGreen2 rounded-lg bg-white justify-between"> {/* design الكومنتات */}
              
                <p className="font-semibold text-gray-900 flex items-center justify-center px-4">
                  <img src={user} alt="" className="h-8 w-8" />
                  {comment.name} :
                </p>
                <p className="text-gray-700 text-lg  text-right">{comment.text}</p>
                <img src={mes} className="w-6 h-6" alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* إضافة تعليق */}
        <div className="mb-6 text-center">
          <button
            className="px-6 py-2 bg-blue-800 text-lg text-white rounded-lg bg-customGreen2"
            onClick={() => setIsPopupOpen(true)}
          >
            إضافة تعليق
          </button>
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-lg text-customGreen2 font-semibold mb-4">أضف تعليقك</h2>
              <textarea
                className="w-full p-3 border border-customGreen2 rounded-lg"
                rows="4"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="أضف تعليقك هنا..."
              />
              <div className="mt-4 flex justify-between">
                <button
                  className="px-6 py-2 bg-customGreen2 text-white rounded-lg"
                  onClick={handleAddComment}
                >
                  إضافة
                </button>
                <button
                  className="px-6 py-2 bg-customRed text-white rounded-lg"
                  onClick={() => setIsPopupOpen(false)}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
</div>
      </div>
    </div>
  );
};

export default SchoolPage;

