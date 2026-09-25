import express from "express";
const router = express.Router();
import mongoose from "mongoose";
const CreditCard = require("../models/creditCard");

router.post("/", (req, res) => {
  const { ccNumber, expiration, ccv } = req.body || {};

  const missingFields = ["ccNumber", "expiration", "ccv"].filter(
    (field) => !req.body || !req.body[field],
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Missing required credit card fields",
      fields: missingFields,
    });
  }

  const creditCard = new CreditCard({
    ccNumber,
    expiration,
    ccv,
  });
  console.log("Saving CreditCard");
  creditCard
    .save()
    .then((result) => {
      res.status(201).json({
        message: "CreditCard Saved",
        data: result,
      });
    })
    .catch((error) => {
      console.error("Unable to save CreditCard", error);
      res.status(500).json({
        message: "Unable to save CreditCard",
      });
    });
});

module.exports = router;
