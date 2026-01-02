import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const Counsellorslots = () => {
  const { token } = useAuth();
  const [slots, setSlots] = useState([]);
  const { counsellorId } = useParams();


  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await api.get(
          `/student/counsellors/${counsellorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSlots(response.data.availability || []);
      } catch (err) {
        console.error("Failed to fetch slots", err);
      }
    };

    fetchSlots();
  }, [token, counsellorId]);

  const handleBooking = (slotId) => async () => {
    try {

      setSlots(prev=>(
        prev.filter((slot)=>slot._id !== slotId)
      ));

      const response = await api.post(
        `/student/bookings/${counsellorId}/${slotId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Slot booked successfully!");
    } catch (err) {
      console.error("Failed to book slot", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-400">Available slots</h2>

      <div className="space-y-3">
        {slots.map((item, i) => (
          <Card key={item._id || item.date + item.startTime} className="fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            <CardHeader>
              <CardTitle>Session slot</CardTitle>
            </CardHeader>

            {item.isBooked ? (
              <CardContent>Slot not available</CardContent>
            ) : (
              <CardContent>
                <strong>{item.date}</strong> — {item.startTime} to {item.endTime}
                <br/>
                <Button onClick={handleBooking(item._id)} className="mt-3 btn-gradient">Book Now</Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Counsellorslots;
