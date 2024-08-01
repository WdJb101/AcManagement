import React from "react";
import PropTypes from "prop-types";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { HiOutlineChartBar } from "react-icons/hi2";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { PiToolboxLight } from "react-icons/pi";
import { GrNotes } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { BsChatDotsFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const iconMap = {
  info: CiCircleInfo,
  eyeopen: IoIosEye,
  eyClose: IoIosEyeOff,
  chart: HiOutlineChartBar,
  voucher: HiOutlineReceiptPercent,
  box: PiToolboxLight,
  setting: IoSettingsOutline,
  notes: GrNotes,
  downarrow: IoIosArrowDown,
  chat: BsChatDotsFill,
  logout: IoIosLogOut,
  plus: FaPlus,
};

const TypeIcon = React.memo(({ type, className, size }) => {
  const IconComponent = iconMap[type];
  return (
    <>
      {IconComponent ? (
        <IconComponent className={className} size={size} />
      ) : null}
    </>
  );
});

TypeIcon.displayName = "Icon";

TypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
  css: PropTypes.string,
  size: PropTypes.number,
};

TypeIcon.defaultProps = {
  css: "",
};

export default TypeIcon;
