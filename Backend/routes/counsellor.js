const express = require('express');
const counsellorRouter = express.Router();
const { counsellorModel, resourceModel } = require('../db');
const JWT = require('jsonwebtoken');
const { counsellorauth } = require('../middlewares/counsellorauth');
const { JWT_COUNSELLOR_SECRET } = require('../config');
const bcrypt = require('bcrypt');


counsellorRouter.post('/resource', counsellorauth, async function (req, res) {
  const { title, description, type, link } = req.body;

  try {
    const resource = await resourceModel.create({
      title,
      description,
      type,
      link,
      status: 'pending',
      uploadedBy: req.counsellor._id,
    });

    return res.status(201).json({ message: "Resource uploaded successfully", resource });
  } catch (error) {
    return res.status(500).json({ message: "Error uploading the resource", error: error.message });
  }
});

module.exports = {
  counsellorRouter: counsellorRouter,
};
