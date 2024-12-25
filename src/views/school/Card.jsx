import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGovernorates from "../Listgovernorates";

const Card = () => {
  const [alert, setAlert] = useState({ message: "", type: "" }); // تنبيه مع نوع (نجاح أو خطأ)
  const [formData, setFormData] = useState({
    schoolName: "",
    regionName: "",
    governorateName: "",
  });
  const [governorates, setGovernorates] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [jordanRegions, setJordanRegions] = useState([]);
  const [loadingRegions, setLoadingRegions] = useState(false);

  useEffect(() => {
    // جلب قائمة المحافظات
    axios
      .get("https://react-server-k3id.onrender.com/api/GetGovernarate")
      .then((response) => {
        const governoratesData = response.data.map((governorate) => ({
          value: governorate._id,
          label: governorate.governorateName,
        }));
        setGovernorates(governoratesData);
      })
      .catch((error) => {
        console.error("Error fetching governorates:", error);
      });
  }, []);

  useEffect(() => {
    // جلب المناطق عند اختيار محافظة
    if (selectedGovernorate) {
      setLoadingRegions(true);
      axios
        .get(`https://react-server-k3id.onrender.com/api/Regions/GetRegions/?id=${selectedGovernorate}`)
        .then((response) => {
          const regionsData = response.data.map((region) => ({
            value: region._id,
            label: region.RegionName,
            governorateId: region.GovernorateId,
          }));
          setJordanRegions(regionsData);
          setLoadingRegions(false);
        })
        .catch((error) => {
          console.error("Error fetching regions:", error);
          setLoadingRegions(false);
        });
    }
  }, [selectedGovernorate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://react-server-k3id.onrender.com/api/schools", formData);
      setAlert({ message: "تم إضافة المدرسة بنجاح!", type: "success" });
      setFormData({ schoolName: "", regionName: "", governorateName: "" });

      // إخفاء الرسالة بعد 5 ثوانٍ
      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 5000);
    } catch (error) {
      console.error("Error adding school:", error.response?.data?.message || error.message);
      setAlert({ message: "حدث خطأ أثناء إضافة المدرسة. حاول مرة أخرى.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-gray-50 py-8">
      <div className="w-full max-w-md p-6 md:p-8">
        <h1 className="text-3xl text-customGreen2 font-bold mb-4">إضافة مدرسة جديدة</h1>
        <p className="text-lg leading-relaxed text-gray-700">
          نرحب بمساهمتك في توسيع قاعدة بياناتنا التعليمية. يرجى تعبئة النموذج بدقة لضمان جودة المعلومات.
        </p>
      </div>

      <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-lg shadow-sm">
        {alert.message && (
          <div
            className={`px-4 py-3 rounded-lg mb-6 ${
              alert.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">
              اسم المدرسة
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
              placeholder="اسم المدرسة..."
              className="mt-1 block w-full p-2 outline-none border-2 border-body rounded-lg shadow-sm focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="governorateName" className="block text-sm font-medium text-gray-700">
              المحافظة
            </label>
            <select
              name="governorateName"
              id="governorateName"
              value={formData.governorateName}
              onChange={(e) => {
                handleChange(e);
                setSelectedGovernorate(e.target.value);
              }}
              required
              className="mt-1 block w-full p-2 outline-none border-2 border-body rounded-lg shadow-sm focus:ring-blue-500"
            >
              <option value="">اختر المحافظة...</option>
              {governorates.map((governorate) => (
                <option key={governorate.value} value={governorate.value}>
                  {governorate.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="regionName" className="block text-sm font-medium text-gray-700">
              المنطقة
            </label>
            <select
              name="regionName"
              id="regionName"
              value={formData.regionName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 outline-none border-2 border-body rounded-lg shadow-sm focus:ring-blue-500"
              disabled={loadingRegions || !selectedGovernorate}
            >
              <option value="">اختر المنطقة...</option>
              {jordanRegions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-navbar text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            أضف المدرسة
          </button>
        </form>
      </div>
    </div>
  );
};

export default Card;
