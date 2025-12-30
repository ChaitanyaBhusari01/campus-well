const express = require("express");
const studentRouter = express.Router();

const {
  resourceModel,
  bookingModel,
  counsellorModel,
  helplineModel,
  studentModel,
} = require("../db");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roles");

studentRouter.get(
  "/resource",
  authMiddleware,
  roleMiddleware(["student"]),
  async function (req, res) {
    try {
      const resources = await resourceModel
        .find({ status: "approved" })
        .populate("uploadedBy", "name specialization");

      return res.status(200).json({ resources });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Problem while loading resources",
      });
    }
  }
);


studentRouter.get(
  "/helplines",
  authMiddleware,
  roleMiddleware(["student"]),
  async function (req, res) {
    try {
      const helplines = await helplineModel.find({});

      if (helplines.length === 0) {
        return res.status(404).json({
          message: "No helplines available",
        });
      }

      return res.status(200).json({ helplines });
    } catch (error) {
      return res.status(500).json({
        message: "Problem fetching helplines",
      });
    }
  }
); 


studentRouter.get(
  "/counsellors",
  authMiddleware,
  roleMiddleware(["student"]),
  async function (req, res) {
    try {
      const student = await studentModel.findById(req.user.refId);
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }

      const counsellors = await counsellorModel.find({
        campusId: student.campusId,
      });

      if (counsellors.length === 0) {
        return res.json({
          message: "No counsellors registered for your campus",
        });
      }

      return res.status(200).json({ counsellors });
    } catch (error) {
      return res.status(500).json({
        message: "Problem retrieving counsellors",
      });
    }
  }
);

studentRouter.get("/counsellors/:counsellorId", async (req, res) => {
  const { counsellorId } = req.params;

  try{
    const counsellor = await counsellorModel.findOne({_id : counsellorId});
    if(!counsellor){
      return res.status(404).json({message : "Counsellor not found"});
    }
    return res.status(200).json({  availability : counsellor.availability})

  }
  catch(error){
    res.status(500).json({message : "Error fetching the slots"});
  }

})


studentRouter.post(
  "/bookings/:counsellorId/:slotId",
  authMiddleware,
  roleMiddleware(["student"]),
  async function (req, res) {
    const { counsellorId, slotId } = req.params;

    try {
      const counsellor = await counsellorModel.findOneAndUpdate(
        {
          _id: counsellorId,
          "availability._id": slotId,
          "availability.isBooked": false,
        },
        {
          $set: { "availability.$.isBooked": true },
        },
        { new: true }
      );

      if (!counsellor) {
        return res
          .status(403)
          .json({ message: "Slot already booked or invalid" });
      }

      const bookedSlot = counsellor.availability.find(
        (s) => s._id.toString() === slotId
      );

      const booking = await bookingModel.create({
        studentId: req.user.refId,
        counsellorId,
        date: bookedSlot.date,
        slot: `${bookedSlot.startTime}-${bookedSlot.endTime}`,
      });

      return res.status(201).json({
        message: "Booking successful",
        booking,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error while booking appointment",
      });
    }
  }
);

studentRouter.post("/post",authMiddleware,role["student"],upload.singe("image") , async (req,res)=>{
  try{
    const {title , content} = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if(!title || !content){
      return res.status(400).json({message : "Title and content are required"});
    }

    const newPost = await postModel.create({
      author : req.user.refId,
      title,
      content,
      imageUrl : imageUrl,
    });
    res.status(201).json({message : "Post created successfully", post : newPost});

  }
  catch(error){
    res.status(500).json({message : "Error creating post"});
  }
})





module.exports = { studentRouter };
