import { useEffect, useState } from "react";
import { BiMessageAltAdd } from "react-icons/bi";
import api from "../../../axiosApi/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import LedgerDetails from "../components/LedgerDetails";
import { useLocation, useNavigate } from "react-router-dom";
import Heading from "../../../shared/components/Heading";
const AdminLedger = () => {
  const [loader, setLoader] = useState(false);
  const [ledgerData, setLedgerData] = useState([]);
  const [formData, setFormData] = useState({
    ledger_name: "",
    acc_group: "",
  });
    const location=useLocation()
    const navigate=useNavigate()
 
  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // for post
  const handleAdd = async () => {
    try {
      setLoader(true);
      const res = await api.post("/ledger", formData);
      if (res.status == 201) {
        setLoader(false);

        setFormData({
          ledger_name: "",
          acc_group: "",
        });
           if(location.state==="true"){
             navigate("/admin/voucher")
           }
        fetchData()
        toast.success("Successfully Added ledger");
      }
    } catch (error) {
      setLoader(false);
      toast.error("Add Failed");
    }
  };
  // for add
  const fetchData = async () => {
    try {
      const res = await api.get("/ledger");
      setLedgerData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container px-8 lg:py-10 min-h-screen bg-[#F4F5F9] mx-auto">
      <div>
      <Heading>
      Create Your Ledger
      </Heading>
       
    
      </div>
      <div className="max-w-5xl gap-8 lg:flex   justify-between mx-auto">
        <div className="lg:w-[40%]">
          <h1
            className={`font-semibold px-2 md:px-0  text-xl py-5  capitalize text-center flex justify-center`}
          >
            Ledger Add
            <div>
              <span className=" h-[2px] lg:w-[25px] inline-block md:w-[20px] w-[15px] bg-[#004282]"></span>
            </div>
          </h1>
          <div>
            <h1 className="font-semibold"> Name</h1>
            <div className="relative mt-[10px]">
              <input
                required
                value={formData.ledger_name}
                onChange={hanldeChange}
                type="text"
                name="ledger_name"
                placeholder="Enter Name"
                className="border focus:outline-none w-full py-2 rounded-lg px-4 text-base"
              />
            </div>
          </div>
          <div className="mt-4">
            <h1 className="font-semibold"> Category</h1>
            <div className="relative mt-[10px]">
              <select
                onChange={hanldeChange}
                value={formData.acc_group}
                name="acc_group"
                required
                className="border focus:outline-none w-full py-2 rounded-lg px-4 text-base"
              >
                <option disabled selected hidden value="">
                  Select
                </option>
                <option value="Asset">Asset</option>
                <option value="Expense">Expense</option>
                <option value="Dividen">Dividen</option>
                <option value="Liability">Liability</option>
                <option value="Equity">Equity</option>
                <option value="Revenew">Revenew</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleAdd}
              className="py-[6px] flex items-center  px-10 rounded-md bg-[#004282] hover:text-[#004282] transition-colors text-xs text-white hover:bg-gray-300"
            >
              {!loader && <BiMessageAltAdd className="text-lg font-bold" />}
              <p className="font-semibold">
                {" "}
                {loader ? (
                  <span className="flex items-center gap-1">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    Adding..
                  </span>
                ) : (
                  "Add"
                )}{" "}
              </p>
            </button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <LedgerDetails
            fetchData={fetchData}
            ledgerData={ledgerData}
          ></LedgerDetails>
        </div>
      </div>
    </div>
  );
};

export default AdminLedger;
