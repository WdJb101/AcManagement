const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const transactionSchema = new Schema(
  {
    ac_name: {
      type: String,
      required: true,
      enum: ["Asset", "Expense", "Dividen", "Liability", "Equity", "Revenew"],
    },
    ac_id: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    transaction_name: {
      type: String,
      required: true,
    },
    transaction_by: {
      type: String,
      default: "",
    },
    transaction_type: {
      type: String,

      enum: ["dr", "cr"],
    },
    debit: {
      type: Number,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);
transactionSchema.pre("save", function (next) {
  if (["Asset", "Expense", "Dividen"].includes(this.ac_name)) {
    this.transaction_type = "dr";
  } else {
    this.transaction_type = "cr";
  }
  next();
});
transactionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Transcation", transactionSchema);
