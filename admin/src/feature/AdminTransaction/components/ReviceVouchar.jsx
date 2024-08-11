import React from 'react';

const ReviceVouchar = ({ formData }) => {
  return (
    <div className="p-4 max-w-2xl mx-auto bg-[#F4F5F9] shadow-md rounded-lg">
      <div className="flex justify-between mb-4 text-[#004282]">
        <div>
          <p className="font-bold">Voucher No: {"sdf"}</p>
        </div>
        <div>
          <p className="font-bold">Posting Date: {formData.posting_date}</p>
        </div>
      </div>
      <div>
      {formData.transation_with}
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#004282] text-white">
            <th className="border p-2 text-left">Particulars</th>
            <th className="border p-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
            <tr className="bg-white hover:bg-[#F4F5F9]">
              <td className="border p-2">
              <p> Ledger Type:{formData.ledger_type}</p>
              </td>
              <td className="border justify-center text-center flex items-center p-2">
                {formData.amount}
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReviceVouchar;