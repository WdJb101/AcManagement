import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { CiSaveDown2 } from "react-icons/ci";
import { MdPreview } from "react-icons/md";
import { IoPrintSharp } from "react-icons/io5";
import { IoMdRefreshCircle } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import { IoDocumentTextOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import api from "../../../axiosApi/api";
import Heading from "../../../shared/components/Heading";
import PurchaseInvoice from "../components/PurchaseInvoice";

const AdminPurchase = () => {
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
    transaction_type: "Purchase",
    check_No: "",
    check_Date: "",
    item_List: [],
    total_Price: null,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //  for post
  const handleAdd = async () => {
    try {
      setLoader(true);
      const updatedFormData = {
        ...formData,
        item_List: items,
        total_Price: totalPrice,
      };

      const newData = Object.keys(updatedFormData).reduce((acc, key) => {
        if (updatedFormData[key]) {
          acc[key] = updatedFormData[key];
        }
        return acc;
      }, {});
      const res = await api.post("/transaction", newData);
      if (res.status === 201) {
        setLoader(false);
        console.log(res.data.data.v_no);
        setFormData((prevData) => ({
          ...prevData,
          v_no: res.data.data.v_no,
        }));
        setFormData({
          posting_date: "",
          transation_with: "",
          ledger_type: "",
          cr_acc: "",
          amount: "",
          narration: "",
          v_no: "",
          transaction_type: "Purchase",
          check_No: "",
          check_Date: "",
          item_List: [],
          total_Price: null,
        });
        setItems([
          { item_name: "", item_quantity: null, item_price: null, total: 0 },
        ]);
        setTotalPrice(0);
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
      check_No: "",
      check_Date: "",
    });
  };

  const [items, setItems] = useState([
    { item_name: "", item_quantity: null, item_price: null, total: 0 },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    if (name === "item_price" || name === "item_quantity") {
      updatedItems[index][name] = value ? parseFloat(value) : 0;
    } else {
      updatedItems[index][name] = value;
    }

    updatedItems[index].total =
      (parseFloat(updatedItems[index].item_price) || 0) *
      (parseInt(updatedItems[index].item_quantity) || 0);

    const newTotalPrice = updatedItems.reduce(
      (sum, item) => sum + item.total,
      0
    );

    setItems(updatedItems);
    setTotalPrice(newTotalPrice);
  };

  const handleAddRow = () => {
    setItems([
      ...items,
      { item_name: "", item_quantity: null, item_price: null, total: 0 },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    const newTotalPrice = updatedItems.reduce(
      (sum, item) => sum + item.total,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  return (
    <div className="  min-h-screen">
      <div className=" lg:px-7 px-4 max-w-7xl  py-8  mx-auto rounded-lg">
        <Heading>Purchase</Heading>
        <div className="py-6 ">
          <div className="mt-6 grid lg:grid-cols-2 py-6 gap-8">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                required
                value={formData.posting_date}
                onChange={handleChange}
                type="date"
                name="posting_date"
                className="peer text-sm h-full w-full border-b border-gray-300 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
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
                className="peer h-full w-full border-b border-blue-gray-200 border-gray-300  bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
              />
              <label className="absolute left-0 -top-3 font-medium text-[#004886] transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#004886]">
                Transaction With
              </label>
            </div>
            <div className="flex items-center  mt-5 justify-between w-full">
              <div className="relative h-11 lg:w-[95%] md:w-[80%] w-[70%] min-w-[180px]">
                <select
                  value={formData.ledger_type}
                  name="ledger_type"
                  required
                  onClick={() => ledgerFn()}
                  onChange={handleChange}
                  className="peer h-full w-full border-b border-gray-300  border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
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
                <label className="absolute left-0 -top-3 border-gray-300  font-medium text-[#004886] transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#004886]">
                  Ledger Type
                </label>
              </div>
              <Link
                state={"true"}
                to="/admin/ledger"
                className="ml-3 md:w-[20%] w-[30%] flex mt-1 items-center bg-[#004886] text-white py-[6px] px-2 text-center rounded text-xs font-semibold hover:bg-[#003366] transition-colors"
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
                Chose Method :
              </p>
              <label className="flex items-center text-[#004886]">
                <input
                  type="checkbox"
                  name="cr_acc"
                  value="Cash"
                  checked={formData.cr_acc === "Cash"}
                  onChange={handleChange}
                  className="mr-2 rounded  border-gray-300 text-[#004886] focus:ring-[#004886]"
                />
                <span className="text-sm font-medium">Cash</span>
              </label>
              <label className="flex items-center text-[#004886]">
                <input
                  type="checkbox"
                  name="cr_acc"
                  value="Bank"
                  checked={formData.cr_acc === "Bank"}
                  onChange={handleChange}
                  className="mr-2 rounded border-gray-300 text-[#004886] focus:ring-[#004886]"
                />
                <span className="text-sm font-medium">Bank</span>
              </label>
            </div>
            {formData.cr_acc === "Bank" && (
              <>
                <div className="relative h-11 mt-4 w-full">
                  <input
                    value={formData.check_No}
                    onChange={handleChange}
                    type="text"
                    name="check_No"
                    placeholder="Enter check No"
                    className="peer h-full w-full border-b border-gray-300  border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
                  />
                  <label className="absolute left-0 -top-3 font-medium text-[#004886] transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#004886]">
                    Check No
                  </label>
                </div>
                <div className="relative h-11 mt-4 w-full min-w-[200px]">
                  <input
                    required
                    value={formData.check_Date}
                    onChange={handleChange}
                    type="date"
                    name="check_Date"
                    className="peer text-sm h-full w-full border-gray-300  border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
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
                value={formData.narration}
                onChange={handleChange}
                name="narration"
                placeholder="Please Select Ledger Type"
                className="peer h-full w-full border-b border-gray-300  border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
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
                className="peer h-full w-full border-b border-gray-300  border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
              />
              <label className="absolute left-0 -top-3 font-medium text-[#004886] transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#004886]">
                Amount
              </label>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-bold text-[#004282] mb-4">
              Purchase Section:
            </h2>

            <table className="w-full text-[#004282] border-collapse">
              <thead className="font-semibold text-left border-b">
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Price</th>
                  <th className="py-2 text-center">Total</th>
                  <th className="py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 border-b">
                      <input
                        type="text"
                        name="item_name"
                        placeholder=" Name"
                        value={item.item_name}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full border-none bg-transparent py-2 text-lg font-normal text-blue-gray-700 outline-0 transition-all focus:border-gray-900"
                      />
                    </td>
                    <td className="py-2 border-b">
                      <input
                        type="number"
                        name="item_quantity"
                        placeholder="Quantity"
                        value={item.item_quantity}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full border-none bg-transparent py-2 text-lg font-normal text-blue-gray-700 outline-0 transition-all focus:border-gray-900"
                      />
                    </td>
                    <td className="py-2 border-b">
                      <input
                        type="number"
                        name="item_price"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full border-none bg-transparent py-2 text-lg font-normal text-blue-gray-700 outline-0 transition-all focus:border-gray-900"
                      />
                    </td>
                    <td className="py-2 text-center border-b text-lg font-medium text-blue-gray-700">
                      ${item.total.toFixed(2)}
                    </td>
                    <td className="py-2 text-center border-b">
                      {index === items.length - 1 && (
                        <button
                          onClick={handleAddRow}
                          className="bg-[#004282] text-white py-1 px-2 md:text-sm text-xs line-clamp-1 font-semibold rounded hover:bg-[#003366] transition-colors mr-2"
                        >
                          Add More
                        </button>
                      )}
                      {index != items.length - 1 && (
                        <button
                          onClick={() => handleDeleteRow(index)}
                          className="bg-red-600 text-white py-1 px-2 text-sm font-semibold rounded hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-3 pt-3">
              <p className="text-xl font-semibold text-[#004282] pt-3">
                Total Price: {totalPrice.toFixed(2)} TK
              </p>
            </div>
          </div>

          <div className="py-6 flex md:gap-2  mt-6 gap-1 justify-between">
            <button
              onClick={handleAdd}
              className="py-[6px] px-3 flex items-center text-sm md:gap-2 gap-1 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
            >
              <CiSaveDown2 className="text-lg font-bold" />
              <p className="font-semibold text-xs">Save</p>
            </button>
            <button
              onClick={() => setPreview((prev) => !prev)}
              className="py-[6px] md:px-3 px-2 flex items-center md:gap-2 gap-1 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
            >
              <MdPreview className="text-lg font-bold" />
              <p className="font-semibold text-xs">Preview</p>
            </button>
            <button
              onClick={onPrint}
              className="py-[6px] md:px-3 px-2  flex items-center md:gap-2 gap-1 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
            >
              <IoPrintSharp className="text-lg font-bold" />
              <p className="font-semibold text-xs">Print</p>
            </button>
            <button
              onClick={handleRefresh}
              className="py-[6px] md:px-3 px-2  flex items-center md:gap-2 gap-1 rounded-md bg-[#004282] text-white hover:bg-gray-300 hover:text-[#004282] transition-colors"
            >
              <IoMdRefreshCircle className="text-lg font-bold" />
              <p className="font-semibold text-xs">Refresh</p>
            </button>
          </div>
          {preview ? (
            <div className="flex items-center justify-center max-w-4xl mx-auto  h-full py-1">
              <div
                ref={componentRef}
                className="transition-all w-full duration-500"
              >
                <PurchaseInvoice items={items} totalPrice={totalPrice} formData={formData} />
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

export default AdminPurchase;
