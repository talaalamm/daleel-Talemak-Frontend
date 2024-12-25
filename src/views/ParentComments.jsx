import React, { useState } from "react";
import { useComments } from "../context/CommentsContext";

const ParentComments = () => {
  const { comments, addComment, deleteComment } = useComments(); // الوصول إلى الدوال والحالة
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    schoolId: "", // إضافة id المدرسة
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message || !formData.schoolId) return;

    addComment(formData); // إضافة تعليق جديد
    setFormData({ name: "", message: "", schoolId: "" }); // إعادة تعيين النموذج
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">تعليقات أولياء الأمور</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="اسم ولي الأمر"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="أدخل التعليق..."
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div>
          <select
            name="schoolId"
            value={formData.schoolId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>اختر المدرسة</option>
            <option value="1">مدرسة الرياض</option>
            <option value="2">مدرسة جدة</option>
            <option value="3">مدرسة مكة</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          إضافة تعليق
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4">جميع التعليقات:</h3>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="border p-4 rounded shadow">
                <p className="font-bold">{comment.name} (مدرسة ID: {comment.schoolId})</p>
                <p>{comment.message}</p>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="text-red-500 mt-2"
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">لا توجد تعليقات حتى الآن.</p>
        )}
      </div>
    </div>
  );
};

export default ParentComments;
