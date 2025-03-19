import { useEffect, useState } from "react";
import Logo from "./images/logo.png";
import { Link } from "react-router-dom";
function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => setIsSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => setIsSidebarOpen(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const data = [
    { name: "الرئيسية", link: "/" },
    { name: "عرض المدارس", link: "/SchoolFilter" },
    { name: "إضافة مدرسة", link: "/AddSchool" },
    { name: "من نحن؟", link: "/AboutUs" },
  ];
  return (
    <header className="relative ">
      <div
        className={`${
          showNavbar ? " fixed shadow-lg  border-b-2" : " "
        } z-10 top-0 px-4 left-0 right-0 justify-between  shadow-lg flex lg:px-20 items-center  bg-customGreen2 hede font-cairo text-lg`}
      >
        {/* Store logo */}
        <div className=" hidden lg:flex justify-center items-center">
          <img
            src={Logo}
            alt={Logo}
            className="h-8 w-8 rounded-full shadow-lg"
          />
          <h1 className="text-2xl px-4 font-bold text-white"> دليل تعليمك</h1>
        </div>

        <div className="cursor-pointer lg:hidden">
          <button
            className="flex items-center text-black"
            onClick={handleSidebarToggle}
          >
            <span className="text-lg">☰</span>
            <span className="ml-2">القائمة</span>
          </button>
        </div>
        <div className="flex lg:hidden justify-center items-center">
          <img
            src={Logo}
            alt={Logo}
            className="h-8 w-8 rounded-full shadow-lg"
          />
          <h1 className="text-2xl px-4 font-cairo font-bold text-white"> دليل تعليمك</h1>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex ">
          <nav>
            <ul className="flex space-x-4">
              {data.map((m, index) => (
                <li key={index}>
                  {m.link.startsWith("#") ? (
                    // إذا كان الرابط داخليًا، نستخدم handleScroll
                    <a
                      href={m.link}
                      className="text-white mx-10 hover:bg-white  hover:text-blue-900 px-2"
                      onClick={(e) => handleScroll(e, m.link.substring(1))}
                    >
                      {m.name}
                    </a>
                  ) : (
                    <Link
                      to={m.link}
                      className="text-black  text-body flex items-center rounded-full border-customGreen2 hover:text-navbar px-4 hover:scale-110 hover:translate-x-3 mx-4 py-2 hover:bg-white transition-all duration-300 "
                    >
                      {m.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Cart and User buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-black hover:bg-primaryButton p-2 rounded-full transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
          </button>
        </div>
      </div>
      {/* هاذا التصميم في Phone  */}
      <div
        className={`r fixed top-16  w-60 h-full bg-body  ${
          isSidebarOpen ? "right-0 z-10" : "-right-64"
        } bg-slate-100 shadow-lg `}
      >
        <div className="flex justify-end m-2">
          <span
            className="cursor-pointer  p-2  shadow-sm rounded-full hover:bg-primaryButton hover:text-red-900  hover:shadow-xl hover:scale-105"
            onClick={handleSidebarClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg hover:scale-125 hover:rotate-12"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </span>
        </div>
        <ul className="block  cursor-pointer justify-center w-full z-10">
          {data.map((m, index) => (
            <li key={index} className="w-full text-center py-2 hover:bg-accent">
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
                  className="  text-black  w-full text-center     transition duration-300 "
                >
                  {m.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
