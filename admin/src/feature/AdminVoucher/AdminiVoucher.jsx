import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { CiSaveDown2 } from "react-icons/ci";
import { MdPreview } from "react-icons/md";
import { IoPrintSharp } from "react-icons/io5";
import { IoMdRefreshCircle } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import { IoDocumentTextOutline } from "react-icons/io5";
import ReviceVouchar from "../AdminTransaction/components/ReviceVouchar";
import api from "../../axiosApi/api";
import { Link } from "react-router-dom";
import Heading from "../../shared/components/Heading";

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
    check_No:"",
    check_Data:"",
    payment_method:""
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
    let narrationText = "";

    if (formData.payment_method === "Cash") {
      if (isType) {
        // Payment with Cash
        narrationText = `Payment made into ${formData.ledger_type} in Cash`;
      } else {
        // Receive with Cash
        narrationText = `Cash received from ${formData.ledger_type}`;
      }
    } else if (formData.payment_method === "Bank") {
      if (isType) {
        // Payment with Bank
        narrationText = `Payment made into ${formData.ledger_type} through ${
          formData.transation_with ? formData.transation_with : ""
        }`;
      } else {
        // Receive with Bank
        narrationText = `${
          formData.transation_with ? formData.transation_with : ""
        } received check from ${formData.ledger_type}`;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      narration: narrationText,
    }));
  }, [
    formData.ledger_type,
    formData.payment_method,
    formData.transation_with,
    isType,
  ]);

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
    <div className="  min-h-screen">
      <div className=" lg:px-7 px-4 container  py-8  mx-auto rounded-lg">
       <Heading>Transaction Voucher</Heading>
        <div className="py-6 ">
          <div className="flex flex-col items-start justify-start py-5  rounded-lg mt-6 w-full">
            <div className="relative flex justify-center items-center  bg-white shadow-inner rounded-lg p-1 w-full max-w-xs mx-auto">
              <div
                className={`absolute left-0 top-0 w-1/2 bg-[#004282]  rounded h-full transition-transform duration-500 ease-in-out transform ${
                  isType ? "translate-x-0" : "translate-x-full"
                }`}
              ></div>
              <button
                className={`z-10 w-1/2 text-center py-1 font-semibold transition-colors duration-500 ease-in-out ${
                  isType ? "text-white" : "text-[#004282]"
                }`}
                onClick={() => setIsType(true)}
              >
                Payment
              </button>
              <button
                className={`z-10 w-1/2 text-center py-1 font-semibold transition-colors duration-500 ease-in-out ${
                  !isType ? "text-white" : "text-[#004282]"
                }`}
                onClick={() => setIsType(false)}
              >
                Receive
              </button>
            </div>
          </div>
          <div className="mt-6 grid lg:grid-cols-2 py-6 gap-8">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                required
                value={formData.posting_date}
                onChange={handleChange}
                type="date"
                name="posting_date"
                className="peer text-sm h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
              />
              <label className="absolute left-0 -top-3 font-medium text-[#004886] transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight">
                Posting Date
              </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                required
                value={formData.transation_with}
                onChange={handleChange}
                type="text"
                name="transation_with"
                placeholder="Enter Transaction With"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
              />
              <label className="absolute left-0 -top-3 font-medium text-[#004886] transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#004886]">
                Transaction With
              </label>
            </div>
            <div className="flex items-center mt-4 justify-between w-full">
              <div className="relative h-11 w-full min-w-[200px]">
                <select
                  value={formData.ledger_type}
                  name="ledger_type"
                  required
                  onClick={() => ledgerFn()}
                  onChange={handleChange}
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
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
                <label className="absolute left-0 -top-3 font-medium text-[#004886] transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#004886]">
                  Ledger Type
                </label>
              </div>
              <Link
                state={"true"}
                to="/admin/ledger"
                className="ml-3 flex items-center bg-[#004886] text-white py-[3px] px-2 text-center rounded text-xs font-semibold hover:bg-[#003366] transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Add Ledger
              </Link>
            </div>

            <div className="flex items-center mt-5 space-x-6">
              <p className="text-[#004886] text-sm font-medium ">
                Choice Payment Method :
              </p>
              <label className="flex items-center text-[#004886]">
                <input
                  type="checkbox"
                  name="payment_method"
                  value="Cash"
                  checked={formData.payment_method === "Cash"}
                  onChange={handleChange}
                  className="mr-2 rounded border-gray-300 text-[#004886] focus:ring-[#004886]"
                />
                <span className="text-sm font-medium">Cash</span>
              </label>
              <label className="flex items-center text-[#004886]">
                <input
                  type="checkbox"
                  name="payment_method"
                  value="Bank"
                  checked={formData.payment_method === "Bank"}
                  onChange={handleChange}
                  className="mr-2 rounded border-gray-300 text-[#004886] focus:ring-[#004886]"
                />
                <span className="text-sm font-medium">Bank</span>
              </label>
            </div>
            {formData.payment_method === "Bank" && (
              <>
                <div className="relative h-11 mt-4 w-full">
                  <input
                    value={formData.check_No}
                    onChange={handleChange}
                    type="text"
                    name="check_No"
                    placeholder="Enter check No"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
                  />
                  <label className="absolute left-0 -top-3 font-medium text-[#004886] transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#004886]">
                    Check No
                  </label>
                </div>
                <div className="relative h-11 mt-4 w-full min-w-[200px]">
                  <input
                    required
                    value={formData.check_Data}
                    onChange={handleChange}
                    type="date"
                    name="check_Data"
                    className="peer text-sm h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
                  />
                  <label className="absolute left-0 -top-3 font-medium text-[#004886] transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight">
                    Check Date
                  </label>
                </div>
              </>
            )}
            <div className="relative h-11 mt-4 w-full min-w-[200px]">
              <input
                required
                disabled
                value={formData.narration}
                onChange={handleChange}
                name="narration"
                placeholder="Please Select Ledger Type"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
              />
              <label className="absolute left-0 -top-3 font-medium text-[#004886] transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#004886]">
                Narration
              </label>
            </div>
            <div className="relative h-11 mt-4 w-full min-w-[200px]">
              <input
                required
                value={formData.amount}
                onChange={handleChange}
                type="number"
                name="amount"
                placeholder="Enter Amount"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
              />
              <label className="absolute left-0 -top-3 font-medium text-[#004886] transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#004886]">
                Amount
              </label>
            </div>
          </div>

          <div className="py-6 flex gap-2 justify-between">
            <button
              onClick={handleAdd}
              className="py-[6px] px-3 flex items-center text-sm gap-2 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
            >
              <CiSaveDown2 className="text-lg font-bold" />
              <p className="font-semibold text-xs">Save</p>
            </button>
            <button
              onClick={() => setPreview((prev) => !prev)}
              className="py-[6px] px-3 flex items-center gap-2 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
            >
              <MdPreview className="text-lg font-bold" />
              <p className="font-semibold text-xs">Preview</p>
            </button>
            <button
              onClick={onPrint}
              className="py-[6px] px-3 flex items-center gap-2 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
            >
              <IoPrintSharp className="text-lg font-bold" />
              <p className="font-semibold text-xs">Print</p>
            </button>
            <button
              onClick={handleRefresh}
              className="py-[6px] px-3 flex items-center gap-2 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
            >
              <IoMdRefreshCircle className="text-lg font-bold" />
              <p className="font-semibold text-xs">Refresh</p>
            </button>
          </div>
          {preview ? (
            <div className="flex items-center justify-center max-w-4xl mx-auto  h-full py-10">
              <div
                ref={componentRef}
                className="transition-all w-full duration-500"
              >
                <ReviceVouchar formData={formData} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center  h-full py-10">
              <div className="text-center bg-white rounded-lg p-6 border border-dashed border-[#7E4282]">
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
    </div>
  );
};

export default AdminiVoucher;
