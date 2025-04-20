// src/components/ForgotPassword.jsx
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكن إضافة منطق إرسال طلب لإعادة تعيين كلمة المرور
    alert(`إعادة تعيين كلمة المرور تم إرسالها إلى: ${email}`);
  };

  return (
    <div className="forgot-password-container">
      <h1>إعادة تعيين كلمة المرور</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">البريد الإلكتروني:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">إرسال رابط إعادة تعيين كلمة المرور</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
