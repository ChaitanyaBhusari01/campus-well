const express = require('express');
const studentRouter = express.Router();
const { studentModel, resourceModel ,bookingModel, counsellorModel , helplineModel} = require('../db');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');


studentRouter.get('/resource', studentauth, async function (req, res) {
  try {
    const resources = await resourceModel
      .find({ status: "approved" })
      .populate('uploadedBy', 'name specialization');

    return res.status(200).json({ resources });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem while loading the resources from the library" });
  }
});

studentRouter.get('/counsellors',studentauth ,async function(req,res){
  try{
    const campusId = req.student.campusId;
    const counsellors  = await counsellorModel.find({campusId}).select(-"password");
    if(counsellors.length === 0){
      return res.json({message : "there are no counsellors currently registered for your campus"});
    }
    return res.status(200).json({counsellors});
  }
  catch(error){
    return res.status(500).json({message : "problem while retrirving the counsellors from db"})
  }
});

studentRouter.post('/bookings/:counsellorId/:slot',studentauth,async function(req,res){
  const {counsellorId , slotId } = req.params;
  try{
    const counsellor = await counsellorModel.findOneAndUpdate(
      {_id:counsellorId ,"availability._id" : slotId,"availabilities.isBooked" : false},
      {$set :{ "availability.isBooked" : true}},
      {new : true},
    );
    if(!counsellor){
      return res.status(403).json({message : "the slot is already booked "});
    } 
    else{
      const bookedSlot =counsellor.availability.find(s => s._id.toString() === slotId);

      // Step 3: Create booking record
      const booking = await bookingModel.create({
        studentId,
        counsellorId,
        slotId,
        date: bookedSlot.date,
        startTime: bookedSlot.startTime,
        endTime: bookedSlot.endTime
      });

      res.json({ message: "Booking successful", booking });
    }
  }
  catch(error){
    return res.status(500).json({message : `there was a error while booking a appointment ${error}`});
  }



});

studentRouter.get('/helpline/:language',studentauth,async function (req,res){
  const language = req.params.language;
  try{
    const helplines = await helplineModel.find({language});
    if(helplines.lenght === 0){
      return res.status(403).json({message : "there are no helplines for the specified language"});
    }
    return res.status(200).json({helplines});

  }
  catch(error){
    return res.status(500).json({message :"problem in fetching the helplines from the DB"});
  }
});


module.exports = {
  studentRouter: studentRouter,
};
