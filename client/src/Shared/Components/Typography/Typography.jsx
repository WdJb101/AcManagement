import cn from "../Utils/cn/Cn";
import PropTypes from "prop-types";

const variantsMapping = {
  h1: " font-heading font-bold leading-[54px] md:leading-[72px] lg:leading-[90px] text-4xl md:text-5xl lg:text-6xl",
  h2: " font-heading font-bold leading-[45px] md:leading-[54px] lg:leading-[54px] text-3xl md:text-4xl lg:text-4xl",
  h3: " font-heading font-bold leading-[36px] md:leading-[36px] lg:leading-[45px] text-2xl md:text-2xl lg:text-3xl",
  h4: " font-heading font-bold leading-[27px] md:leading-[27px] lg:leading-[30px] text-lg  md:text-lg lg:text-xl",
  h5: " font-heading font-bold leading-[21px] md:leading-[21px] lg:leading-[24px] text-sm  md:text-text-sm lg:text-base",
  h6: " font-heading font-bold leading-[18px] md:leading-[18px] lg:leading-[18px] text-xs  md:text-text-xs lg:text-xs",
  primary_body: "text-base md:text-sm lg:text-xl",
  small_body: "text-sm md:text-xs text-sm leading-normal ",
  caption: "lg:text-xs md:text-xs text-xs leading-normal ",
  p: "lg:text-base md:text-base text-sm leading-normal ",
};

const Typography = ({ variant, color, className, children, ...props }) => {
  const classes = cn(
    variantsMapping[variant] || variantsMapping.body1, // Default to body1 if variant not found
    color || "text-black",
    className || ""
  );

  const HTMLElement = ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "p"].includes(
    variant
  )
    ? variant
    : "div";

  return (
    <HTMLElement className={classes} {...props}>
      {children}
    </HTMLElement>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "h7",
    "body1",
    "body2",
    "caption",
    "p",
  ]),
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Typography.defaultProps = {
  variant: "body1",
};

export default Typography;
