const express = require("express");
const { resourceModel , counsellorModel} = require("../db");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roles");

const counsellorRouter = express.Router();


counsellorRouter.post("/resource",authMiddleware,roleMiddleware(["counsellor"]),async function (req, res) {
    const { title, description, type, link } = req.body;

    try {
      const resource = await resourceModel.create({
        title,
        description,
        type,
        link,
        status: "pending",
        uploadedBy: req.user.refId, 
      });

      return res.status(201).json({
        message: "Resource uploaded successfully",
        resource,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error uploading the resource",
      });
    }
  }
);

counsellorRouter.post(
  "/availability",
  authMiddleware,
  roleMiddleware(["counsellor"]),
  async function (req, res) {
    try {
      const { date, day, startTime, endTime } = req.body;

      const dateObj = new Date(date);

      // prevent past dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateObj < today) {
        return res.status(400).json({
          message: "Cannot set availability for past dates",
        });
      }

      // push new availability
      await counsellorModel.findByIdAndUpdate(
        req.user.refId,
        {
          $push: {
            availability: {
              date: dateObj,
              day,
              startTime,
              endTime,
              isbooked: false,
            },
          },
        },
        { new: true }
      );

      return res.status(200).json({
        message: "Availability updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating availability",
      });
    }
  }
);


module.exports = { counsellorRouter };
