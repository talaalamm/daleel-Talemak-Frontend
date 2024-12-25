import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";  // تأكد من أنك استوردت axios
import schoolImage from "../../assets/Logo.jpeg";
import location from "../../assets/download.jpeg";

// مكون صفحة المدرسة
const SchoolPage = () => {
  const [school, setSchool] = useState(null); // لحفظ بيانات المدرسة
  const [comments, setComments] = useState([]); // لحفظ التعليقات
  const [ratings, setRatings] = useState([]); // لحفظ التقييمات
  const { id } = useParams(); // للحصول على ID المدرسة من الرابط
  const [newComment, setNewComment] = useState(""); // لحفظ التعليق الجديد
  const [isPopupOpen, setIsPopupOpen] = useState(false); // للتحكم في نافذة إضافة تعليق
  const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false); // للتحكم في نافذة إضافة تقييم
  const [newRating, setNewRating] = useState(0); // لحفظ التقييم الجديد

  // دالة لجلب بيانات المدرسة، التعليقات، والتقييمات
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const schoolResponse = await axios.get(`https://react-server-k3id.onrender.com/api/schools/${id}`);
        setSchool(schoolResponse.data);
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };
  
    const fetchCommentsAndRatings = async () => {
      try {
        const commentsResponse = await axios.get(`https://react-server-k3id.onrender.com/api/comments?school_id=${id}`);
        setComments(commentsResponse.data);
  
        const ratingsResponse = await axios.get(`https://react-server-k3id.onrender.com/api/evaluations?school_id=${id}`);
        setRatings(ratingsResponse.data);
      } catch (error) {
        console.error("Error fetching comments and ratings:", error);
      }
    };
  
    fetchSchoolData();
    fetchCommentsAndRatings();
  }, [id]); // التحديث عند تغيير ID المدرسة
  
  // دالة لحذف تعليق
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`https://react-server-k3id.onrender.com/api/comments/${commentId}`);
      if (response.status === 200) {
        setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
      } else {
        console.error("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // دالة لإرسال التقييم
  const handleRatingSubmit = async () => {
    if (newRating === 0) return;
    try {
      const response = await axios.post("https://react-server-k3id.onrender.com/api/evaluations", {
        school_id: id,
        score: newRating,
      });

      if (response.status === 200) {
        alert("Evaluation submitted successfully!");
        setIsRatingPopupOpen(false);
        const ratingsResponse = await axios.get(`https://react-server-k3id.onrender.com/api/evaluations?school_id=${id}`);
        setRatings(ratingsResponse.data);
      } else {
        console.error("Failed to submit evaluation.");
      }
    } catch (error) {
      console.error("Error submitting evaluation:", error);
    }
  };

  // دالة لإضافة تعليق جديد
  const handleAddComment = async () => {
    if (!newComment) return;
    try {
      const response = await axios.post("https://react-server-k3id.onrender.com/api/comments", {
        school_id: id,
        content: newComment,
      });
  
      if (response.status === 200) {
        setComments(prevComments => [...prevComments, response.data]);
        setNewComment("");
        setIsPopupOpen(false);
      } else {
        console.error("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  
  // دالة لحساب متوسط التقييمات
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.score, 0);
    return (total / ratings.length).toFixed(1);
  };

  if (!school) {
    return <div className="text-center text-red-500">لم يتم العثور على المدرسة المطلوبة.</div>;
  }

  const averageRating = calculateAverageRating(ratings);

  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="bg-white mt-16 mx-8">
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 mb-6">
            <div className="mb-6 md:col-span-1">
              <img
                src={schoolImage}
                alt="School"
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>

            <div className="md:col-span-1">
              <h1 className="text-3xl mx-4 font-semibold text-center border-2 border-customGreen2 rounded-2xl p-2 text-blue-700 mb-4">
                {school.schoolName}
              </h1>
              <div className="flex">
                <div className="flex items-end">
                  <img src={location} alt="Location" className="w-12 h-15 mx-2" />
                  <h1 className="text-lg text-blue-700 font-bold shadow-md">الأردن / عمان</h1>
                </div>
                <div>
                  <p className="text-lg text-gray-700 text-center mb-20" style={{ marginRight: "2rem" }}>
                    {school.address || "لا توجد معلومات عن العنوان"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center">
            <div className=" text-navbar">
              <div className="flex justify-between my-2 w-80">
                <span className="text-navbar">التقييم:</span>
                <button
                  onClick={() => setIsRatingPopupOpen(true)}
                  className="px-4 py-1 bg-customGreen2 text-white rounded-lg ml-4"
                >
                  إضافة تقييم
                </button>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    onClick={() => setNewRating(index + 1)}
                    className={`w-6 h-6 cursor-pointer ${index < newRating ? "fill-current text-accent" : "text-gray-300"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.99a1 1 0 00.95.69h4.181c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.286 3.99c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.286-3.99a1 1 0 00-.364-1.118L2.05 9.417c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.95-.69l1.286-3.99z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-customGreen">{newRating}/5</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-customGreen2 mb-4">التعليقات:</h2>
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li key={comment._id} className="p-4 relative bg-gray-100 rounded-lg bg-body max-w-sm shadow-sm">
                  {comment.content}
                  <span
                    className="text-customRed absolute top-2 left-2 text-left cursor-pointer"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    حذف
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <button
              className="px-6 py-2 bg-blue-800 text-lg text-white rounded-lg bg-customGreen2"
              onClick={() => setIsPopupOpen(true)}
            >
              إضافة تعليق
            </button>
          </div>
        </div>
      </div>

      {/* نافذة التقييم */}
      {isRatingPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg text-customGreen2 font-semibold mb-4">قيم هذه المدرسة</h2>
            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  onClick={() => setNewRating(index + 1)}
                  className={`w-6 h-6 cursor-pointer ${index < newRating ? "fill-current text-accent" : "text-gray-300"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.99a1 1 0 00.95.69h4.181c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.286 3.99c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.286-3.99a1 1 0 00-.364-1.118L2.05 9.417c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.95-.69l1.286-3.99z" />
                </svg>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="px-6 py-2 bg-customGreen2 text-white rounded-lg"
                onClick={handleRatingSubmit}
              >
                حفظ التقييم
              </button>
              <button
                className="px-6 py-2 bg-customRed text-white rounded-lg"
                onClick={() => setIsRatingPopupOpen(false)}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة التعليق */}
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
  );
};

export default SchoolPage;
