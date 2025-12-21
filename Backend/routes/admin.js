const express = require("express");
const { resourceModel } = require("../db");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const adminRouter = express.Router();


adminRouter.get("/resource",authMiddleware,roleMiddleware(["admin"]),async function (req, res) {
    try {
      const resources = await resourceModel
        .find({ status: "pending" })   
        .populate("uploadedBy", "name specialization");

      return res.status(200).json({ resources });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Problem in fetching resources",
      });
    }
  }
);


adminRouter.patch("/resource/:id/approved",authMiddleware,roleMiddleware(["admin"]),
  async function (req, res) {
    const resourceId = req.params.id;

    try {
      const result = await resourceModel.updateOne(
        { _id: resourceId },
        { $set: { status: "approved" } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Resource not found" });
      }

      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: "Resource already approved" });
      }

      return res.status(200).json({
        message: "Resource approved successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Approval failed" });
    }
  }
);

adminRouter.patch("/resource/:id/rejected",authMiddleware,roleMiddleware(["admin"]),async function (req, res) {
    const resourceId = req.params.id;

    try {
      const result = await resourceModel.updateOne(
        { _id: resourceId },
        { $set: { status: "rejected" } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Resource not found" });
      }

      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: "Resource already rejected" });
      }

      return res.status(200).json({
        message: "Resource rejected successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Rejection failed" });
    }
  }
);

module.exports = { adminRouter };
