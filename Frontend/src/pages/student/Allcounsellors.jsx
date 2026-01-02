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
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-400">All Counsellors</h1>

            <div className="space-y-4">
                {counsellors.map((item, i) => (
                    <Card key={item._id} className="fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                        <CardHeader>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <div className="text-sm text-slate-600">Specialization: {item.specialization}</div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm mb-2">Campus Name: {item.campusName}</p>
                            <p className="text-sm mb-2">Campus ID: {item.campusId}</p>
                        </CardContent>
                        <div className="p-4">
                            <Button className="my-2 btn-gradient" onClick={() => navigate(`/student/counsellors/${item._id}`)}>Book Session</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
export default Allcounsellors;