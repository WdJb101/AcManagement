import React from "react";
import PropTypes from "prop-types";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const iconMap = {
  info: CiCircleInfo,
  eyeopen : IoIosEye,
  eyClose: IoIosEyeOff
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
