import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";
import Tooltip from "@material-ui/core/Tooltip";

const AutocompleteFilter = (props) => {
  const {keyLabel, userLabel, options, currFilters, update, tooltip} = props;

  return (
    <Tooltip title={tooltip} arrow placement={"top"}>
      <div style={{display: "inline-block"}}>
        <Autocomplete
          multiple
          options={options === undefined || options === null ? [] : options}
          style={{ minWidth: "300px", padding:"0px 30px 10px 0px", display: "inline-block"}}
          size={"small"}
          renderInput={(params) => <TextField {...params} label={userLabel}/>}
          onChange={(evt, newFilters) => update(newFilters)}
          value={currFilters}
          key={keyLabel}
        />
      </div>
    </Tooltip>
  );
};

export default AutocompleteFilter;
