import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";

const Screening = () => {
  const { token } = useAuth();

  const Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking slowly or being unusually restless",
    "Thoughts that you would be better off dead or hurting yourself"
  ];

  const [qnum, setQnum] = useState(0);
  const [answer, setAnswer] = useState(Array(9).fill(null));

  const handleSelect = (value) => {
    const copy = [...answer];
    copy[qnum] = Number(value);
    setAnswer(copy);
  };

  const handleNext = () => {
    if (answer[qnum] === null)
      return alert("Please select an answer first");
    setQnum(qnum + 1);
  };

  const handleSubmit = async () => {
    if (answer.includes(null)) return alert("Please answer all questions");

    try {
      const res = await api.post(
        "/student/screenings/PHQ-9",
        { answers: answer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(
        `Submitted successfully.\nScore: ${res.data.score}\nSeverity: ${res.data.severity}`
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">PHQ-9 Screening</h1>

      <Card>
        <CardHeader>
          <CardTitle>
            Question {qnum + 1} of {Questions.length}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-3">{Questions[qnum]}</p>

          <RadioGroup
            value={answer[qnum]?.toString() ?? ""}
            onValueChange={handleSelect}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="a0" />
              <Label htmlFor="a0">Not at all</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="a1" />
              <Label htmlFor="a1">Several days</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="a2" />
              <Label htmlFor="a2">More than half the days</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="a3" />
              <Label htmlFor="a3">Nearly every day</Label>
            </div>
          </RadioGroup>
        </CardContent>

        <CardFooter>
          {qnum === Questions.length - 1 ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Screening;
