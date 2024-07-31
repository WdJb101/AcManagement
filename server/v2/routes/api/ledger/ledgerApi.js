const express = require("express");
const {
  addLedger,
  getLedger,
  delLedger,
} = require("../../../controller/ledgerController");
const _ = express.Router();

_.post("/", addLedger);
_.get("/", getLedger);
_.delete("/:id", delLedger);
module.exports = _;
