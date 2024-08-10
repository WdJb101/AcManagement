const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    ledger_name: { type: String, required: true },
    balance_type: {
      type: String,
      enum: ["dr", "cr"],
    },
    acc_group: {
      type: String,
      required: true,
      enum: ["Asset", "Expense", "Dividen", "Liability", "Equity", "Revenew"],
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.pre("save", function (next) {
  if (["Asset", "Expense", "Dividen"].includes(this.acc_group)) {
    this.balance_type = "dr";
  } else {
    this.balance_type = "cr";
  }
  next();
});
module.exports = { Ledger: mongoose.model("Ledger", accountSchema) };
