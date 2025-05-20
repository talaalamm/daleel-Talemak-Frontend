import React, { useState } from 'react';

const Login = () => {
  // State لإدارة القيم المدخلة
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // دالة لمعالجة إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();

    // تحقق بسيط من المدخلات
    if (!email || !password) {
      setError('يرجى إدخال جميع البيانات');
      return;
    }

    // هنا يمكنك إضافة منطق إرسال البيانات إلى السيرفر (API)
    // مثلا:
    // fetch('/api/login', { method: 'POST', body: { email, password } })
    
    // إذا كانت البيانات صحيحة، قم بتوجيه المستخدم إلى الداش بورد
    console.log('تم تسجيل الدخول');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray">

      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-center text-2xl font-bold text-bluee mb-6">تسجيل الدخول</h2>

        {/* عرض الخطأ إذا كان موجوداً */}
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* حقل البريد الإلكتروني */}
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

          {/* حقل كلمة المرور */}
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

          {/* زر تسجيل الدخول */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white bg-bluee p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
