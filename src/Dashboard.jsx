import { useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Dashboard() {
    const isVisitPosted = useRef(false); // لتتبع ما إذا كان الطلب أُرسل

    const postVisitIfNeeded = async () => {
        if (isVisitPosted.current) return; // إذا أُرسل الطلب من قبل، لا تُكرره
        
        const today = new Date().toISOString().split('T')[0];
        const lastVisitDate = localStorage.getItem("lastVisitDate");

        try {
            await axios.post("http://localhost:5027/api/Admin/Tracking/Visit");
            localStorage.setItem("lastVisitDate", today);
            isVisitPosted.current = true; // نعلم أن الطلب قد أُرسل
        } catch (error) {
            console.error("Error posting visit:", error);
        }
    };

    useEffect(() => {
        postVisitIfNeeded();
    }, []);

    return (
        <div className="m-0 p-0 w-full h-full">
            <Navbar />
            <Outlet />
        </div>
    );
}

export default Dashboard;