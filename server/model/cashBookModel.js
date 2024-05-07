const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for Cashdebit
const cashdebitSchema = new Schema(
  {
    datex: { type: Date, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, default: "dr" },
  },
  { timestamps: true }
);

// Define the schema for Cashcredit
const cashcreditSchema = new Schema(
  {
    datex: { type: Date, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, default: "cr" },
  },
  { timestamps: true }
);

// Define the schema for Cashbook
const cashbookSchema = new Schema(
  {
    debit: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cashdebit",
      },
    ],
    credit: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cashcredit",
      },
    ],
  },
  { timestamps: true }
);

const Cashdebit = mongoose.model("Cashdebit", cashdebitSchema);
const Cashcredit = mongoose.model("Cashcredit", cashcreditSchema);
const Cashbook = mongoose.model("Cashbook", cashbookSchema);

module.exports = { Cashdebit, Cashcredit, Cashbook };
