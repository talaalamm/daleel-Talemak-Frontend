import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('يرجى إدخال جميع البيانات');
      return;
    }

    try {
      const response = await fetch('http://localhost:5027/api/Admin/Account/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("تم تسجيل الدخول بنجاح");

        // إذا كان هناك توكن في الرد، خزنه في localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        // توجه المستخدم إلى الصفحة الرئيسية أو الداشبورد
        navigate('/dashboard'); // عدلي المسار حسب الحاجة
      } else {
        setError(data.message || 'فشل تسجيل الدخول. تحقق من البيانات.');
      }

    } catch (err) {
      console.error('خطأ:', err);
      setError('حدث خطأ أثناء الاتصال بالخادم.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-center text-2xl font-bold text-bluee mb-6">تسجيل الدخول</h2>

        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-bluee">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="البريد الإلكتروني"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-bluee">كلمة المرور</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="كلمة المرور"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-bluee text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
