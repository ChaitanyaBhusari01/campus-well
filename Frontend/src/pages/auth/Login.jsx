import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { use, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response= await api.post("/auth/login",{email,password});

      const token = response.data.token;
      const decoded = login(token);

      if(decoded.role==="student"){
        navigate("/student");
      }
      else if(decoded.role==="counsellor"){
        navigate("/counsellor");
      } 
      else if(decoded.role==="admin"){
        navigate("/admin");
      }   
      else{
        console.error("Unknown user role");
        return ;
      }
    }
    catch(err){
      console.error("Login failed",err);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Login to CampusWell</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <Input
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)} 
            />
            <Input
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button type="submit"className="w-full">Login</Button>
          </form>
          
        </CardContent>
      </Card>
    </div>
  );
}
