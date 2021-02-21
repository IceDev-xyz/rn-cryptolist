import React from "react";
import PropTypes from "prop-types";
import { Divider as ElementsDivider } from "react-native-elements";

export const Divider = (props:any) => {
  return (
    <ElementsDivider
      style={{ height: props.height || 10, backgroundColor: "transparent" }}
    />
  );
};
Divider.propTypes = {
  optionalString: PropTypes.string,
};
