const express = require("express");
const _ = express.Router();
const assetAsyncLiability = require("../../../middle/assetAsyncLiability");
const revenewAsyncExpense = require("../../../middle/revenueAsyncExpense");
const {
  newTransaction,
  monthlyTranscation,
  delTransaction,
} = require("../../../controller/transaction/tranController");
_.post("/", assetAsyncLiability, revenewAsyncExpense, newTransaction);
_.get("/", monthlyTranscation); //?ac_name=Asset&from_date=5-04-2024&to_date=6-05-2024
_.delete("/delete", delTransaction);
module.exports = _;
