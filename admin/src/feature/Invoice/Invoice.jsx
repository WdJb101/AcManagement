import React from "react";
import Input from "../Input/Input";
import Select from "../Input/Select";
import Button from "../Button/Button";
import TypeIcon from "../../shared/Icon/TypeIcon";

const Invoice = () => {
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
              invoice
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
                <div className="col-span-2">
                  <div>
                    <label className="text-base text-black font-medium] ">
                      Account Type
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
              </div>
            </div>
            <div className="px-[46px] pt-[88px] pb-[32px]">
              <div className="grid grid-cols-11 bg-[#fafafa] px-4 py-3">
                <p className="text-[#667085] text-[10px] font-medium col-span-1 uppercase text-left">
                  no.
                </p>
                <p className="text-[#667085] text-[10px] font-medium col-span-3 uppercase text-left">
                  Article
                </p>
                <p className="text-[#667085] text-[10px] font-medium col-span-1 uppercase text-left">
                  Quantity
                </p>
                <p className="text-[#667085] text-[10px] font-medium col-span-1 uppercase text-left">
                  Unit price
                </p>
                <p className="text-[#667085] text-[10px] font-medium col-span-1 uppercase text-left">
                  VAT
                </p>
                <p className="text-[#667085] text-[10px] font-medium col-span-1 uppercase text-left">
                  Amount
                </p>
                <p className="text-[#667085] text-[10px] font-medium col-span-1 uppercase text-left">
                  FINAL Amount
                </p>
                <div className="col-span-1 flex items-center">
                  <span className="text-xs text-[#446CCF]">
                    <TypeIcon type="plus" />
                  </span>
                  <p className="text-[#667085] text-[10px] font-medium uppercase ">
                    {" "}
                    ADD Colum{" "}
                  </p>
                </div>
              </div>
              {/* #########-----list add starts------ ######### */}
              <div className="grid grid-cols-11 hover:bg-[#fafafa] bg-white duration-200 px-4 py-3">
                <p className="text-[#667085] text-[10px] font-medium col-span-1 uppercase text-left">
                  1
                </p>
                <div className="col-span-3 text-left">
                  <p className="text-[#333843] text-[10px] font-medium uppercase">
                    Product Name
                  </p>
                  <p className="text-[#667085] text-[10px] font-medium uppercase">
                    Product Description
                  </p>
                </div>
                <div className="col-span-1 text-left">
                  <p className="text-[#333843] text-[10px] font-medium uppercase">
                    150
                  </p>
                  <p className="text-[#667085] text-[10px] font-medium uppercase">
                    Unit(s)
                  </p>
                </div>
                <p className="text-[#667085] text-[10px] font-medium col-span-1 uppercase text-left">
                  €20
                </p>
                <p className="text-[#667085] text-[10px] font-medium col-span-1 uppercase text-left">
                  0%
                </p>
                <p className="text-[#667085] text-[10px] font-medium col-span-1 uppercase text-left">
                  €3,000
                </p>
                <p className="text-[#667085] text-[10px] font-medium col-span-1 uppercase text-left">
                  €3,000
                </p>
              </div>

              {/* #########-----list add ends------ ######### */}
              <div className="grid grid-cols-11 ">
                <div className="col-span-1 flex items-center gap-3">
                  <span className="text-xs text-[#446CCF]">
                    <TypeIcon type="plus" />
                  </span>
                  <p className="text-[#667085] text-[10px] font-medium uppercase ">
                    {" "}
                    ADD Row{" "}
                  </p>
                </div>
                <div className="col-span-1 flex items-center gap-3">
                  <span className="text-xs text-[#446CCF]">
                    <TypeIcon type="plus" />
                  </span>
                  <p className="text-[#667085] text-[10px] font-medium uppercase ">
                    {" "}
                    ADD Row{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-[46px] pb-10">
              <div className="py-6 grid grid-cols-7 gap-[45px]">
                <div className="col-span-5">
                  <div className="grid grid-cols-2 gap-[32px]">
                    <div>
                      <div className=" grid grid-cols-7 pt-4">
                        <div className="col-span-2 flex items-center">
                          <span className="text-base text-black font-medium] ">
                            <label>Check No. :</label>
                          </span>
                        </div>
                        <div className="col-span-5">
                          <Select>
                            <option>Action</option>
                          </Select>
                        </div>
                      </div>{" "}
                    </div>
                    <div>
                      <div className=" grid grid-cols-7 pt-4">
                        <div className="col-span-2 flex items-center">
                          <span className="text-base text-black font-medium] ">
                            <label>Bank / Cash :</label>
                          </span>
                        </div>
                        <div className="col-span-5">
                          <Select>
                            <option>Action</option>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6">
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
                <div className="col-span-2">
                  <div className="border-b border-[#E0E2E7]">
                    <div className="flex justify-between items-center py-3">
                      <p className="text-[#667085] text-xs font-normal">
                        Total HT
                      </p>
                      <p className="text-[#333843] text-xs font-medium">
                        €3,000
                      </p>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <p className="text-[#667085] text-xs font-normal">
                        Total Disbursements
                      </p>
                      <p className="text-[#333843] text-xs font-medium">€30</p>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <p className="text-[#667085] text-xs font-normal">
                        Total VAT
                      </p>
                      <p className="text-[#333843] text-xs font-medium">€0</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 ">
                    <p className="text-[#333843] text-xs font-bold">
                      Total Price
                    </p>
                    <p className="text-[#333843] text-xs font-bold">€0</p>
                  </div>
                </div>
              </div>
            </div>
            {/* ########------button starts-------######### */}
            <div className="flex gap-4 justify-end px-9">
              <Button title="Save & New" />
              <Button title="Preview" />
              <Button title="Print" />
              <Button title="Review" />
            </div>
            {/* ########------button ends-------######### */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
