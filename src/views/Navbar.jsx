import React from 'react';
import { Link } from 'react-router-dom'; // استيراد Link من react-router-dom
import Logo from '../images/logo.png';

export default function Navbar({schools,setSchools}) {
  const data = [
    { name: "الرئيسية", link: "/" },
    { name: "عرض المدارس", link: "/SchoolCard" },
    { name: "إضافة مدرسة", link: "/AddSchool" },
    { name: "من نحن؟", link: "/AboutUs" }, // تعديل الرابط
  ];

  const handleScroll = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // تمرير سلس
    }
  };

  return (
    <div className="block  w-full">
    
        <nav className="heder shadow-md px-4  bg-blue-700 py-19 flex justify-start items-center flex-wrap">
          {/* الشعار أو اسم المتجر */}
          <div className="flex justify-center items-center">
            <img
              src={Logo}
              alt={Logo}
              className="h-8 w-8 rounded-full shadow-lg"
            />
            <h1 className="text-2xl px-4 font-bold text-white"> دليل تعليمك</h1>
          </div>

          {/* <ul className="flex">
          {data.map((m, index) => (
            <li key={index}>
              {m.link.startsWith("#") ? (
                // إذا كان الرابط داخليًا، نستخدم handleScroll
                <a
                  href={m.link}
                  className="text-white mx-10 hover:bg-white rounded-lg hover:text-blue-900 px-2"
                  onClick={(e) => handleScroll(e, m.link.substring(1))}
                >
                  {m.name}
                </a>
              ) : (
                <Link
                  to={m.link}
                  className="text-white mx-10 flex items-center hover:bg-white rounded-lg hover:text-blue-900 p-2"
                >
                  {m.name}
                </Link>
              )}
            </li>
          ))}
          <li>

          </li>
        </ul> */}
        </nav>
     
    </div>
  );
}
