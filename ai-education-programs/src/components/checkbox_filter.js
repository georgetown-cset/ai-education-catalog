import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {BooleanParam, useQueryParam} from "use-query-params";

const CheckboxFilter = (props) => {
  const {keyLabel, userLabel, handleFilterRows, reset} = props;
  const [checked = false, setChecked] = useQueryParam(keyLabel, BooleanParam);
  handleFilterRows([checked], keyLabel);

  const update = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    handleFilterRows([newChecked], keyLabel);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={update}
          inputProps={{"aria-label": "primary checkbox"}}
        />
      }
      label={userLabel}
      key={keyLabel}
    />
  );
};

export default CheckboxFilter;
