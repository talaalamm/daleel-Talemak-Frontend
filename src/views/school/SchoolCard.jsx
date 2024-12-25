import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSchool } from "../../context/SchoolContext";
import ProvinceDropdown from "../ProvinceDropdown";
import ListGovernorates from "../Listgovernorates";
import ListSchool from "./ListSchool";

const SchoolCard = () => {
  const { schools, setSchools } = useSchool();
  const [jordanRegions, setJordanRegions] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("https://react-server-k3id.onrender.com/api/schools");
        setSchools(response.data);
      } catch (error) {
        alert("فشل تحميل بيانات المدارس. حاول مرة أخرى لاحقًا.");
        console.error("Error fetching schools:", error);
      }
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    if (selectedGovernorate) {
      axios
        .get(`https://react-server-k3id.onrender.com/api/Regions/GetRegions/?id=${selectedGovernorate}`)
        .then((response) => {
          const regionsData = response.data.map((region) => ({
            value: region._id,
            label: region.RegionName,
            governorateId: region.GovernorateId,
          }));
          setJordanRegions(regionsData);
        })
        .catch((error) => {
          alert("فشل تحميل المناطق. حاول مرة أخرى لاحقًا.");
          console.error("Error fetching regions:", error);
        });
    } else {
      setJordanRegions([]);
    }
  }, [selectedGovernorate]);

  const filteredSchools = schools.filter((school) => {
    const matchesSearchTerm = school.schoolName.toLowerCase().includes(searchTerm.toLocaleLowerCase());
    const matchesGovernorate = selectedGovernorate ? school.governorateName === selectedGovernorate : true;
    const matchesArea = selectedArea ? school.regionName?._id === selectedArea : true;

    return matchesSearchTerm && matchesGovernorate && matchesArea;
  });

  const resetFilters = () => {
    setSelectedGovernorate("");
    setSelectedArea("");
    setSearchTerm("");
  };

  if (!schools) return <div>Loading...</div>;

  return (
    <div className="p-6 mt-14 bg-gray-100 min-h-screen">
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="ابحث عن مدرسة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border-b-4 border-blue-700 hover:scale-105 hover:border-blue-900 rounded-md outline-none transition-all duration-300 transform"
        />
        <ListGovernorates
          name="المحافظة"
          value={selectedGovernorate}
          onSelect={(province) => setSelectedGovernorate(province)}
        />
        {selectedGovernorate && (
          <ProvinceDropdown
            options={jordanRegions}
            name="المنطقة"
            value={selectedArea}
            onSelect={setSelectedArea}
          />
        )}
        <button
          onClick={() => console.log(filteredSchools)}
          className="p-2 w-28 rounded-lg bg-heading hover:scale-105 transition-all duration-300 transform"
        >
          ابحث
        </button>
        <button
          onClick={resetFilters}
          className="p-2 w-28 rounded-lg bg-red-500 text-white hover:scale-105 transition-all duration-300 transform"
        >
          إعادة تعيين
        </button>
      </div>
      <hr className="w-full h-2 bg-blue-900 mb-4" />
      {filteredSchools.length > 0 ? (
        <ListSchool schools={filteredSchools} />
      ) : (
        <p className="text-center text-gray-500 mt-6">لا توجد مدارس مطابقة للبحث.</p>
      )}
    </div>
  );
};

export default SchoolCard;
