const express = require("express");
const _ = express.Router();
const { newAcc, getByAcc } = require("../../../controller/opernAcc");

_.post("/", newAcc);
_.get("/:ac_name", getByAcc);

module.exports = _;
