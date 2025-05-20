// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import location from "../../assets/download.jpeg";
// import Logo from "../../images/school3.jpg";

// // مكون صفحة المدرسة
// const SchoolPage = () => {
//   const [school, setSchool] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [ratings, setRatings] = useState([]);
//   const { id } = useParams();
//   const [newComment, setNewComment] = useState("");
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false);
//   const [newRating, setNewRating] = useState(0);
// const [governorates, setGovernorates] = useState([]);
//   useEffect(() => {
//     const fetchSchoolData = async () => {
//       try {
//         const schoolResponse = await axios.get(
//           `http://localhost:5027/api/Schools/GetSchool/${id}`
//         );
//         setSchool(schoolResponse.data);
//       } catch (error) {
//         console.error("Error fetching school data:", error);
//       }
//     };
//    const fetchGovernorates = async () => {
//      try {
//        const response = await axios.get(
//          "http://localhost:5027/api/Governorate/GetGovernarate"
//        );
//        const governoratesData = response.data.map((governorate) => ({
//          id: governorate.governorateId,
//          name: governorate.governorateName,
//        }));
//        setGovernorates(governoratesData);
//      } catch (error) {
//        console.error("Error fetching governorates:", error);
//      }
//    }
//     const fetchCommentsAndRatings = async () => {
//       try {
//         const commentsResponse = await axios.get(
//           `http://localhost:5027/api/SchoolComments/GetSchoolComment/${id}`
//         );
//         setComments(commentsResponse.data);

//         const ratingsResponse = await axios.get(
//           `http://localhost:5027/api/Rate/AverageRating/${id}`
//         );
//         setRatings(ratingsResponse.data);
//       } catch (error) {
//         console.error("Error fetching comments and ratings:", error);
//       }
//     };

//     fetchSchoolData();
//     fetchCommentsAndRatings();
//   }, [id, comments]);

//   const handleRatingSubmit = async () => {
//     if (newRating === 0) return;
//     try {
//       const response = await axios.post(
//         "http://localhost:5027/api/Rate/addRating",
//         {
//           schoolId: id,
//           rating: newRating,
//         }
//       );
//       setIsPopupOpen(false); // إغلاق نافذة إضافة التعليق

//       if (response.status === 200) {
//         alert("تم إرسال التقييم بنجاح!");
//         setIsRatingPopupOpen(false);
//         const ratingsResponse = await axios.get(
//           `http://localhost:5027/api/Rate/AverageRating/${id}`
//         );
//         setRatings(ratingsResponse.data);
//       } else {
//         console.error("فشل في إرسال التقييم.");
//       }
//     } catch (error) {
//       console.error("خطأ في إرسال التقييم:", error);
//     }
//   };

//   const handleAddComment = async () => {
//     if (!newComment) return;
//     try {
//       const response = await axios.post(
//         `http://localhost:5027/api/SchoolComments/CreateSchoolComment/${id}`,
//         {
//           commentBody: newComment,
//           schoolId: id,
//         }
//       );
//       setIsPopupOpen(false);

//       if (response.status === 200) {
//         setComments((prevComments) => [...prevComments, response.data]);
//         setNewComment(""); // مسح التعليق بعد إضافته
//         setIsPopupOpen(false);
//       } else {
//         console.error("فشل في إضافة التعليق.");
//       }
//     } catch (error) {
//       console.error("خطأ في إضافة التعليق:", error);
//     }
//   };
//   useEffect(() => {
//     if (isPopupOpen === false) {
//       setIsPopupOpen(false); // إغلاق نافذة إضافة التعليق
//     } else {
//       setIsPopupOpen(true); // إغلاق نافذة إضافة التعليق
//     }
//   }, [isPopupOpen]);
//   if (!school) {
//     return (
//       <div className="text-center text-red-500">
//         لم يتم العثور على المدرسة المطلوبة.
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full overflow-x-hidden">
//       <div className="bg-white mt-16 mx-8 p-6 rounded-lg shadow-lg">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="mb-6 md:col-span-1">
//             <img
//               src={Logo}
//               alt="School"
//               className="w-full h-72 object-cover rounded-lg"
//             />
//           </div>

