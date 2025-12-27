const express = require("express");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');

const userRouter = express.Router();

const { userModel, counsellorModel, studentModel } = require("../db");
const {JWT_SECRET} = require("../config");

userRouter.post("/signup", async function (req, res) {
  try {
    const {
      name,
      email,
      password,
      campusId,
      campusName,
      role,
      specialization,
    } = req.body;


    if (!["student", "counsellor"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await userModel.findOne({ email : email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please login." });
    }

    let profile;

    if (role === "student") {
      profile = await studentModel.create({
        name,
        campusId,
        campusName,
      });
    }

    if (role === "counsellor") {
      if (!specialization) {
        return res
          .status(400)
          .json({ message: "Specialization is required" });
      }

      profile = await counsellorModel.create({
        name,
        campusId,
        campusName,
        specialization,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email,
      password: hashedPassword,
      role,
      refId: profile._id,
    });

    return res.status(201).json({
      message: "Signup successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Issue during signup" + err,
    });
  }
});

userRouter.post('/login',async function(req,res){
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({
            email:email,
        });
        if(!user){
            return res.json({message : "user is not signed up ,plz signup first"});
        }
        const compare = await bcrypt.compare(password,user.password);
        if(!compare) {
            return res.json({message:"Incorrect credentials"});
        } 
        const token = JWT.sign({
            userId : user._id,
            refId : user.refId,
            role  : user.role, 
        },JWT_SECRET);
        return res.json({message : "login successful" ,token });
    }
    catch(err){
        return res.json({message : "Error while logging in "+err});
    }
    
})

module.exports = { userRouter };
