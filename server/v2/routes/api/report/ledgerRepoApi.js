const express = require("express");
const { getLedgerRepo } = require("../../../controller/report/ledger");

const _ = express.Router();
_.get("/",getLedgerRepo)

module.exports = _;
