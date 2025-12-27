import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const {login} = useAuth();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response= await api.post("/auth/login",{email,password});

      const token = response.data.token;
      login(token)

      console.log("Login successful",response.data);

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
