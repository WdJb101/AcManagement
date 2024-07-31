const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const transactionSchema = new Schema(
  {
    v_no: { type: String },
    posting_date: { type: Date, default: new Date() },
    transation_with: { type: String, default: "" },
    ledger_type: { type: String, required: true },
    cr_acc: { type: String, required: true },
    amount: { type: Number, default: 0 },
    narration: { type: String, default: "" },
  },
  

  {
    timestamps: true,
  }
);

transactionSchema.plugin(mongoosePaginate);
module.exports = {
  Transcation: mongoose.model("Transcation", transactionSchema),
};
