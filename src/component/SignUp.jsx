import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // هنا بتحط منطق إنشاء الحساب لاحقًا
    console.log("حساب جديد تم إنشاؤه");
    navigate("/dashboard"); // توجيه بعد التسجيل (غيره حسب ما بدك)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-bluee">إنشاء حساب </h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-bluee">الاسم الكامل</label>
            <input
              type="text"
              placeholder="ادخل اسمك"
              className="w-full px-4 py-2  text-bluee border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-bluee font-medium">البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="example@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-bluee font-medium">كلمة المرور</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 bg-bluee  text-white py-2 rounded-md hover:bg-blue-900 transition"
          >
            إنشاء الحساب
          </button>
        </form>
        <p className="mt-6 text-center text-bluee text-sm">
          لديك حساب بالفعل؟{" "}
          <a href="/login" className="text-bluee hover:underline">
            تسجيل الدخول
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;