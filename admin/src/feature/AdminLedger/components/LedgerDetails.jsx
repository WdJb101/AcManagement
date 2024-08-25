import React from "react";
import api from "../../../axiosApi/api";
import toast from "react-hot-toast";
import { RiChatDeleteFill } from "react-icons/ri";
const LedgerDetails = ({ ledgerData, fetchData }) => {
  const handleDelete = async (id) => {
    try {
      await toast.promise(api.delete(`ledger/${id}`), {
        loading: "Deleting...",
        success: <b>Item deleted successfully!</b>,
        error: <b>Could not delete the item.</b>,
      });
      fetchData();
    } catch (error) {
      console.error("Delete operation failed:", error);
    }
  };

  return (
    <div>
    <div>
      <h1
        className="font-semibold px-2 md:px-0 text-xl py-5 capitalize flex justify-center"
      >
        Ledger List
        <div>
          <span className="h-[2px] lg:w-[25px] inline-block md:w-[20px] w-[15px] bg-[#004282]"></span>
        </div>
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-lg rounded-lg overflow-hidden border-collapse">
          <thead>
            <tr className="bg-[#004282] text-white font-semibold">
              <th className="border border-[#00428266] p-4">Name</th>
              <th className="border border-[#00428266] p-4">Category</th>
              <th className="border border-[#00428266] p-4">Type</th>
              <th className="border border-[#00428266] p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {ledgerData?.map((br, i) => (
              <tr
                key={i}
                className="border border-[#00428266] text-center hover:bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-200"
              >
                <td className="p-4 text-gray-800 font-semibold capitalize border border-[#00428266]">
                  {br?.ledger_name}
                </td>
                <td className="p-4 text-gray-800 font-semibold capitalize border border-[#00428266]">
                  {br?.acc_group}
                </td>
                <td className="p-4 text-gray-800 font-semibold capitalize border border-[#00428266]">
                  {br?.balance_type === "dr" ? "Debit" : "Credit"}
                </td>
                <td className="p-4 border border-[#00428266]">
                  <button onClick={() => handleDelete(br?._id)}>
                    <RiChatDeleteFill className="text-red-600 text-xl"></RiChatDeleteFill>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default LedgerDetails;
