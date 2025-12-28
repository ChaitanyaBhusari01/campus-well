const express = require("express");
const { resourceModel } = require("../db");

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

module.exports = { counsellorRouter };
