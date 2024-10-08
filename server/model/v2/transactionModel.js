const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const { Ledger } = require("./ledgerModel");

const itemListSchema = new Schema({
  item_name: { type: String, default: "" },
  item_quantity: { type: Number, default: 0 },
  item_price: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});

const transactionSchema = new Schema(
  {
    v_no: { type: String },
    posting_date: { type: Date, default: new Date() },
    transation_with: { type: String, default: "" },
    ledger_type: { type: String, required: true },
    cr_acc: { type: String, required: true },
    amount: { type: Number, default: 0 },
    narration: { type: String, default: "" },
    balance_type: { type: String, enum: ["dr", "cr"] },
    transaction_type: { type: String, default: "" },
    check_No: { type: String, default: "" },
    check_Date: { type: String, default: "" },
    item_List: [itemListSchema],
    total_Price: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

transactionSchema.pre("save", async function (next) {
  const findLedger = await Ledger.findOne({ ledger_name: this.ledger_type });
  // if (["Asset", "Expense", "Dividen"].includes(this.ledger_type)) {
  //   this.balance_type = "dr";
  // } else {
  //   this.balance_type = "cr";
  // }

  this.balance_type = findLedger.balance_type;
  next();
});
transactionSchema.plugin(mongoosePaginate);
module.exports = {
  Transcation_n: mongoose.model("Transcation_n", transactionSchema),
};
