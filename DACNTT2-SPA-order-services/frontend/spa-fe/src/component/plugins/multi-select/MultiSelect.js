import React from "react";

import Select from "react-select";

const CustomClearText = () => "clear all";
const ClearIndicator = (props) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles("clearIndicator", props)}
    >
      <div style={{ padding: "0px 5px" }}>{children}</div>
    </div>
  );
};

const ClearIndicatorStyles = (base, state) => ({
  ...base,
  cursor: "pointer",
  color: state.isFocused ? "blue" : "black",
});

export default function CustomClearIndicator(props) {
  return (
    <Select
      onChange={props.onChange}
      closeMenuOnSelect={false}
      components={{ ClearIndicator }}
      styles={{ clearIndicator: ClearIndicatorStyles }}
      isMulti
      options={props.options}
    />
  );
}
