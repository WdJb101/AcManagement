const express = require("express");
const _ = express.Router();

const {
  postCashbook,
  monthlyCahReport,
} = require("../../../controller/cashBook/cashbookController");

_.post("/", postCashbook);
_.get("/", monthlyCahReport);
module.exports = _;
