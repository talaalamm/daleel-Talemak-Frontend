import Navbar from "./Navbar";  // استيراد Navbar
import { useState } from "react";
import { Outlet } from "react-router-dom";
function Dashboard() {
  return (
    <div className="m-0 p-0 w-full h-full">
          <Navbar />
          <Outlet />
    </div>
  );
}

export default Dashboard;
