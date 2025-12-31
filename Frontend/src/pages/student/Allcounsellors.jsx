import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Allcounsellors = () => {
    const {token} = useAuth();
    const [counsellors, setCounsellors] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchCounsellors = async ()=>{
            try{
                const response = await api.get("/student/counsellors", {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });     
                setCounsellors(response.data.counsellors || []);
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
            <div className = "" >
                {counsellors.map((item)=>(
                    <Card key = {item._id} className = "mb-4">
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                            <CardTitle>Specialization: {item.specialization}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className = "text-sm mb-2">Campus Name: {item.campusName}</p>
                            <p className = "text-sm mb-2">Campus ID: {item.campusId}</p>
                        </CardContent>
                        <Button className="my-2" onClick={()=>navigate(`/student/counsellors/${item._id}`)}>Book Session</Button>
                        <br/>

                    </Card>
                ))
            }
            </div>
        </div>
    )
}
export default Allcounsellors;