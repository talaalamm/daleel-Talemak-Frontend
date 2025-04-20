import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [hasAccess, setHasAccess] = useState(false); // هل المستخدم دخل المفتاح الصح؟
  const [keyInput, setKeyInput] = useState(""); // قيمة المفتاح المدخلة
  const [keyError, setKeyError] = useState(""); // خطأ في المفتاح

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
  });

  const [error, setError] = useState("");

  // التحقق من المفتاح
  const handleKeySubmit = (e) => {
    e.preventDefault();
    if (keyInput === "2003") {
      setHasAccess(true);
      setKeyError("");
    } else {
      setKeyError("المفتاح غير صحيح.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      setError("كلمة المرور وتأكيدها غير متطابقتين.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5027/api/Admin/Account/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.passwordConfirmation,
          phoneNumber: formData.phoneNumber,
        }),
      });

      if (response.ok) {
        console.log("تم إنشاء الحساب بنجاح");
        navigate("/dashboard");
      } else {
        const data = await response.json();
        setError(data.message || "حدث خطأ أثناء إنشاء الحساب.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("فشل الاتصال بالسيرفر.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        {!hasAccess ? (
          // شاشة التحقق من المفتاح
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-bluee">enter the key</h2>
            {keyError && (
              <div className="text-red-600 text-center mb-4 font-medium">{keyError}</div>
            )}
            <form onSubmit={handleKeySubmit}>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="enter the key"
                className="w-full mb-4 px-4 py-2 text-bluee border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-full bg-bluee text-white py-2 rounded-md hover:bg-blue-900 transition"
              >
                دخول
              </button>
            </form>
          </>
        ) : (
          // نموذج إنشاء الحساب
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-bluee">إنشاء حساب</h2>
            {error && (
              <div className="text-red-600 text-center mb-4 font-medium">{error}</div>
            )}
            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <label className="block mb-1 font-medium text-bluee">الاسم الكامل</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="ادخل اسمك الكامل"
                  className="w-full px-4 py-2 text-bluee border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-bluee">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                  className="w-full px-4 py-2 text-bluee border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-bluee">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="078XXXXXXXX"
                  className="w-full px-4 py-2 text-bluee border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-bluee">كلمة المرور</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 text-bluee border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-bluee">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  name="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 text-bluee border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-bluee text-white py-2 rounded-md hover:bg-blue-900 transition"
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
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
