const express = require("express");
const _ = express.Router();
const assetAsyncLiability = require("../../../../middle/assetAsyncLiability");
const revenewAsyncExpense = require("../../../../middle/revenueAsyncExpense");
const {
  newTransaction,
  monthlyTranscation,
  delTransaction,
} = require("../../../controller/transaction/tranController");
_.post("/", assetAsyncLiability, revenewAsyncExpense, newTransaction);
_.get("/", monthlyTranscation); //?http://localhost:8080/acms/api/v1/transaction?ac_name=Revenew&this_month=05-05-2024&page=1&limit=4&fields=transaction_by,debit,credit,createdAt,-_id&transaction_by=Hasan Dev
_.delete("/delete", delTransaction);
module.exports = _;
