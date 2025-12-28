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
        <div>
            These are all the helplines available for students who need help or cannot talk to a counsellor.
            <h1 className ="font-bold m-4 text-2xl">
                Helplines Page
            </h1>
            <br></br>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {helplines.map((item)=>{ return(

                    <Card key = {item._id}>
                        <CardHeader>{item.organization}
                            <CardTitle>{item.phoneNumber}</CardTitle>
                        </CardHeader>
                        <CardContent>{item.availability}</CardContent>
                        <CardFooter>{item.languages.map((lang) => <span className="px-2" key={lang}>{lang}</span>)}</CardFooter>
                    </Card>)
                })}
                
            </div>
        </div>
    )
}

export default Helplines;