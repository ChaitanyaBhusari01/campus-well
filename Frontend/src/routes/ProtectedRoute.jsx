import {useAuth} from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({allowedRoles})=>{
    const {user , loading} = useAuth();

    if(loading){
        return <div>Loading...</div>;
    }
    if(!user){
        return <Navigate to = "/login"/>;
    }
    if(allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to = "/unauthorized"/>;
    }

    return <Outlet/>;
}
export default ProtectedRoute;