//           <div className="md:col-span-1">
//             <h1 className="text-3xl font-semibold text-center text-blue-700 border-2 border-customGreen2 rounded-2xl p-4 mb-4">
//               {school.schoolName}
//             </h1>
//             <div className="flex items-center mb-4">
//               <img src={location} alt="Location" className="w-12 h-12 mx-2" />
//               <h1 className="text-lg text-blue font-bold">
//                 {school.region.governorate.governorateName}/  {school.region.regionName}
//               </h1>
//             </div>
//             <div>
//               {/* <h3 className="flex">
//                 التقييم: {ratings.averageRating}{" "}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="text-accent h-5 w-5 mr-10 "
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927a1 1 0 011.902 0l1.502 4.636a1 1 0 00.95.69h4.908a1 1 0 01.592 1.806l-3.974 2.883a1 1 0 00-.363 1.118l1.502 4.636a1 1 0 01-1.54 1.118l-3.974-2.883a1 1 0 00-1.176 0l-3.974 2.883a1 1 0 01-1.54-1.118l1.502-4.636a1 1 0 00-.363-1.118L2.049 9.059a1 1 0 01.592-1.806h4.908a1 1 0 00.95-.69l1.502-4.636z" />
//                 </svg>
//               </h3> */}
//               <h3
//   className="flex items-center justify-center"
//   style={{
//     marginLeft: '40rem', // تحريك العنصر لليمين
//     marginTop: '2rem', // تحريك العنصر للأسفل
//     position: 'relative', // إذا كنت بحاجة لتحديد موضعه بشكل نسبي
//   }}
// >
//   <span className="font-semibold text-lg text-blue">التقييم:</span>
//   <span className="ml-4 flex items-center">
//     {/* {ratings.averageRating}/5 */}
//     <div className="ml-2 flex">
//       {[...Array(5)].map((_, index) => (
//         <svg
//           key={index}
//           xmlns="http://www.w3.org/2000/svg"
//           className={`h-5 w-5 ${index < ratings.averageRating ? 'text-yellow' : 'text-gray'}`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927a1 1 0 011.902 0l1.502 4.636a1 1 0 00.95.69h4.908a1 1 0 01.592 1.806l-3.974 2.883a1 1 0 00-.363 1.118l1.502 4.636a1 1 0 01-1.54 1.118l-3.974-2.883a1 1 0 00-1.176 0l-3.974 2.883a1 1 0 01-1.54-1.118l1.502-4.636a1 1 0 00-.363-1.118L2.049 9.059a1 1 0 01.592-1.806h4.908a1 1 0 00.95-.69l1.502-4.636z" />
//         </svg>
//       ))}
//     </div>
//   </span>
// </h3>
//             </div>

//           </div>
//         </div>

//         <div className="mb-6 ">
//           <h2 className="text-2xl font-semibold text-customGreen2 mb-4">
//             التقييمات:
//           </h2>
//           <div className="flex items-center mb-4">
//             {Array.from({ length: 5 }, (_, index) => (
//               <svg
//                 key={index}
//                 onClick={() => setNewRating(index + 1)}
//                 className={`w-8 h-8 cursor-pointer ${
//                   index < newRating
//                     ? "fill-current text-accent"
//                     : "text-gray-300"
//                 }`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.99a1 1 0 00.95.69h4.181c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.286 3.99c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.286-3.99a1 1 0 00-.364-1.118L2.05 9.417c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.95-.69l1.286-3.99z" />
//               </svg>
//             ))}
//             <span className="ml-2 text-lg text-customGreen">{newRating}/5</span>
//           </div>
//           <button
//             onClick={() => setIsRatingPopupOpen(true)}
//             className="px-4 py-2 bg-customGreen2 text-white rounded-lg"
//           >
//             إضافة تقييم
//           </button>
//         </div>

//         {/* <div className="mb-6">
//           <h2 className="text-xl text-navy3 font-semibold text-blue-700 mb-2 border-2 border-customGreen2 p-2">
// اراء اولياء الأمور          </h2>
//           <ul className="space-y-4">
//             {comments.length > 0 ? (
//               comments.map((comment, index) => (
//                 <li
//                   key={index}
//                   className="p-4 mb-4 text-navy1 flex border border-customGreen2 rounded-lg bg-white justify-between"
//                 >
//                   {comment}
//                 </li>
//               ))
//             ) : (
//               <li className="text-gray">لا توجد تعليقات بعد.</li>
//             )}
//           </ul>
//           <button
//             onClick={() => setIsPopupOpen(true)}
//             className="px-4 py-2 mt-4 bg-customLime text-white rounded-lg"
//           >
//             إضافة تعليق
//           </button>
//         </div>
//       </div> */}
//    <div className="mb-6">
//   <h2 className="text-xl text-navy3 font-semibold text-blue-700 mb-2 border-2 border-customGreen2 p-2 text-center">
//     آراء أولياء الأمور
//   </h2>
//   <ul className="space-y-4">
//     {comments.length > 0 ? (
//       comments.map((comment, index) => (
//         <li
//           key={index}
//           className="p-4 mb-4 text-navy1 flex border border-customGreen2 rounded-lg bg-white justify-between"
//         >
//           <div className="flex items-center w-full">
//             <span className="ml-4 text-xl text-navy1 flex-grow text-center">{comment}</span> {/* تعديل هنا */}
//           </div>
//         </li>
//       ))
//     ) : (
//       <li className="text-gray">لا توجد تعليقات بعد.</li>
//     )}
//   </ul>
//   <button
//     onClick={() => setIsPopupOpen(true)}
//     className="px-4 py-2 mt-4 bg-customGreen2 text-white rounded-lg"
//   >
//     إضافة تعليق
//   </button>
// </div>

