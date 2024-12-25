import Navbar from "./Navbar";  // استيراد Navbar
import { SchoolProvider } from "./context/SchoolContext";
import { CommentsProvider } from "./context/CommentsProvider"; // استيراد الـ Context
import { useState } from "react";
import { Outlet } from "react-router-dom";
function Dashboard() {
  const [schools, setSchools] = useState([]);

  return (
    <div className="m-0 p-0 w-full h-full">
      <SchoolProvider>
        <CommentsProvider>
          {/* عرض Navbar */}
          <Navbar schools={schools} />
          {/* <div className="w-full h-14"></div> */}
          <Outlet />
        </CommentsProvider>
      </SchoolProvider>
    </div>
  );
}

export default Dashboard;
