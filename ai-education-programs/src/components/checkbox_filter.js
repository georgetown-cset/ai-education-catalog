import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

const CheckboxFilter = (props) => {
  const {keyLabel, userLabel, checked, update} = props;

  return (
    <FormControlLabel style={{verticalAlign: "bottom", paddingBottom: "5px"}}
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
  );
};

export default CheckboxFilter;
