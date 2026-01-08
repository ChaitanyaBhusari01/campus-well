import { useState } from "react";
import {Card , CardContent , CardHeader , CardTitle ,CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext";
import {api} from "@/api/axios"

const Addresource =()=>{
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [type,setType] = useState("");
    const [link,setLink] = useState("");

    const {token} = useAuth();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const response = await api.post("/counsellor/resource",{
            data : {
                title,
                description,
                type,
                link,
            },
            header : {
                Authorization :     `Bearer ${token}`
            }

        })


    }

    return (
        <div>
            <Card>
                <CardTitle>Resource</CardTitle>
                <CardHeader>
                    <form >
                        <Input
                            placeholder = "Place the title "
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                            
                        <Input
                            placeholder = "description"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">{type || "select resource type"}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={()=>setType("article")}>article</DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>setType("video")}>video</DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>setType("audio")}>audio</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Input value = {link} onClick={(e)=>setLink(e.target.value)} placeholder = "link or public URL"></Input>
                        <Button type = "Submit">submit</Button>
                    </form>
                    
                </CardHeader>
            </Card>

        </div>
    )
}

export default Addresource;
