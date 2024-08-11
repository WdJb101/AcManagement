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

const AdminTransaction = () => {
  const [loader, setLoader] = useState(false);
  const [ledger, setLedger] = useState([]);
  const [preview, setPreview] = useState(false);
  const componentRef = useRef();

  const [formData, setFormData] = useState({
    posting_date: "",
    transation_with: "",
    ledger_type: "",
    cr_acc: "",
    amount: "",
    narration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
   
  };


  useEffect(()=>{
      if(formData.ledger_type && formData.cr_acc ){
          const newValue= `${formData.ledger_type} Paid To  ${formData.cr_acc}`;
          setFormData((prevData) => ({
            ...prevData,
            narration: newValue,
          }));
      }
  },[formData.ledger_type,formData.cr_acc])
  const handleAdd = async () => {
    try {
      setLoader(true);
      const res = await api.post("/transaction", formData);
      if (res.status === 201) {
        setLoader(false);
        toast.success("Successfully Added ledger");
        setFormData({
          posting_date: "",
          transation_with: "",
          ledger_type: "",
          cr_acc: "",
          amount: "",
          narration: "",
        });
      }
    } catch (error) {
      toast.error("Add Failed");
      setLoader(false);
    }
    console.log(res);
  };

  const ledgerFn = async () => {
    try {
      const res = await api.get("/ledger");
      setLedger(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container px-8 lg:py-10 min-h-screen bg-[#F4F5F9] mx-auto">
      <div>
        <h1 className="text-center lg:py-10  py-4 text-3xl text-[#004282] font-bold ">
          Transaction
        </h1>
      </div>
      <div className="max-w-5xl gap-8 lg:flex   justify-between mx-auto">
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
                placeholder="Enter Narration"
                className="border focus:outline-none w-full py-2 rounded-lg px-4 text-base"
              />
            </div>
          </div>

          <div className="py-3 flex gap-1 justify-between">
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
              onClick={handlePrint}
              className="py-[4px] flex  items-center gap-1  px-2 rounded-md bg-[#004282] hover:text-[#004282] transition-colors text-xs text-white hover:bg-gray-300"
            >
              <IoPrintSharp className="text-base font-bold" />
              <p className="font-semibold">Print</p>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="py-[4px] flex  items-center gap-1  px-2 rounded-md bg-[#004282] hover:text-[#004282] transition-colors text-xs text-white hover:bg-gray-300"
            >
              <IoMdRefreshCircle className="text-base font-bold" />
              <p className="font-semibold">Refresh</p>
            </button>
          </div>
        </div>
        {preview && (
          <div
            ref={componentRef}
            className="transition-all w-[50%] duration-500"
          >
            <ReviceVouchar formData={formData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTransaction;
