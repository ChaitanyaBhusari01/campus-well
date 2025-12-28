import { use } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const StudentBookings = () => {
    const {token} = useAuth();
    const [counsellors, setCounsellors] = useState([]);
    useEffect(()=>{
        const fetchCounsellors = async ()=>{
            try{
                const response = await fetch("http://localhost:5000/student/counsellors", {
                    method: "GET",
                    headers: {  
                        "Authorization": `Bearer ${token}`,
                        // Include authentication headers if needed
                    },
                });     
                if (response.ok) {
                    const data = await response.json();
                    setCounsellors(data.counsellors);
                }   
                else {          

                    console.error("Failed to fetch counsellors");       

                }    
            }
            catch(error){
                console.log("Error fetching counsellors:", error);
            }
        };
        fetchCounsellors();
    }, []);
    return (
        <div>Student can book sessions with the counselor
            <h1>Bookings Page</h1>
        </div>
    )
}
export default StudentBookings;