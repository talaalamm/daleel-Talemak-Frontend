import React, { useState } from 'react';

function Drop({data,name}) {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (province) => {
    setSelectedProvince(province);
    setIsOpen(false); // إغلاق القائمة بعد اختيار العنصر
  };

  return (
    <div className="relative w-64 mx-auto">
      <button
        className="w-full p-3 bg-white text-blue-950 rounded-lg shadow-lg flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span>{selectedProvince || name}</span>
     
          {isOpen?    
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
</svg>:    <svg
          className={`w-5 h-5 transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
            </svg>  }
  
      </button>

      {isOpen && (
         
        <ul className="absolute left-0 w-full bottom-[100%] mb-2 bg-white z-10 shadow-lg rounded-lg border border-body ">
            <div className='max-h-44 overflow-y-auto'>

          
          {data.map((province ) => (
            <li
              key={province.governorateId}
              className="p-3 hover:bg-navbar hover:text-white cursor-pointer"
              onClick={() => handleSelect(province)}
            >
              {province.governorateName}
            </li>
          ))}
            </div>
        </ul>
      )}
    </div>
  );
}

export default Drop;
