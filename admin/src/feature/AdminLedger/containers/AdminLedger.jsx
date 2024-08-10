const AdminLedger = () => {
  return (
    <div className="container py-16  bg-[#F4F5F9] mx-auto">
      <div>
        <h1 className="text-center  text-3xl text-[#004282] font-bold ">
          Create Your Ledger
        </h1>
      </div>
      <div className="max-w-3xl mx-auto">
  <div >
    <h1 className="font-semibold">Ledger Name</h1>
    <div className="relative mt-[10px]">
      <input
        type="text"
        placeholder="Enter Name"
        className="border focus:outline-none w-full py-2 rounded-lg px-4 text-base"
      />
    </div>
  </div>

  <div  className="mt-6 flex gap-2 items-center">
    <h1 className="font-semibold">Balance Type :</h1>
    <div className="relative mt-1  flex items-center space-x-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="balanceType"
          value="credit"
          className="form-radio text-indigo-600 h-4 w-4"
        />
        <span className="ml-2 text-base font-medium">Credit</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="balanceType"
          value="debit"
          className="form-radio text-indigo-600 h-4 w-4"
        />
        <span className="ml-2 text-base font-medium">Debit</span>
      </label>
    </div>
  </div>

  <div className="mt-6">
    <h1 className="font-semibold">Ledger Category</h1>
    <div className="relative mt-[10px]">
      <select className="border focus:outline-none w-full py-2 rounded-lg px-4 text-base">
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
</div>

    </div>
  );
};

export default AdminLedger;
{/* <button
                    //   onClick={handleSearch}
                      className="py-2 flex items-center absolute top-[50%] right-[3%] translate-y-[-50%] px-10 rounded-md bg-[#004282] hover:text-[#004282] transition-colors text-xs text-white hover:bg-gray-300"
                    >
                      <BiSearchAlt2 className="text-lg font-bold" />{" "}
                      <p className="font-semibold">Search</p>
                    </button> */}