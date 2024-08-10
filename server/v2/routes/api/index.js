const express = require("express");
const _ = express.Router();
const ledger = require("./ledger/ledgerApi");
const transaction = require("./transaction/transApi");
const repo = require("./report/ledgerRepoApi");

_.use("/ledger", ledger);
_.use("/transaction", transaction);
_.use("/report", repo);
module.exports = _;
