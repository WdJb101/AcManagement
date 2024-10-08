import  { useState } from "react";
import TypeIcon from "../../shared/Icon/TypeIcon";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// import { GrTransaction } from "react-icons/gr";
import "./SideBar";
const SideBar = () => {
  const location = useLocation();
  const isActive = location.pathname;
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        style={{ width: isOpen ? "100px" : "200px" }}
        id="admin-panel-sidebar"
        className="fixed top-0 z-20 flex flex-col items-center justify-center h-screen p-3 space-y-2   transition-all duration-500 bg-white shadow-lg rounded-r-xl md:w-60 hover:text-black backdrop-blur-md"
      >
        <div className=" bg-white h-screen flex flex-col justify-between items-center">
          <div>
            <h2
              className={` ${
                isOpen ? "text-lg" : "text-4xl"
              } text-primary font-bold py-[50px] `}
            >
              WeeCash
            </h2>
            <div>
              <ul>
                <li className="pb-7 ">
                  <Link to="/admin/overview">
                    <div className="flex gap-3 p">
                      <span
                        className={`text-2xl text-center hover:text-[#00B8FF] duration-150 ${
                          isActive == "/admin/overview"
                            ? "text-[#00B8FF]"
                            : "text-[#446CCF]"
                        } `}
                      >
                        <TypeIcon type="chart" />
                      </span>
                      <p
                        className={`text-base ${
                          isOpen ? "hidden" : "w-auto"
                        } font-medium hover:text-[#FF3B30]  duration-150 ${
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
                          className={`text-base font-medium ${
                            isOpen ? "hidden" : "w-auto"
                          } hover:text-[#FF3B30] duration-150 ${
                            isActive == "/admin/ledger"
                              ? "text-[#FF3B30]"
                              : "text-[#7C8DB5]"
                          } `}
                        >
                          Ledger
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                {/* <li className="pb-7">
                  <Link to="/admin/transaction">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 ">
                        <span
                          className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                            isActive == "/admin/transaction"
                              ? "text-[#00B8FF]"
                              : "text-[#446CCF]"
                          } `}
                        >
                          <TypeIcon type="transaction" />
                        </span>

                        <p
                          className={`text-base font-medium ${
                            isOpen ? "hidden" : "w-auto"
                          } hover:text-[#FF3B30] duration-150 ${
                            isActive == "/admin/transaction"
                              ? "text-[#FF3B30]"
                              : "text-[#7C8DB5]"
                          } `}
                        >
                          Transaction
                        </p>
                      </div>
                    </div>
                  </Link>
                </li> */}
                <li className="pb-7">
                  <Link to="/admin/purchase">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 ">
                        <span
                          className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                            isActive == "/admin/purchase"
                              ? "text-[#00B8FF]"
                              : "text-[#446CCF]"
                          }`}
                        >
                          <TypeIcon type="purchase" />
                        </span>

                        <p
                          className={`text-base font-medium ${
                            isOpen ? "hidden" : "w-auto"
                          } hover:text-[#FF3B30] duration-150 ${
                            isActive == "/admin/purchase"
                              ? "text-[#FF3B30]"
                              : "text-[#7C8DB5]"
                          } `}
                        >
                          Purchase
                        </p>
                      </div>

                      {/* <span className="text-[#7C8DB5] text-sm">
                      <TypeIcon type="downarrow" />
                    </span> */}
                    </div>
                  </Link>
                </li>
                <li className="pb-7">
                  <Link to="/admin/voucher">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 ">
                        <span
                          className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                            isActive == "/admin/voucher"
                              ? "text-[#00B8FF]"
                              : "text-[#446CCF]"
                          } `}
                        >
                          <TypeIcon type="voucher" />
                        </span>

                        <p
                          className={`text-base font-medium ${
                            isOpen ? "hidden" : "w-auto"
                          } hover:text-[#FF3B30] duration-150 ${
                            isActive == "/admin/voucher"
                              ? "text-[#FF3B30]"
                              : "text-[#7C8DB5]"
                          } `}
                        >
                          Voucher
                        </p>
                      </div>

                      {/* <span className="text-[#7C8DB5] text-sm">
                      <TypeIcon type="downarrow" />
                    </span> */}
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
                          className={`text-base ${
                            isOpen ? "hidden" : "w-auto"
                          } font-medium hover:text-[#FF3B30] duration-150 ${
                            isActive == "/admin/AdminPayment"
                              ? "text-[#FF3B30]"
                              : "text-[#7C8DB5]"
                          } `}
                        >
                          Payment
                        </p>
                      </div>
                      {/* <span className="text-[#7C8DB5] text-sm">
                        <TypeIcon type="downarrow" />
                      </span> */}
                    </div>
                  </Link>
                </li>
                <li className="pb-7">
                  <Link to="/admin/AdminVoice">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 p">
                        <span
                          className={`text-2xl  hover:text-[#00B8FF] duration-150 ${
                            isActive == "/admin/AdminVoice"
                              ? "text-[#00B8FF]"
                              : "text-[#446CCF]"
                          } `}
                        >
                          <TypeIcon type="setting" />
                        </span>
                        <p
                          className={`text-base font-medium ${
                            isOpen ? "hidden" : "w-auto"
                          } hover:text-[#FF3B30] duration-150 ${
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
                        className={`text-base font-medium hover:text-[#FF3B30] ${
                          isOpen ? "hidden" : "w-auto"
                        } duration-150 ${
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
            <ul className={` w-full mr-2`}>
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
                      className={`text-base font-medium ${
                        isOpen ? "hidden" : "w-auto"
                      } hover:text-[#FF3B30] duration-150 ${
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
                      className={`text-base font-medium ${
                        isOpen ? "hidden" : "w-auto"
                      } hover:text-[#FF3B30] duration-150 ${
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
              {/* <li className="pb-7">
                <div
                  onClick={toggle}
                  className={`${
                    isOpen
                      ? "w-full hover:underline transition-all duration-500   flex   capitalize rounded-md items-center justify-start"
                      : "flex items-center justify-center  transition-all duration-300 rounded-full bg-light text-primary w-7 h-7 hover:bg-primary hover:text-light"
                  } cursor-pointer transition-all duration-500`}
                >
                  <div className={`transition-all ${isOpen ? "" : ""}`}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  <span
                    className={`${
                      isOpen ? "hddn" : "w-6"
                    }  text-sm text-whit font-normal whitespace-nowrap border border-none`}
                  >
                    Close
                  </span>
                </div>
              </li> */}
              <li onClick={toggle} className="pb-7">
                <div
                  className={`flex items-center ${isOpen ? "gap-0" : "gap-3"}`}
                >
                  <div className={`transition-all  ${isOpen ? "" : ""}`}>
                    {isOpen ? (
                      <FaChevronUp className="text-xl cursor-pointer" />
                    ) : (
                      <FaChevronDown className="text-xl cursor-pointer" />
                    )}
                  </div>
                  <p
                    className={`text-base underline cursor-pointer font-medium ${
                      isOpen ? "" : "w-auto"
                    }`}
                  >
                    {isOpen ? "Open" : "Close"}
                  </p>
                </div>
              </li>
              <li className="pb-7">
                <Link>
                  <div className="flex gap-3">
                    <span
                      className={`text-2xl hover:text-[#00B8FF] duration-150 ${
                        isActive == "/popup"
                          ? "text-[#00B8FF]"
                          : "text-[#446CCF]"
                      } `}
                    >
                      <TypeIcon type="logout" />
                    </span>
                    <p
                      className={`text-base ${
                        isOpen ? "hidden" : "w-auto"
                      } font-medium hover:text-[#FF3B30] duration-150${
                        isActive == "/popup"
                          ? "text-[#FF3B30]"
                          : "text-[#7C8DB5]"
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
      </div>
    </>
  );
};

export default SideBar;
