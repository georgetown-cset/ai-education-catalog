import React, {useEffect} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import {CSVLink} from "react-csv";
import {data} from "../data/data";
import ProgramCard from "./program_card";

const ProgramCardArea = () => {
  useEffect(() => {
    handleFilterRows(null, [], "name");
  }, []);

  const labelElts = [
    {"key": "name", "label": "Search for a Program"},
    {"key": "organization", "label": "Hosting Organization"},
    {"key": "type", "label": "Program Type"},
    {"key": "target", "label": "Target Audience"},
    {"key": "location", "label": "Location"},
    {"key": "underrep", "label": "Underrepresented Groups"}
  ];

  const defaultFilterValues = {
    "name": [],
    "organization": [],
    "type": [],
    "target": [],
    "location": [],
    "underrep": [],
    "is_free": [false]
  };

  const [filterValues, setFilterValues] = React.useState({...defaultFilterValues});
  const [filterMetadata, setFilterMetadata] = React.useState({...defaultFilterValues});
  const [filteredPrograms, setFilteredPrograms] = React.useState(data.slice(0));

  // setup CSV
  const exportFilename = "ai-education-programs.csv";
  const headers = [
    { label: "program_name", key: "name" },
    { label: "url", key: "url" },
    { label: "objective", key: "objective" },
    { label: "program_type", key: "type" },
    { label: "organization_type", key: "organization" },
    { label: "target_audience", key: "target" },
    { label: "cost", key: "cost" },
    { label: "location", key: "location" },
    { label: "special_focus", key: "underrep" },
    { label: "participant_level", key: "level" },
    { label: "prerequisites", key: "pre_reqs" },
  ];

  const handleToggleChange = () => {
    handleFilterRows("", [!filterValues["is_free"][0]], "is_free");
  };

  const handleFilterRows = (evt, filters, changed_key, reset = false) => {
    const cleanFilters = filters.filter(k => (k !== null) && (k !== ""));
    let updatedFilterValues = {...filterValues};
    updatedFilterValues[changed_key] = cleanFilters;
    if(reset){
      updatedFilterValues = {...defaultFilterValues};
    }
    setFilterValues(updatedFilterValues);

    const filteredData = [];
    const filteredProgramMetadata = {};
    for(let key in filterValues){
      filteredProgramMetadata[key] = [];
    }
    for(let program of data) {
      let include = true;
      const includeKeyFilt = {};
      for(let key in filteredProgramMetadata){
        includeKeyFilt[key] = true;
      }
      for (let key in filterValues) {
        if ((updatedFilterValues[key].length !== 0) &&
          ((typeof(program[key]) === "string" && !updatedFilterValues[key].includes(program[key])) ||
            (typeof(program[key]) === "object" && !hasOverlap(updatedFilterValues[key], program[key])) ||
            (key === "is_free" && updatedFilterValues[key][0] && !program[key]))) {
          include = false;
          for(let other_key in filteredProgramMetadata){
            if(other_key !== key) {
              includeKeyFilt[other_key] = false;
            }
          }
        }
      }
      if(include){
        filteredData.push(program);
      }
      for(let key in filterValues){
        if(includeKeyFilt[key] && (key in program) && (program[key] !== null)){
          if(filteredProgramMetadata[key] === null){
            filteredProgramMetadata[key] = [];
          }
          if(typeof(program[key]) !== "object") {
            filteredProgramMetadata[key].push(program[key])
          } else {
            filteredProgramMetadata[key].push(...program[key])
          }
        }
      }
    }
    for(let key in filteredProgramMetadata) {
      filteredProgramMetadata[key] = [...new Set(filteredProgramMetadata[key])].sort();
    }

    setFilteredPrograms(filteredData);
    setFilterMetadata(filteredProgramMetadata);
  };

  const hasOverlap = (ary_a, ary_b) => {
    if(ary_a === null || ary_b === null){
      return false;
    }
    for(let elt of ary_a){
      if(ary_b.includes(elt)){
        return true;
      }
    }
    return false;
  };

  const resetFilter = () => {
    setFilteredPrograms(data.slice(0));
    handleFilterRows(null, [], "name", true);
  };

  return (
    <div style={{backgroundColor: "#FFFFFF", textAlign: "center"}}>
      <div id={"search-bar"} style={{padding: "10px 40px", textAlign: "center"}}>
        {labelElts.map(labelElt =>
        <Autocomplete
          multiple
          options={filterMetadata[labelElt.key]}
          style={{ minWidth: "250px", width: (labelElt.key === "name" ? "40%" : "20%"),
            padding:"0px 20px 10px 0px", display: "inline-block"}}
          size={"small"}
          key={labelElt.key}
          renderInput={(params) => <TextField {...params} label={labelElt.label}/>}
          onChange={(evt, values) => handleFilterRows(evt, values, labelElt.key)}
          value={filterValues[labelElt.key]}
         />
        )}
        <FormControlLabel
          control={
            <Switch
              checked={filterValues["is_free"][0]}
              onChange={handleToggleChange}
              name="show_free"
              color="primary"
            />
          }
          label="Show only Free Programs"
        />
      </div>
      <div>
        <div style={{display: "inline-block", verticalAlign: "bottom"}}>
          <Button color="primary" size="small" variant="contained" style={{marginRight: "10px"}} onClick={resetFilter}>
            Clear filters
          </Button>
          <Button color="primary" size="small" variant="contained" style={{marginRight: "10px"}}>
            <CloudDownloadIcon size="small"/><CSVLink data={filteredPrograms} filename={exportFilename} headers={headers}
                     style={{verticalAlign: "center", color: "inherit", textDecoration: "none"}}>
              &nbsp;Download {filteredPrograms.length} result{filteredPrograms.length === 1 ? "" : "s"}
            </CSVLink>
          </Button>
        </div>
      </div>
      <div>
      {filteredPrograms.map(program => (
        <ProgramCard key={program.id+"-"+program.name} program={program}/>
      ))}
      </div>
    </div>
  );
};

export default ProgramCardArea;