// </div>

//       {/* نافذة التقييم */}
//       {isRatingPopupOpen && (
//         <div className="fixed inset-0 bg-gray  bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg " >
//             <h2 className="text-lg text-customGreen2 font-semibold ">
//               قيم هذه المدرسة
//             </h2>
//             <div className="flex justify-center mb-4">
//               {Array.from({ length: 5 }, (_, index) => (
//                 <svg
//                   key={index}
//                   onClick={() => setNewRating(index + 1)}
//                   className={`w-8 h-8 cursor-pointer ${
//                     index < newRating
//                       ? "fill-current text-accent"
//                       : "text-gray-300"
//                   }`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.99a1 1 0 00.95.69h4.181c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.286 3.99c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.286-3.99a1 1 0 00-.364-1.118L2.05 9.417c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.95-.69l1.286-3.99z" />
//                 </svg>
//               ))}
//             </div>
//             <button
//               onClick={handleRatingSubmit}
//               className="px-4 py-2 bg-customGreen text-white rounded-lg top:10px"
//               style={{ margintop: "100px" }}
//             >
//               إرسال التقييم

//             </button>
//             <button
//               onClick={() => setIsRatingPopupOpen(false)}
//               style={{ marginRight: 400  }}
//               className="text-gray bg-customRed mt-4 px-4 py-2 rounded-lg  "
//             >
//               إغلاق
//             </button>
//           </div>
//         </div>
//       )}

//       {/* نافذة التعليق */}
//       {isPopupOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
//             <h2 className="text-lg text-customGreen2 font-semibold mb-4">
//               أضف تعليقك
//             </h2>
//             <textarea
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               className="w-full h-32 p-4 border rounded-lg mb-4"
//               placeholder="أكتب تعليقك هنا..."
//             />
//             <div className="flex justify-between">
//               <button
//                 className="px-4 py-2 bg-customGreen text-white rounded-lg"
//                 onClick={handleAddComment}
//               >
//                 إضافة تعليق
//               </button>
//               <button
//                 className="px-4 py-2 bg-primaryButton text-white rounded-lg"
//                 onClick={() => setIsPopupOpen(false)}
//               >
//                 إغلاق
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SchoolPage;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import location from "../../assets/download.png";
import Logo from "../../images/school3.jpg";
import photo_2025 from "../../images/photo_2025.png";
import LogoSchool from "../../images/logo2.jpeg";
import likes from "../../assets/likes.png";

