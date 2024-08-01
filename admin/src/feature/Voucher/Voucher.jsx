import React from "react";
import Input from "../Input/Input";
import Select from "../Input/Select";
import Button from "../Button/Button";

const Voucher = () => {
  return (
    <>
      <div className="bg-[#e0e0e09a] p-[51px] w-full ">
        <div className="bg-white ">
          <div className="bg-[#E9FBFF] text-center py-6">
            <h2 className="text-[32px] text-primary font-bold ">WeeCash</h2>
            <p className="text-lg text-[#828282] font-medium pt-5 pb-4">
              Lorem ipsum dolor sit amet consectetur. Convallis urna lobortis
              malesuada massa nisl .
            </p>
            <p className="text-2xl text-[#0058B3] font-medium capitalize">
              Receive Voucher
            </p>
          </div>
          <div className="py-6">
            <div className="px-[46px]">
              <div className="grid grid-cols-8 gap-[70px]">
                <div className="col-span-3">
                  <div>
                    <label className="text-base text-black font-medium] ">
                      Voucher No.
                    </label>
                  </div>
                  <div className="pt-[14px]">
                    <Input type="text" placeholder="Voucher- 00785" />
                  </div>
                </div>
                <div className="col-span-2">
                  <div>
                    <label className="text-base text-black font-medium] ">
                      Voucher Type.
                    </label>
                  </div>

                  <div className=" mt-[14px] w-full ">
                    <form>
                      <Select>
                        <option value="action">Action</option>
                      </Select>
                    </form>
                  </div>
                </div>
                <div className="col-span-3">
                  <div>
                    <label className="text-base text-black font-medium] ">
                      Posting Date
                    </label>
                  </div>
                  <div className="pt-[14px]">
                    <Input type="date" placeholder="Voucher- 00785" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-8 gap-[70px] pt-[26px]">
                <div className="col-span-3">
                  <div>
                    <label className="text-base text-[#1F2937] font-medium] ">
                      Paid to
                    </label>
                  </div>
                  <div className="pt-[14px]">
                    <Input type="text" placeholder="Alberto Walter" />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-[63px] py-10">
              <div className=" border border-[#E5E7EB] rounded-xl ">
                <div className="grid grid-cols-5 py-6 border-b border-[#E5E7EB] text-center">
                  <h2 className="text-[22px] text-black font-semibold col-span-3">
                    Particular
                  </h2>
                  <h2 className="text-[22px] text-black font-semibold col-span-2">
                    Amount
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-5 ">
                    <div className="col-span-3">
                      <div className=" grid grid-cols-7 pt-4">
                        <div className="col-span-1 flex items-center">
                          <span className="text-base text-black font-medium] ">
                            <label>Voucher Type:</label>
                          </span>
                        </div>
                        <div className="col-span-3">
                          <Select>
                            <option>Action</option>
                          </Select>
                        </div>
                      </div>
                      <div className=" grid grid-cols-7 pt-4">
                        <div className="col-span-1 flex items-center">
                          <span className="text-base text-black font-medium] ">
                            <label>Bank / Cash :</label>
                          </span>
                        </div>
                        <div className="col-span-3">
                          <Select>
                            <option>Action</option>
                          </Select>
                        </div>
                      </div>
                      <div className=" grid grid-cols-7 pt-4">
                        <div className="col-span-1 flex items-center">
                          <span className="text-base text-black font-medium] ">
                            <label>Check No. :</label>
                          </span>
                        </div>
                        <div className="col-span-3">
                          <Select>
                            <option>Action</option>
                          </Select>
                        </div>
                      </div>
                      <div className=" grid grid-cols-7 pt-4">
                        <div className="col-span-1 flex items-center">
                          <span className="text-base text-black font-medium] ">
                            <label>Posting Date</label>
                          </span>
                        </div>
                        <div className="col-span-5">
                          <Input type="date" />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 border-[#C6C8CA] border-l">
                      <div className="h-[289px] px-[90px] ">
                        <textarea
                          type="text"
                          className="w-full h-full py-[14px] px-[16px] border border-[#E5E7EB] rounded-[8px] placeholder:text-[#C6C8CA] placeholder:text-base placeholder:font-medium outline-[#C6C8CA]"
                          placeholder="Input amount"
                        >
                          {" "}
                        </textarea>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-base text-black font-medium] ">
                      <label>Narration</label>
                    </span>
                    <div className="w-full pt-4">
                      <textarea
                        type="text"
                        className="w-full h-full py-[14px] px-[16px] border border-[#E5E7EB] rounded-[8px] placeholder:text-[#C6C8CA] placeholder:text-base placeholder:font-medium outline-[#C6C8CA]"
                        placeholder="Input amount"
                      >
                        {" "}
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-end px-9">
              <Button title="Save & New" />
              <Button title="Preview" />
              <Button title="Print" />
              <Button title="Review" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Voucher;
