import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";




const Signup = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [campusId, setCampusId] = useState("");
    const [campusName, setCampusName] = useState("");
    const [role, setRole] = useState("student");
    const [specialization, setSpecialization] = useState("");

    const navigate = useNavigate();
    useEffect(()=>{
        // Initialize form fields
        setName("");
        setEmail("");
        setPassword("");
        setCampusId("");
        setCampusName("");
        setRole("student");
        setSpecialization("");  
    },[]);

    const handleSubmit = async (e) => { 
        e.preventDefault();
        // Handle form submission logic here
        try {
            const response = await api.post("/auth/signup", {
                name,
                email,
                password,
                campusId,
                campusName,
                role,
                specialization,
            });
            alert("Signup successful! Please login.");
            navigate("/login");

        }
        catch (err) {
            console.error("Signup failed", err);
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-6">
              <Card className="w-[380px] p-2 card-glow">
                <CardHeader>
                  <CardTitle className="text-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-400">Login to CampusWell</CardTitle>
                </CardHeader>
        
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <Input
                      type="name"
                      placeholder="name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    />
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
                    
                    <Input
                      type="campusId"
                      placeholder="campusId"
                      value={campusId}
                      onChange={(e)=>setCampusId(e.target.value)}
                    />
                    <Input
                      type="campusName"
                      placeholder="campusName"
                      value={campusName}
                      onChange={(e)=>setCampusName(e.target.value)}
                    />
                    <Input
                      type="role"
                      placeholder="student or counsellor"
                      value={role}
                      onChange={(e)=>setRole(e.target.value)}
                    />
                    {role=="counsellor" && <Input
                      type="specialization"
                      placeholder="specialization"
                      value={specialization}
                      onChange={(e)=>setSpecialization(e.target.value)}
                    />} 

                    <Button type="submit" className="w-full btn-gradient">Signup</Button>
                  </form>
        
                </CardContent>
              </Card>
            </div>
    )
}

export default Signup;