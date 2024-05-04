const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    transaction_ref_list: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction ",
      },
    ],

    balance_type: {
      type: String,

      enum: ["dr", "cr"],
    },
    balance: {
      type: Number,
      default: 0,
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

accountSchema.pre("save", function (next) {
  if (["Asset", "Expense", "Dividen"].includes(this.ac_name)) {
    this.balance_type = "dr";
  } else {
    this.balance_type = "cr";
  }
  next();
});
module.exports = mongoose.model("Account", accountSchema);
