import { createBrowserRouter, Navigate } from "react-router-dom";
import Index from "./views/Home.jsx";
import Dashboard from "./Dashboard.jsx";  // تأكد من استيراد Dashboard بشكل صحيح
import SchoolPage from "./views/school/SchoolPage.jsx";
import AboutUs from "./views/AboutUs.jsx";
import AddSchool from "./views/school/AddSchools.jsx";
import Filter from "./views/Filter.jsx";
import SchoolFilter from "./views/school/SchoolFilter.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />, // الصفحة الرئيسية تعرض Dashboard
    children: [
      {
        path: "/",
        element: <Navigate to="/Index" />, // إعادة التوجيه إلى /Index
      },
      {
        path: "/Filter",
        element: <Filter />, // إعادة التوجيه إلى /Index
      },
      {
        path: "/Index",
        element: <Index />, // الصفحة الرئيسية
      },

      {
        path: "/SchoolPage/:id",
        element: <SchoolPage />, // صفحة المدرسة
      },
      {
        path: "/AboutUs",
        element: <AboutUs />, // صفحة "من نحن"
      },
      {
        path: "/AddSchool",
        element: <AddSchool />, // صفحة "إضافة مدرسة"
      },
      {
        path: "/SchoolFilter",
        element: <SchoolFilter />, // صفحة "إضافة مدرسة"
      },
    ],
  },
  {
    path: "*", // لجميع المسارات غير المعروفة
    element: <Dashboard />, // في حالة المسارات غير المعروفة، نعرض Dashboard
  },
]);

export default router;
