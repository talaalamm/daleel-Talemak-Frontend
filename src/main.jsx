import React from "react";
import ReactDOM from "react-dom/client";
import Login from './component/Login';
import "./styles.css"; // استيراد أنماط CSS الخاصة بالمشروع
import { RouterProvider } from "react-router-dom"; // استيراد RouterProvider من react-router-dom
import router from "./router.jsx"; // استيراد إعدادات التوجيه
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const App = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} /> 
);
