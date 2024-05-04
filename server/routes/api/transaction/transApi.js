const express = require("express");
const _ = express.Router();
const assetAsyncLiability = require("../../../middle/assetAsyncLiability");
const {
  newTransaction,
  monthlyTranscation,
} = require("../../../controller/transaction/tranController");
_.post("/", assetAsyncLiability, newTransaction);
_.get("/", monthlyTranscation); //?ac_name=Asset&from_date=5-04-2024&to_date=6-05-2024
module.exports = _;
