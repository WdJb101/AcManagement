import React, { useState, useRef, useEffect } from "react";
import api from "../../../axiosApi/api";
import { BiMessageAltAdd } from "react-icons/bi";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiSaveDown2 } from "react-icons/ci";
import { MdPreview } from "react-icons/md";
import { IoPrintSharp } from "react-icons/io5";
import { IoMdRefreshCircle } from "react-icons/io";
import ReviceVouchar from "../components/ReviceVouchar";
import { useReactToPrint } from "react-to-print";
import { IoDocumentTextOutline } from "react-icons/io5"; // Import this icon

const AdminTransaction = () => {
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
    v_no:""
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
        console.log(res.data.data.v_no)
        setFormData((prevData) => ({
          ...prevData,
          v_no : res.data.data.v_no,
        }));
        toast.success("Successfully Added ledger");
        setIsSave(true);
      }
    } catch (error) {
      toast.error("Add Failed");
      setLoader(false);
    }
    console.log(res);
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
      handlePrint()
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

  return (
    <div className="container lg:px-7 px-4 lg:py-4 min-h-screen bg-[#F4F5F9] mx-auto">
      <div>
        <h1 className="text-center lg:py-4  py-4 text-3xl text-[#004282] font-bold ">
          Transaction
        </h1>
      </div>
      <div className="max-w-[1050px] gap-8 lg:flex   justify-between mx-auto">
        <div className="lg:w-[40%]">
          <div className="mt-4">
            <h1 className="font-semibold">Posting Date</h1>
            <div className="relative mt-[10px]">
              <input
                required
                value={formData.posting_date}
                onChange={handleChange}
                type="date"
                name="posting_date"
                className="border focus:outline-none w-full py-2 rounded-lg px-4 text-base"
              />
            </div>
          </div>

          <div className="mt-4">
            <h1 className="font-semibold">Transaction With</h1>
            <div className="relative mt-[10px]">
              <input
                required
                value={formData.transation_with}
                onChange={handleChange}
                type="text"
                name="transation_with"
                placeholder="Enter Transaction With"
                className="border focus:outline-none w-full py-2 rounded-lg px-4 text-base"
              />
            </div>
          </div>

          <div className="relative mt-4">
            <h1 className="font-semibold">Ledger Type</h1>
            <select
              value={formData.ledger_type}
              name="ledger_type"
              required
              onClick={() => ledgerFn()}
              onChange={handleChange}
              className="border focus:outline-none w-full mt-[10px] py-2 rounded-lg px-4 text-base"
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
          <div className="relative mt-4">
            <h1 className="font-semibold">CR Account</h1>
            <select
              value={formData.cr_acc}
              name="cr_acc"
              required
              onClick={ledgerFn}
              onChange={handleChange}
              className="border focus:outline-none w-full mt-[10px] py-2 rounded-lg px-4 text-base"
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
          <div className="mt-4">
            <h1 className="font-semibold">Amount</h1>
            <div className="relative mt-[10px]">
              <input
                required
                value={formData.amount}
                onChange={handleChange}
                type="number"
                name="amount"
                placeholder="Enter Amount"
                className="border focus:outline-none w-full py-2 rounded-lg px-4 text-base"
              />
            </div>
          </div>

          <div className="mt-4">
            <h1 className="font-semibold">Narration</h1>
            <div className="relative mt-[10px]">
              <input
                required
                disabled
                value={formData.narration}
                onChange={handleChange}
                name="narration"
                placeholder="Please Select Ledger Type and CR Account"
                className="border focus:outline-none w-full py-2 rounded-lg px-4 text-base"
              />
            </div>
          </div>

          <div className="py-6 flex gap-1 justify-between">
            <button
              onClick={handleAdd}
              className="py-[4px] flex  items-center gap-1  px-2 rounded-md bg-[#004282] hover:text-[#004282] transition-colors text-xs text-white hover:bg-gray-300"
            >
              <CiSaveDown2 className="text-base font-bold" />
              <p className="font-semibold">Save</p>
            </button>
            <button
              onClick={() => setPreview((prev) => !prev)}
              className="py-[4px] flex  items-center gap-1  px-2 rounded-md bg-[#004282] hover:text-[#004282] transition-colors text-xs text-white hover:bg-gray-300"
            >
              <MdPreview className="text-base font-bold" />
              <p className="font-semibold">Preview</p>
            </button>
            <button
              onClick={onPrint}
              className="py-[4px] flex  items-center gap-1  px-2 rounded-md bg-[#004282] hover:text-[#004282] transition-colors text-xs text-white hover:bg-gray-300"
            >
              <IoPrintSharp className="text-base font-bold" />
              <p className="font-semibold">Print</p>
            </button>
            <button
              onClick={handleRefresh}
              className="py-[4px] flex  items-center gap-1  px-2 rounded-md bg-[#004282] hover:text-[#004282] transition-colors text-xs text-white hover:bg-gray-300"
            >
              <IoMdRefreshCircle className="text-base font-bold" />
              <p className="font-semibold">Refresh</p>
            </button>
          </div>
        </div>
        {preview ? (
          <div className="flex items-center  justify-center lg:w-[60%] h-full py-10">
            <div ref={componentRef} className="transition-all w-full duration-500">
              <ReviceVouchar formData={formData} />
            </div>
          </div>
        ) : (
          <div className="flex items-center  justify-center lg:w-[60%] h-full py-10">
            <div className="text-center bg-white rounded-lg  p-6 border border-dashed border-[#7E4282]">
              <div className="text-[#7E4282] text-4xl mb-4">
                <IoDocumentTextOutline className="mx-auto" />
              </div>
              <h1 className="text-[#004282] font-bold text-xl mb-2">
                Transaction Received Voucher
              </h1>
              <p className="text-gray-500 text-base">
                Your transaction received voucher will be displayed here once
                you have selected and saved a transaction.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTransaction;
