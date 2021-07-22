import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";
import {ArrayParam, useQueryParam} from "use-query-params";

const AutocompleteFilter = (props) => {
  const {keyLabel, userLabel, options, handleFilterRows} = props;
  const [values, setValues] = useQueryParam(keyLabel, ArrayParam);

  return (
    <div style={{marginLeft: "30px"}}>
      <Autocomplete
        multiple
        options={options}
        style={{ minWidth: "300px", padding:"0px 20px 10px 0px", display: "inline-block"}}
        size={"small"}
        renderInput={(params) => <TextField {...params} label={userLabel}/>}
        onChange={(evt, newValues) => handleFilterRows(evt, newValues, keyLabel, setValues)}
        value={values}
      />
    </div>
  );
};

export default AutocompleteFilter;
