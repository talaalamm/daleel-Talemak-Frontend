import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


const SearchFilterH = ({ onResults }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [schools, setSchools] = useState([]);
  const [alerts, setAlerts] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    location.state?.searchTerm || ""
  );
  const [governorates, setGovernorates] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState(
    location.state?.selectedGovernorate || ""
  );
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(
    location.state?.selectedArea || ""
  );
  const [loading, setLoading] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);

  // Fetch all schools
  const fetchAllSchools = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5027/api/Schools/GetSchool"
      );
      setSchools(response.data);
      onResults(response.data);
    } catch (error) {
      console.error("Error fetching all schools:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch governorates
  const fetchGovernorates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5027/api/Governorate/GetGovernarate"
      );
      setGovernorates(
        response.data.map((gov) => ({
          id: gov.governorateId,
          name: gov.governorateName,
        }))
      );
    } catch (error) {
      console.error("Error fetching governorates:", error);
    }
  };

  // Fetch areas
  const fetchAreas = async (governorateId) => {
    setLoadingAreas(true);
    try {
      const response = await axios.get(
        `http://localhost:5027/api/Regions/GetRegions/${governorateId}`
      );
      setAreas(
        response.data.map((area) => ({
          value: area.regionId,
          label: area.regionName,
        }))
      );
    } catch (error) {
      console.error("Error fetching areas:", error);
    } finally {
      setLoadingAreas(false);
    }
  };

  // Fetch filtered schools
  const fetchFilteredSchools = async () => {
    setLoading(true);
    try {
      let response;

      if (searchTerm.trim() !== "") {
        response = await axios.get(
          `http://localhost:5027/api/Schools/search/${encodeURIComponent(
            searchTerm
          )}`
        );
      } else if (selectedGovernorate && selectedArea) {
        response = await axios.get(
          `http://localhost:5027/api/Schools/searchbyregionandgovernorate/${encodeURIComponent(
            selectedGovernorate
          )}/${encodeURIComponent(selectedArea)}`
        );
      } else if (selectedArea) {
        response = await axios.get(
          `http://localhost:5027/api/Schools/searchbyregion/${selectedArea}`
        );
      } else if (selectedGovernorate) {
        response = await axios.get(
          `http://localhost:5027/api/Schools/searchbygovernorate/${encodeURIComponent(
            selectedGovernorate
          )}`
        );
      } else {
        await fetchAllSchools();
        return;
      }

      const filteredResults = response.data;

      navigate("/Filter", {
        state: {
          searchTerm,
          selectedGovernorate,
          selectedArea,
          results: filteredResults,
        },
      });
    } catch (error) {
      console.error("Error fetching filtered schools:", error);
      setAlerts(true);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchAllSchools();
    fetchGovernorates();
  }, []);

  // Update areas when governorate changes
  useEffect(() => {
    if (selectedGovernorate) {
      const selectedGovernorateData = governorates.find(
        (gov) => gov.name === selectedGovernorate
      );
      if (selectedGovernorateData) {
        fetchAreas(selectedGovernorateData.id);
      }
    } else {
      setAreas([]);
      setSelectedArea("");
    }
  }, [selectedGovernorate, governorates]);

  return (
    <div className="flex">
      <div className="w-full p-4">
        <input
          type="text"
          placeholder="ابحث عن مدرسة"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedGovernorate("");
            setSelectedArea("");
          }}
          className="appearance-none border mt-2 border-customGreen2 bg-white text-gray-700 p-3 pr-10 rounded-full w-full outline-none shadow-sm hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-customGreen2 focus:border-customGreen2 font-cairo"
          disabled={selectedGovernorate || selectedArea}
        />
      </div>

      <div className="w-full p-4">
        <select
          value={selectedGovernorate}
          onChange={(e) => {
            setSelectedGovernorate(e.target.value);
            setSearchTerm("");
          }}
          className="appearance-none border mt-2 border-customGreen2 bg-white text-gray-700 p-3 pr-10 rounded-full w-full outline-none shadow-sm hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-customGreen2 focus:border-customGreen2 font-cairo"
          disabled={searchTerm.trim() !== ""}
        >
          <option value="">اختر المحافظة</option>
          {governorates.map((governorate) => (
            <option key={governorate.id} value={governorate.name}>
              {governorate.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full p-4">
        <select
          value={selectedArea}
          onChange={(e) => {
            setSelectedArea(e.target.value);
            setSearchTerm("");
          }}
          disabled={!selectedGovernorate || searchTerm.trim() !== ""}
          className="appearance-none border mt-2 border-customGreen2 bg-white text-gray-700 p-3 pr-10 rounded-full w-full outline-none shadow-sm hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-customGreen2 focus:border-customGreen2 font-cairo"
        >
          <option value="">اختر المنطقة</option>
          {areas.map((area) => (
            <option key={area.value} value={area.label}>
              {area.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full flex items-center  ">
        <button
          onClick={fetchFilteredSchools}
          className="bg-customGreen2 hover:bg-primaryButton text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all"
          disabled={loading}
        >
                <FaSearch className="inline-block mr-2" />
          
          {loading ? "جاري البحث..." : ""}
        </button>
        {alerts ? (
          <p className=" text-white bg-heading p-2 mx-2 ">لا توجد مدارس مطابقة.</p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default SearchFilterH;
