import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";


const Helplines = () => {
    const {token} = useAuth();
    const [helplines,setHelplines] = useState([]);

    useEffect(()=>{
        const fetchHelplines = async () =>{
            try{
                const response = await api.get("/student/helplines",{
                    headers:{
                        Authorization : `Bearer ${token}`,
                    }
                })
                setHelplines(response.data.helplines || []);
            }
            catch(err){
                console.error("Failed to fetch helplines", err);
                
            }
        }
        fetchHelplines();
    },[])
    return (
        <div className="p-6">
            <h1 className="font-bold m-2 text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-400">Helplines</h1>
            <p className="text-slate-600 mb-4">These are all the helplines available for students who need help or cannot talk to a counsellor.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {helplines.map((item, i) => (
                    <Card key={item._id} className="fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                        <CardHeader>
                            <div className="text-lg font-medium">{item.organization}</div>
                            <CardTitle className="text-sm text-indigo-600">{item.phoneNumber}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-slate-600">{item.availability}</CardContent>
                        <CardFooter>
                            {item.languages.map((lang) => (
                                <span className="px-2 text-xs text-slate-500" key={lang}>{lang}</span>
                            ))}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Helplines;