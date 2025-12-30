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
    <div>
      <h2>Available slots</h2>

      {slots.map((item) => (
        <Card key={item._id || item.date + item.startTime}>
          <CardHeader>
            <CardTitle>Session slot</CardTitle>
          </CardHeader>

          {item.isBooked ? (
            <CardContent>Slot not available</CardContent>
          ) : (
            <CardContent>
              <strong>{item.date}</strong> — {item.startTime} to{" "}
              {item.endTime}
              <br/>
            <Button onClick={handleBooking(item._id)} >Book Now</Button>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};
export default Counsellorslots;
