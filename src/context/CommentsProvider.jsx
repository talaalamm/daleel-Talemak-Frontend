import React, { createContext, useContext, useState } from 'react';

// إنشاء الـ Context
const CommentsContext = createContext();

// استخدام الـ Context
export const useComments = () => useContext(CommentsContext);

// إنشاء الـ Provider الذي سيحتوي على البيانات والدوال
export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([
    { name: 'أم أحمد', text: 'مدرسة ممتازة جداً، المعلمون يهتمون بتعليم الطلاب.' },
    { name: 'أبو يوسف', text: 'جودة التعليم عالية والمرافق رائعة.' },
  ]);

  // دالة لإضافة تعليق جديد
  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <CommentsContext.Provider value={{ comments, addComment }}>
      {children}
    </CommentsContext.Provider>
  );
};
