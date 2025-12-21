const express = require('express');
const { resourceModel } = require('../db');
const adminRouter = express.Router();


adminRouter.get('/resource', authMiddleware, async function (req, res) {
  try {
    const resources = await resourceModel
      .find({ status: "pending" })
      .populate("uploadedBy", "name specialization");

    return res.status(200).json({ resources });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in fetching the resources from the DB" });
  }
});

adminRouter.patch('/resource/:id/approved', authMiddleware, async function (req, res) {
  const resourceId = req.params.id;
  if (!resourceId) {
    return res.status(400).json({ message: "No Id of resource is present in the params" });
  }

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

    return res.status(200).json({ message: "Resource approved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in approving the resource" });
  }
});

adminRouter.patch('/resource/:id/rejected', authMiddleware, async function (req, res) {
  const resourceId = req.params.id;
  if (!resourceId) {
    return res.status(400).json({ message: "No Id of resource is present in the params" });
  }

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

    return res.status(200).json({ message: "Resource rejected successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in rejecting the resource" });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
