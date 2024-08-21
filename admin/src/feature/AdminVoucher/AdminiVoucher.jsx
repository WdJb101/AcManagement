import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { CiSaveDown2 } from "react-icons/ci";
import { MdPreview } from "react-icons/md";
import { IoPrintSharp } from "react-icons/io5";
import { IoMdRefreshCircle } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import { IoDocumentTextOutline } from "react-icons/io5";
import ReviceVouchar from "../AdminTransaction/components/ReviceVouchar";
import api from "../../axiosApi/api";
const AdminiVoucher = () => {
  const [isType, setIsType] = useState(true);
  const [loader, setLoader] = useState(false);
  const [ledger, setLedger] = useState([]);
  const [preview, setPreview] = useState(false);
  const componentRef = useRef();
  const [isSave, setIsSave] = useState(false);

  const [formData, setFormData] = useState({
    posting_date: "",
    transation_with: "",
    ledger_type: "",
    cr_acc: "",
    amount: "",
    narration: "",
    v_no: "",
    transaction_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //  for narration
  useEffect(() => {
    if (formData.ledger_type && formData.cr_acc) {
      const newValue = `${formData.ledger_type} Paid To  ${formData.cr_acc}`;
      setFormData((prevData) => ({
        ...prevData,
        narration: newValue,
      }));
    }
  }, [formData.ledger_type, formData.cr_acc]);

  //  for post
  const handleAdd = async () => {
    try {
      setLoader(true);
      const res = await api.post("/transaction", formData);
      if (res.status === 201) {
        setLoader(false);
        console.log(res.data.data.v_no);
        setFormData((prevData) => ({
          ...prevData,
          v_no: res.data.data.v_no,
        }));
        toast.success("Successfully Added ledger");
        setIsSave(true);
      }
    } catch (error) {
      toast.error("Add Failed");
      setLoader(false);
    }
  };
  //  for get
  const ledgerFn = async () => {
    try {
      const res = await api.get("/ledger");
      setLedger(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //  for print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const onPrint = () => {
    if (isSave) {
      setPreview(true);
      handlePrint();
    } else {
      toast.error("Please Save First");
    }
  };

  // for refresh
  const handleRefresh = () => {
    setPreview(false);
    setIsSave(false);
    setFormData({
      posting_date: "",
      transation_with: "",
      ledger_type: "",
      cr_acc: "",
      amount: "",
      narration: "",
    });
  };
  useEffect(() => {
    if (isType) {
      setFormData((prevData) => ({
        ...prevData,
        transaction_type: "Payment",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        transaction_type: "Receive",
      }));
    }
  }, [isType]);

  return (
    <div className=" bg-[#F2F3F7]">
     <div className="max-w-[1050px] lg:px-7 px-4 py-8 bg-white shadow-lg mx-auto rounded-lg">
  {/* Form Header */}
  <div>
    <h1 className="text-center text-3xl text-[#004282] font-bold">
      Voucher
    </h1>
  </div>

  {/* Transaction Type Toggle */}
  <div className="flex flex-col items-center justify-start py-5 bg-gray-100 rounded-lg mt-6">
    <h2 className="text-xl font-semibold text-[#394f64] py-1 mb-2">
      Choose Transaction Type
    </h2>
    <div className="relative flex justify-center items-center bg-white shadow-inner rounded-full p-1 w-64">
      <div
        className={`absolute left-0 top-0 w-1/2 bg-gradient-to-r from-[#394f64] to-[#004282] rounded-full h-full transition-transform duration-500 ease-in-out transform ${
          isType ? "translate-x-0" : "translate-x-full"
        }`}
      ></div>
      <button
        className={`z-10 w-1/2 text-center py-1 px-4 font-semibold transition-colors duration-500 ease-in-out ${
          isType ? "text-white" : "text-gray-600"
        }`}
        onClick={() => setIsType(true)}
      >
        Payment
      </button>
      <button
        className={`z-10 w-1/2 text-center py-1 px-4 font-semibold transition-colors duration-500 ease-in-out ${
          !isType ? "text-white" : "text-gray-600"
        }`}
        onClick={() => setIsType(false)}
      >
        Receive
      </button>
    </div>
  </div>

  {/* Form Fields Section */}
  <div className="lg:flex justify-between mt-6 gap-8">
    <div className="lg:w-[40%]">
      {/* Posting Date */}
      <div className="mt-4">
        <h1 className="font-semibold text-[#394f64]">Posting Date</h1>
        <input
          required
          value={formData.posting_date}
          onChange={handleChange}
          type="date"
          name="posting_date"
          className="border focus:outline-none w-full py-2 rounded-lg px-4 mt-2 text-base"
        />
      </div>

      {/* Transaction With */}
      <div className="mt-4">
        <h1 className="font-semibold text-[#394f64]">Transaction With</h1>
        <input
          required
          value={formData.transation_with}
          onChange={handleChange}
          type="text"
          name="transation_with"
          placeholder="Enter Transaction With"
          className="border focus:outline-none w-full py-2 rounded-lg px-4 mt-2 text-base"
        />
      </div>

      {/* Ledger Type */}
      <div className="mt-4">
        <h1 className="font-semibold text-[#394f64]">Ledger Type</h1>
        <select
          value={formData.ledger_type}
          name="ledger_type"
          required
          onClick={() => ledgerFn()}
          onChange={handleChange}
          className="border focus:outline-none w-full py-2 rounded-lg px-4 mt-2 text-base"
        >
          <option disabled selected hidden value="">
            Select
          </option>
          {ledger?.map((item) => (
            <option key={item._id} value={item?.ledger_name}>
              {item?.ledger_name}
            </option>
          ))}
        </select>
      </div>

      {/* CR Account */}
      <div className="mt-4">
        <h1 className="font-semibold text-[#394f64]">CR Account</h1>
        <select
          value={formData.cr_acc}
          name="cr_acc"
          required
          onClick={ledgerFn}
          onChange={handleChange}
          className="border focus:outline-none w-full py-2 rounded-lg px-4 mt-2 text-base"
        >
          <option disabled selected hidden value="">
            Select
          </option>
          {ledger?.map((item) => (
            <option key={item._id} value={item?.ledger_name}>
              {item?.ledger_name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div className="mt-4">
        <h1 className="font-semibold text-[#394f64]">Amount</h1>
        <input
          required
          value={formData.amount}
          onChange={handleChange}
          type="number"
          name="amount"
          placeholder="Enter Amount"
          className="border focus:outline-none w-full py-2 rounded-lg px-4 mt-2 text-base"
        />
      </div>

      {/* Narration */}
      <div className="mt-4">
        <h1 className="font-semibold text-[#394f64]">Narration</h1>
        <input
          required
          disabled
          value={formData.narration}
          onChange={handleChange}
          name="narration"
          placeholder="Please Select Ledger Type and CR Account"
          className="border focus:outline-none w-full py-2 rounded-lg px-4 mt-2 text-base"
        />
      </div>

      {/* Buttons */}
      <div className="py-6 flex gap-2 justify-between">
        <button
          onClick={handleAdd}
          className="py-2 px-4 flex items-center gap-2 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
        >
          <CiSaveDown2 className="text-lg font-bold" />
          <p className="font-semibold text-xs">Save</p>
        </button>
        <button
          onClick={() => setPreview((prev) => !prev)}
          className="py-2 px-4 flex items-center gap-2 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
        >
          <MdPreview className="text-lg font-bold" />
          <p className="font-semibold text-xs">Preview</p>
        </button>
        <button
          onClick={onPrint}
          className="py-2 px-4 flex items-center gap-2 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
        >
          <IoPrintSharp className="text-lg font-bold" />
          <p className="font-semibold text-xs">Print</p>
        </button>
        <button
          onClick={handleRefresh}
          className="py-2 px-4 flex items-center gap-2 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
        >
          <IoMdRefreshCircle className="text-lg font-bold" />
          <p className="font-semibold text-xs">Refresh</p>
        </button>
      </div>
    </div>

    {/* Preview Section */}
    {preview ? (
      <div className="flex items-center justify-center lg:w-[60%] h-full py-10">
        <div
          ref={componentRef}
          className="transition-all w-full duration-500"
        >
          <ReviceVouchar formData={formData} />
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center lg:w-[60%] h-full py-10">
        <div className="text-center bg-white rounded-lg p-6 border border-dashed border-[#7E4282]">
          <div className="text-[#7E4282] text-4xl mb-4">
            <IoDocumentTextOutline className="mx-auto" />
          </div>
          <h1 className="text-[#004282] font-bold text-xl mb-2">
            Transaction Received Voucher
          </h1>
          <p className="text-gray-500 text-base">
            Your transaction received voucher will be displayed here once you have selected and saved a transaction.
          </p>
        </div>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default AdminiVoucher;
