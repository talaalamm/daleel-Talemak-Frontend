import React, { createContext, useContext, useState, useEffect } from "react";

const SchoolContext = createContext();

export const useSchool = () => useContext(SchoolContext);

export const SchoolProvider = ({ children }) => {
  // استرجاع المدارس من localStorage إذا كانت موجودة
  const [schools, setSchools] = useState(() => {
    const savedSchools = localStorage.getItem("schools");
    return savedSchools ? JSON.parse(savedSchools) : [];
  });

  // تحديث المدارس في localStorage عند تحديث الحالة
  const updateSchools = (newSchools) => {
    setSchools(newSchools);
  };

  // وظيفة لإفراغ المدارس من الحالة و localStorage
  const clearSchools = () => {
    setSchools([]);
    localStorage.removeItem("schools");
  };

  // مزامنة التغييرات مع localStorage
  useEffect(() => {
    if (schools.length > 0) {
      localStorage.setItem("schools", JSON.stringify(schools));
    }
  }, [schools]);

  return (
    <SchoolContext.Provider value={{ schools, setSchools: updateSchools, clearSchools }}>
      {children}
    </SchoolContext.Provider>
  );
};
