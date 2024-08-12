import React from 'react';
import logo from "../../../assets/logo/main-logo.png"
// import logo2 from "../../../assets/logo/weepoka-logo-01.png"
const ReviceVouchar = ({ formData }) => {
  return (
    <div className="w-full mx-auto lg:p-6 p-3 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-lg">
  <div className="text-center mb-8">
    {/* <img className='w-36 border' src={logo2} alt="" /> */}
    <h1 className="text-3xl text-[#004282] font-bold">Weepok</h1>
    <div className="relative mt-4">
      <img
        src={logo}
        alt="Logo"
        className="absolute top-[150px] inset-0 opacity-10 w-full"
      />
    </div>
    <p className="text-gray-600 text-sm font-medium">
      Flat-A1, Holy Garden, House-2/1, Road-2, Mirpur-2, Dhaka
    </p>
    <p className="text-gray-600 italic text-lg py-4">
      "Bridging the gap between trust and transactions"
    </p>
  </div>

  <div className="mb-6">
  { formData.transaction_type&& <div className="flex justify-between items-center mb-4">
      <div className="flex items-center w-full">
        <span className="font-semibold">Transaction Type:</span>
        <span className="ml-2">{formData.transaction_type}</span>
      </div>
    </div>}
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center w-[50%]">
        <span className="font-semibold">Voucher No:</span>
        <span
          className={`ml-2 border w-[100px] border-gray-300 ${
            !formData.v_no ? "py-[14px]" : "py-[3px]"
          } text-center`}
        >
          {formData.v_no}
        </span>
      </div>
      <div className="flex items-center justify-end w-[50%]">
        <span className="font-semibold">Posting Date:</span>
        <span
          className={`ml-2 w-[100px] border border-gray-300 ${
            !formData.posting_date ? "py-[14px]" : "py-[3px]"
          } text-center`}
        >
          {formData.posting_date}
        </span>
      </div>
    </div>
  </div>

  <hr className="my-4 border-gray-400" />

  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="font-semibold">Transaction With:</span>
      <span>{formData.transation_with}</span>
    </div>
    <div className="flex justify-between mb-2">
      <span className="font-semibold">Ledger Type:</span>
      <span>{formData.ledger_type}</span>
    </div>
    <div className="flex justify-between mb-2">
      <span className="font-semibold">CR Account:</span>
      <span>{formData.cr_acc}</span>
    </div>
    <div className="flex justify-between mb-2">
      <span className="font-semibold">Amount:</span>
      {formData.amount && <span>{formData.amount} TAKA</span>}
    </div>
    <div className="mb-2 flex">
      <span className="font-semibold">Narration:</span>
      <p className="ml-2">{formData.narration}</p>
    </div>
  </div>

  <div className="mt-8 text-right">
    <span className="font-semibold">Authorized Signature:</span>
    <div className="border-b border-gray-400 w-1/2 ml-auto mt-2"></div>
  </div>

  <div className="text-center text-xs text-gray-500 mt-6">
    <p className="">
      Prioritize a seamless user experience and secure design. Embrace the
      spirit of purity in every aspect of life.
    </p>
    <p className="text-[#004282]">Please retain it for your records.</p>
  </div>
</div>

  
  
  
  );
};

export default ReviceVouchar;