const express = require("express");
const {
  addTrans,
  delTrans,
  getGenTrans,
} = require("../../../controller/transactionController");
const _ = express.Router();

_.post("/", addTrans);
_.delete("/:id", delTrans);
_.get("/", getGenTrans); //? ledger_type ,cr_acc,posting_date,v_no,

module.exports = _;
