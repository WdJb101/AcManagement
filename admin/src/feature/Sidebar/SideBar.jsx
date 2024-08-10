import React from "react";
import TypeIcon from "../../shared/Icon/TypeIcon";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const isActive = location.pathname;
  console.log(isActive);

  return (
    <>
      <div className=" bg-white h-screen flex flex-col justify-between items-center">
        <div>
          <h2 className="text-4xl text-primary font-bold py-[50px] ">
            WeeCash
          </h2>
          <div>
            <ul>
              <li className="pb-7">
                <Link to="/admin/overview">
                  <div className="flex gap-3 p">
                    <span
                      className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                        isActive == "/admin/overview"
                          ? "text-[#00B8FF]"
                          : "text-[#446CCF]"
                      } `}
                    >
                      <TypeIcon type="chart" />
                    </span>
                    <p
                      className={`text-base font-medium hover:text-[#FF3B30] duration-150 ${
                        isActive == "/admin/overview"
                          ? "text-[#FF3B30]"
                          : "text-[#7C8DB5]"
                      } `}
                    >
                      Overview
                    </p>
                  </div>
                </Link>
              </li>
              <li className="pb-7">
                <Link to="/admin/ledger">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 p">
                      <span
                        className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                          isActive == "/admin/ledger"
                            ? "text-[#00B8FF]"
                            : "text-[#446CCF]"
                        } `}
                      >
                        <TypeIcon type="ledger" />
                      </span>

                      <p
                        className={`text-base font-medium hover:text-[#FF3B30] duration-150 ${
                          isActive == "/admin/ledger"
                            ? "text-[#FF3B30]"
                            : "text-[#7C8DB5]"
                        } `}
                      >
                        Ledger
                      </p>
                    </div>

                    {/* <span className="text-[#7C8DB5] text-sm">
                      <TypeIcon type="downarrow" />
                    </span> */}
                  </div>
                </Link>
              </li>
              <li className="pb-7">
                <Link to="/admin/AdminiVoucher">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 p">
                      <span
                        className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                          isActive == "/admin/AdminiVoucher"
                            ? "text-[#00B8FF]"
                            : "text-[#446CCF]"
                        } `}
                      >
                        <TypeIcon type="voucher" />
                      </span>

                      <p
                        className={`text-base font-medium hover:text-[#FF3B30] duration-150 ${
                          isActive == "/admin/AdminiVoucher"
                            ? "text-[#FF3B30]"
                            : "text-[#7C8DB5]"
                        } `}
                      >
                        Voucher
                      </p>
                    </div>

                    <span className="text-[#7C8DB5] text-sm">
                      <TypeIcon type="downarrow" />
                    </span>
                  </div>
                </Link>
              </li>
              <li className="pb-7">
                <Link to="/admin/AdminPayment">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 p">
                      <span
                        className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                          isActive == "/admin/AdminPayment"
                            ? "text-[#00B8FF]"
                            : "text-[#446CCF]"
                        } `}
                      >
                        <TypeIcon type="box" />
                      </span>
                      <p
                        className={`text-base font-medium hover:text-[#FF3B30] duration-150 ${
                          isActive == "/admin/AdminPayment"
                            ? "text-[#FF3B30]"
                            : "text-[#7C8DB5]"
                        } `}
                      >
                        Payment
                      </p>
                    </div>
                    <span className="text-[#7C8DB5] text-sm">
                      <TypeIcon type="downarrow" />
                    </span>
                  </div>
                </Link>
              </li>
              <li className="pb-7">
                <Link to="/admin/AdminVoice">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 p">
                      <span
                        className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                          isActive == "/admin/AdminVoice"
                            ? "text-[#00B8FF]"
                            : "text-[#446CCF]"
                        } `}
                      >
                        <TypeIcon type="setting" />
                      </span>
                      <p
                        className={`text-base font-medium hover:text-[#FF3B30] duration-150 ${
                          isActive == "/admin/AdminVoice"
                            ? "text-[#FF3B30]"
                            : "text-[#7C8DB5]"
                        } `}
                      >
                        Invoice
                      </p>
                    </div>
                    <span className="size-5 leading-5 text-center rounded-full bg-[#FF3B30] text-white text-xs font-medium">
                      2
                    </span>
                  </div>
                </Link>
              </li>
              <li className="pb-7">
                <Link to="/admin/AdminSetting">
                  <div className="flex gap-3 p">
                    <span
                      className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                        isActive == "/admin/AdminSetting"
                          ? "text-[#00B8FF]"
                          : "text-[#446CCF]"
                      } `}
                    >
                      <TypeIcon type="notes" />
                    </span>
                    <p
                      className={`text-base font-medium hover:text-[#FF3B30] duration-150 ${
                        isActive == "/admin/AdminSetting"
                          ? "text-[#FF3B30]"
                          : "text-[#7C8DB5]"
                      } `}
                    >
                      Setting
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul>
            <li className="pb-7">
              <Link to="/admin/AdminHelpCenter">
                <div className="flex gap-3">
                  <span
                    className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                      isActive == "/admin/AdminHelpCenter"
                        ? "text-[#00B8FF]"
                        : "text-[#446CCF]"
                    } `}
                  >
                    <TypeIcon type="info" />
                  </span>
                  <p
                    className={`text-base font-medium hover:text-[#FF3B30] duration-150 ${
                      isActive == "/admin/AdminHelpCenter"
                        ? "text-[#FF3B30]"
                        : "text-[#7C8DB5]"
                    } `}
                  >
                    Help Centre
                  </p>
                </div>
              </Link>
            </li>
            <li className="pb-7">
              <Link to="/admin/AdminContact">
                <div className="flex gap-3">
                  <span
                    className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                      isActive == "/admin/AdminContact"
                        ? "text-[#00B8FF]"
                        : "text-[#446CCF]"
                    } `}
                  >
                    <TypeIcon type="chat" />
                  </span>
                  <p
                    className={`text-base font-medium hover:text-[#FF3B30] duration-150 ${
                      isActive == "/admin/AdminContact"
                        ? "text-[#FF3B30]"
                        : "text-[#7C8DB5]"
                    } `}
                  >
                    Contact us
                  </p>
                </div>
              </Link>
            </li>
            <li className="pb-7">
              <Link>
                <div className="flex gap-3">
                  <span
                    className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                      isActive == "/popup" ? "text-[#00B8FF]" : "text-[#446CCF]"
                    } `}
                  >
                    <TypeIcon type="logout" />
                  </span>
                  <p
                    className={`text-base font-medium hover:text-[#FF3B30] duration-150${
                      isActive == "/popup" ? "text-[#FF3B30]" : "text-[#7C8DB5]"
                    } `}
                  >
                    Log out
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