// مكون صفحة المدرسة
const SchoolPage = () => {
  const [school, setSchool] = useState(null);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [governorates, setGovernorates] = useState([]);
  const [AverageRating, setAverageRating] = useState();
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const schoolResponse = await axios.get(
          `http://localhost:5027/api/Schools/GetSchool/${id}`
        );
        setSchool(schoolResponse.data);
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };
    const fetchGovernorates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5027/api/Governorate/GetGovernarate"
        );
        const governoratesData = response.data.map((governorate) => ({
          id: governorate.governorateId,
          name: governorate.governorateName,
        }));
        setGovernorates(governoratesData);
      } catch (error) {
        console.error("Error fetching governorates:", error);
      }
    }
    const fetchCommentsAndRatings = async () => {
      try {
        const commentsResponse = await axios.get(
          `http://localhost:5027/api/SchoolComments/GetSchoolComment/${id}`
        );
        setComments(commentsResponse.data);

        const ratingsResponse = await axios.get(
          `http://localhost:5027/api/Rate/AverageRating/${id}`
        );
        setRatings(ratingsResponse.data);
        setAverageRating(ratingsResponse.data.averageRating);
      } catch (error) {
        console.error("Error fetching comments and ratings:", error);
      }
    };

    fetchSchoolData();
    fetchCommentsAndRatings();
  }, [id, comments]);
  const handelId = async (SchoolCommentId) => {
    try {
      await axios.post(`http://localhost:5027/api/Admin/CommentReports/PostCommentReport/${SchoolCommentId}`);
      alert("تم الابلاغ");
    }
    catch (err) {
      console.log("error" + err);
      alert("error");
    }
  }
  const handleRatingSubmit = async () => {
    if (newRating === 0) return;
    try {
      const response = await axios.post(
        "http://localhost:5027/api/Rate/addRating", {
        rating: {
          schoolId: id,
          rating: newRating,
        }
      });
      setIsPopupOpen(false);  // إغلاق نافذة إضافة التعليق

      if (response.status === 200) {
        alert("تم إرسال التقييم بنجاح!");
        setIsRatingPopupOpen(false);
        const ratingsResponse = await axios.get(
          `http://localhost:5027/api/StarRating/AverageRating/${id}`
        );
        setRatings(ratingsResponse.data);
      } else {
        console.error("فشل في إرسال التقييم.");
      }
    } catch (error) {
      console.error("خطأ في إرسال التقييم:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return;
    try {
      const response = await axios.post(
        `http://localhost:5027/api/SchoolComments/CreateSchoolComment/${id}`,
        {
          model: {
            commentBody: newComment,
            schoolId: id,
          }
        }
      );
      setIsPopupOpen(false);

      if (response.status === 200) {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment(""); // مسح التعليق بعد إضافته
        setIsPopupOpen(false);
      } else {
        console.error("فشل في إضافة التعليق.");
      }
    } catch (error) {
      console.error("خطأ في إضافة التعليق:", error);
    }
  };
  useEffect(() => {
    if (isPopupOpen === false) {
      setIsPopupOpen(false); // إغلاق نافذة إضافة التعليق
    } else {
      setIsPopupOpen(true); // إغلاق نافذة إضافة التعليق
    }
  }, [isPopupOpen]);
  if (!school) {
    return (
      <div className="text-center text-red-500 font-cairo ">
        لم يتم العثور على المدرسة المطلوبة.
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="w-full relative">
        <img src={photo_2025} className="w-full h-[100vh]" alt="" />
        <div className="abs absolute flex  items-center justify-between bottom-0 w-full bg-primaryButton bg-opacity-45 p-10 text-white font-cairo">

          <div className=" flex items-center justify-between w-full">
            <img src={LogoSchool} className="w-28 rounded-full " alt="" />

            {/* اسم المدرسة */}

            <div>
              <h1 className="font-bold text-4xl font-cairo">
                {school.schoolName}
              </h1>
              {/* الموقع */}
              <div className="mt-2 flex items-center  font-cairo">
                <img src={location} alt="Location" className="w-12 h-12 mx-2" />
                <h1 className="text-lg text-blue  font-cairo font-bold">
                  <span>
                    {school.region.governorate.governorateName} / {school.region.regionName}
                  </span>
                </h1>

              </div>
            </div>
            <h3
              className="flex items-center justify-between bg-red[100] font-cairo  "
              style={{
                marginRight: '70rem', 
                marginButtom: '7rem', 
                position: 'relative', 
              }}
            >

              <span className="flex items-start justify-between  ">
                <div className="flex -mt-6 mr-5"> 
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      className={`w-12 h-12 cursor-pointer ${index < AverageRating
                          ? "fill-current text-accent"
                          : "text-gray"
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >


                      <path d="M9.049 2.927a1 1 0 011.902 0l1.502 4.636a1 1 0 00.95.69h4.908a1 1 0 01.592 1.806l-3.974 2.883a1 1 0 00-.363 1.118l1.502 4.636a1 1 0 01-1.54 1.118l-3.974-2.883a1 1 0 00-1.176 0l-3.974 2.883a1 1 0 01-1.54-1.118l1.502-4.636a1 1 0 00-.363-1.118L2.049 9.059a1 1 0 01.592-1.806h4.908a1 1 0 00.95-.69l1.502-4.636z" />
                    </svg>
                  ))}
                </div>
              </span>


            </h3>




          </div>
        </div>

      </div>

      <div className="flex justify-center mt-10">
        <p className="text-7xl text-bluee mr-10 ml-[30px]  text-shadow font-cairo font-bold">
          {school.schoolName} ترحب بكم !
        </p>
      </div>
      <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center space-y-8 font-[Cairo] mt-16">
        <div>
          <h1 className="text-xl font-bold font-cairo text-bluee">التوصية بالمؤسسة التعليمية</h1>
          <p className="text-bluee font-cairo">هل تنصح الآخرين بهذه المؤسسة التعليمية؟</p>
          <div className=" flex justify-center text-5xl text-bluee my-3"><img src={likes} alt="Location" className="w-20 h-20 mx-2 " /></div>
        </div>



        <h2 className="text-2xl font-semibold text-bluee  font-cairo mb-5">التقييمات:</h2>

        <div className="mb-6  text-center">

          <div className="flex flex-col items-center justify-center  mb-4">
            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  onClick={() => setNewRating(index + 1)}
                  className={`w-8 h-8 cursor-pointer ${index < newRating
                      ? "fill-current text-accent"
                      : "text-gray-300"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.99a1 1 0 00.95.69h4.181c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.286 3.99c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.286-3.99a1 1 0 00-.364-1.118L2.05 9.417c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.95-.69l1.286-3.99z" />
                </svg>
              ))}
            </div>


            <span className="text-lg text-bluee">{newRating}/5</span>
          </div>

          <button
            onClick={handleRatingSubmit}
            className="px-4 py-2 bg-redd hover:bg-bluee/90 text-white rounded-lg top:10px"
            style={{ margintop: "100px" }}
          >
            إرسال التقييم

          </button>
        </div>
        <div className="mb-10 mt-10">
          <h2 className="text-2xl font-bold text-center text-gray font-cairo border-b-4 border-gray pb-2 mb-6">
            {/* آراء أولياء الأمور */}
          </h2 >
          <h2 className="text-2xl font-bold text-center font-cairo  text-bluee">آراء أولياء الأمور  </h2>
          <ul className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <li
                  key={comment.schoolCommentId}
                  className=" max-w-md mx-auto bg-white shadow-md flex j justify-between items-center  font-cairo rounded-xl p-6  text-lg text-navy1 border border-gray"
                >
                  <p className="text-center w-[330px] block break-words ">{comment.commentBody}</p>
                  <button onClick={() => handelId(comment.schoolCommentId)} className="bg-redd px-2 text-white rounded-md py-1 h-[40px] text-sm"> إبلاغ</button>

                </li>
              ))
            ) : (
              <li className="text-gray-500 text-center font-cairo  text-lg">
                لا توجد تعليقات بعد.
              </li>
            )}
          </ul>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="px-4 py-2 bg-redd hover:bg-bluee/90 font-cairo text-white text-lg font-medium rounded-xl shadow-md transition"
            >
              إضافة تعليق
            </button>
          </div>
        </div>

      </div>
      {/* نافذة التقييم */}
      {isRatingPopupOpen && (
        <div className="fixed inset-0 bg-gray  bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg " >
            <h2 className="text-lg text-customGreen2 font-semibold ">
              قيم هذه المدرسة
            </h2>
            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  onClick={() => setNewRating(index + 1)}
                  className={`w-8 h-8 cursor-pointer ${index < newRating
                      ? "fill-current text-accent"
                      : "text-gray-300"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.99a1 1 0 00.95.69h4.181c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.286 3.99c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.286-3.99a1 1 0 00-.364-1.118L2.05 9.417c-.783-.57-.38-1.81.588-1.81h4.181a1 1 0 00.95-.69l1.286-3.99z" />
                </svg>
              ))}
            </div>
            <button
              onClick={handleRatingSubmit}
              className="px-4 py-2 bg-customGreen text-white rounded-lg top:10px"
              style={{ margintop: "100px" }}
            >
              إرسال التقييم

            </button>
            <button
              onClick={() => setIsRatingPopupOpen(false)}
              style={{ marginRight: 400 }}
              className="text-gray bg-customRed mt-4 px-4 py-2 rounded-lg  "
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
      {/* نافذة التعليق */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
            <h2 className="text-lg text-bluee font-semibold mb-4">
              أضف تعليقك
            </h2>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full h-32 p-4 border rounded-lg mb-4"
              placeholder="أكتب تعليقك هنا..."
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-bluee text-white rounded-lg"
                onClick={handleAddComment}
              >
                إضافة تعليق
              </button>
              <button
                className="px-4 py-2 bg-redd text-white rounded-lg"
                onClick={() => setIsPopupOpen(false)}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default SchoolPage;
