import { useEffect, useState } from "react";
import {useAuth} from "../../context/AuthContext"; 
import api from "../../api/axios";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const StudentResources = () => {
  const [resources, setResources] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    // redirect handled by ProtectedRoute, no need here

    const fetchResources = async () => {
      try {
        const res = await api.get("/student/resource", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setResources(res.data.resources || []);
      } catch (err) {
        console.error("Failed to fetch resources", err);
      }
    };

    fetchResources();
  }, [token]);

  return (
    <div>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Resources</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((item) => (
            <Card key={item._id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm mb-2">{item.description}</p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Open Resource
                </a>

                <p className="mt-2 text-xs text-gray-500">
                  Type: {item.type}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentResources;
