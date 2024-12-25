import React from "react";
import { useSchool } from "../context/SchoolContext";

const DeleteAllSchoolsButton = () => {
  const { clearSchools } = useSchool();

  const handleDeleteAll = () => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف كل المدارس؟")) {
      clearSchools();
      alert("تم حذف جميع المدارس!");
    }
  };

  return (
    <button
      onClick={handleDeleteAll}
      className="px-4 py-2 bg-red-600 text-white bg-heading rounded-lg"
    >
      حذف جميع المدارس
    </button>
  );
};

export default DeleteAllSchoolsButton;
