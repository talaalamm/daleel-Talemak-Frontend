import React, { useState, useEffect } from "react";
import axios from "axios";
import write from "../../images/logo.png";
import img2 from "../../assets/home2.jpeg";

const AddSchools = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    schoolName: "",
    regionName: "",
    governorateName: "", // حفظ اسم المحافظة هنا بدلاً من الـ id
  });
  const [governorates, setGovernorates] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [jordanRegions, setJordanRegions] = useState([]);
  const [loadingRegions, setLoadingRegions] = useState(false);

  useEffect(() => {
    // طلب لجلب قائمة المحافظات من API عند تحميل المكون.
    axios
      .get("http://localhost:5027/api/Governorate/GetGovernarate")
      .then((response) => {
        const governoratesData = response.data.map((governorate) => ({
          value: governorate.governorateId,
          label: governorate.governorateName,
        }));
        setGovernorates(governoratesData);
      })
      .catch((error) => {
        console.error("Error fetching governorates:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "governorateName") {
      setSelectedGovernorate(value);
      setJordanRegions([]); // إعادة ضبط المناطق عندما يتغير اسم المحافظة

      // إذا كانت الـ API تتوقع ID المحافظة، استخدم الـ ID بدلاً من الاسم:
      const selectedGovernorateId = governorates.find(
        (governorate) => governorate.label === value
      )?.value;

      if (selectedGovernorateId) {
        setLoadingRegions(true); // بدء تحميل المناطق
        axios
          .get(
            `http://localhost:5027/api/Regions/GetRegions/${selectedGovernorateId}`
          )
          .then((response) => {
            const regionsData = response.data.map((region) => ({
              value: region.regionId,
              label: region.regionName,
              governorateId: region.governorateId,
            }));
            setJordanRegions(regionsData); // تحديث المناطق
            setLoadingRegions(false); // إيقاف التحميل
          })
          .catch((error) => {
            console.error("Error fetching regions:", error);
            setLoadingRegions(false); // إيقاف التحميل عند حدوث خطأ
          });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post(
  "http://localhost:5027/api/Schools/CreateSchool",
  { model: formData }
);
      setAlert({ message: "تم إضافة المدرسة بنجاح!", type: "success" });
      setFormData({ schoolName: "", regionName: "", governorateName: "" });

      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 5000);
    } catch (error) {
      console.error(
        "Error adding school:",
        error.response?.data?.message || error.message
      );
      setAlert({
        message: "حدث خطأ أثناء إضافة المدرسة. حاول مرة أخرى.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-gray-50 py-8">
      {/* Instructions Section */}
      <div className="w-full max-w-md p-6 md:p-8">
        <div className="flex items-start mb-6">
          <img src={img2} className="w-12 h-12" alt="Add School Icon" />
          <h1 className="text-4xl text-bluee mr-3 font-cairo">
            إضافة مدرسة جديدة
          </h1>
        </div>

        <div className="space-y-4 text-gray-700">
          <p className="text-lg leading-relaxed font-cairo">
            نرحب بمساهمتك في توسيع قاعدة بياناتنا التعليمية. يرجى تعبئة النموذج
            بدقة لضمان جودة المعلومات.
          </p>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg mb-2 text-bluee">
              إرشادات مهمة:
            </h2>
            <ul className="space-y-2 list-disc list-inside font-cairo">
              <li>تأكد من صحة جميع المعلومات قبل الإرسال</li>
              <li>أدخل اسم المدرسة كاملاً كما هو مسجل رسمياً</li>
              <li>حدد المنطقة والمحافظة بدقة</li>
              <li>شاركنا تعليقك عن المدرسة بأن يكون واضحًا ومختصرًا</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2 text-bluee font-cairo">
              ملاحظات إضافية:
            </h2>
            <ul className="space-y-2 text-blue-600 font-cairo">
              <li>• سيتم مراجعة المعلومات قبل النشر</li>
              <li>• يمكنك تحديث المعلومات لاحقاً</li>
              <li>• نقدر مساهمتك في تطوير منصتنا</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-lg shadow-sm">
        {alert.message && (
          <div
            className={`px-4 py-3 rounded-lg mb-6 ${
              alert.type === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="schoolName"
              className="block text-sm font-medium text-bluee font-cairo"
            >
              اسم المدرسة
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
              placeholder="اسم المدرسة"
              className="mt-1 block w-full p-2 outline-none border-2 border-body rounded-lg shadow-sm text-bluee focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="governorateName"
              className="block text-sm font-medium text-bluee font-cairo"
            >
              المحافظة
            </label>
            <select
              name="governorateName"
              id="governorateName"
              value={formData.governorateName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 outline-none border-2 font-cairo border-body rounded-lg shadow-sm focus:ring-blue-500 text-bluee"
            >
              <option value="">اختر المحافظة</option>
              {governorates.map((governorate) => (
                <option key={governorate.value} value={governorate.label}>
                  {governorate.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="regionName"
              className="block text-sm font-medium text-bluee font-cairo"
            >
              المنطقة
            </label>
            <select
              name="regionName"
              id="regionName"
              value={formData.regionName}
              onChange={handleChange}
              required
              className="mt-1 block outline-none w-full py-2 px-2 border-2 font-cairo border-body rounded-lg shadow-sm focus:ring-blue-500  text-bluee"
              disabled={loadingRegions || !selectedGovernorate}
            >
              <option value="">اختر المنطقة</option>
              {jordanRegions.map((region) => (
                <option key={region.value} value={region.label}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-redd text-white p-2 rounded-lg hover:bg-blue-700 transition font-cairo"
          >
            أضف المدرسة
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSchools;

   