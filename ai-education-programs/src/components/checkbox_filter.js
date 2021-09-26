import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

const CheckboxFilter = (props) => {
  const {keyLabel, userLabel, checked, update, tooltip} = props;

  return (
    <Tooltip title={tooltip} arrow placement={"top"}>
      <FormControlLabel style={{verticalAlign: "bottom", paddingBottom: "5px", marginRight: "20px"}}
        control={
          <Checkbox
            checked={checked === undefined || checked === null ? false : checked}
            onChange={() => update(!checked)}
            inputProps={{"aria-label": "primary checkbox"}}
            color={"primary"}
          />
        }
        label={userLabel}
        key={keyLabel}
      />
    </Tooltip>
  );
};

export default CheckboxFilter;
