const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    transaction_ref: {
      type: Schema.Types.ObjectId,
      ref: "Transaction ",
    },
    name: {
      type: String,
      required: true,
    },
    balance_type: {
      type: String,
      required: true,
      enum: ["dr", "cr"],
    },

    ac_name: {
      type: String,
      required: true,
      enum: ["Asset", "Expense", "Dividen", "Liability", "Equity", "Revenew"],
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.pre("save", function () {
  if (["Asset", "Expense", "Dividen"].includes(this.ac_name)) {
    this.balance_type = "dr";
  } else {
    this.balance_type = "cr";
  }
});
module.exports = mongoose.model("Account", accountSchema);
