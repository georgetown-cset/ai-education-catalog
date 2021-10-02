import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import {CSVLink} from "react-csv";
import {data} from "../data/data";
import ProgramCard from "./program_card";
import AutocompleteFilter from "./autocomplete_filter";
import CheckboxFilter from "./checkbox_filter";
import "core-js/features/url";
import "core-js/features/url-search-params";


// per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// Durstenfeld shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm , thanks
// to https://stackoverflow.com/a/12646864 for the reference
function shuffle(ary) {
  for (let i = ary.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    const tmp = ary[i];
    ary[i] = ary[j];
    ary[j] = tmp;
  }
}

const shuffledData = data.slice(0);
shuffle(shuffledData);

const ProgramCardArea = (props) => {
  const {simplify} = props;

  const dropdownFilterInfo = [
    {"key": "location", "label": "Location",
      "tooltip": "Filters programs by their physical location, if applicable."},
    {"key": "type", "label": "Program Type",
      "tooltip": "Filters programs by their category."},
    {"key": "organization", "label": "Hosting Organization",
      "tooltip": "Filters programs by their parent organization type."},
    {"key": "target", "label": "Target Audience",
      "tooltip": "Filters programs by their intended participants"},
  ];
  const checkboxFilterInfo = [
    {"key": "is_free", "label": "Free",
      "tooltip": "If checked, only programs with no cost to participate will be displayed."},
    {"key": "is_underrep", "label": "Serve underrepresented populations",
      "tooltip": "If checked, only programs that serve underrepresented groups in STEM fields will be displayed"},
    {"key": "is_community_program", "label": "Community-run",
      "tooltip": "If checked, only community-based programs will be displayed."}
  ];
  const checkboxes = checkboxFilterInfo.map((cb) => cb.key);

  const defaultFilterValues = {};
  for(let dropdown of dropdownFilterInfo){
    defaultFilterValues[dropdown.key] = [];
  }
  for(let checkbox of checkboxFilterInfo){
    defaultFilterValues[checkbox.key] = [false];
  }
  const [filterValues, setFilterValues] = React.useState({...defaultFilterValues});
  const [filterMetadata, setFilterMetadata] = React.useState({...defaultFilterValues});
  // randomly shuffle, but keep ordering consistent until user refreshes the page
  const [filteredPrograms, setFilteredPrograms] = React.useState(shuffledData.slice(0));

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
    { label: "gender", key: "gender" },
    { label: "race/ethnicity", key: "race_ethnicity"},
    { label: "participant_level", key: "level" },
    { label: "prerequisites", key: "pre_reqs" },
    { label: "is_community_program", key: "is_community_program"},
    { label: "duration", key: "duration"},
  ];

  const updateFilters = (filters, changed_key) => {
    let updatedFilterValues = {...filterValues};
    updatedFilterValues[changed_key] = [...filters];
    const urlParams = new URLSearchParams(window.location.search);
    if(filters.length === 0 || (checkboxes.includes(changed_key) && !filters[0])){
      urlParams.delete(changed_key);
    } else {
      urlParams.set(changed_key, updatedFilterValues[changed_key].join(","));
    }
    window.history.replaceState(null, null, window.location.pathname + '?' + urlParams.toString());
    setFilterValues(updatedFilterValues);
    handleFilterRows(updatedFilterValues);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let updatedFilterValues = {...filterValues};
    for(let filter in defaultFilterValues){
      if(urlParams.get(filter) !== null){
        updatedFilterValues[filter] = urlParams.get(filter).split(",");
      }
    }
    setFilterValues(updatedFilterValues);
    handleFilterRows(updatedFilterValues);
  }, []);

  const handleFilterRows = (updatedFilterValues) => {
    const filteredData = [];
    const filteredProgramMetadata = {};
    for(let key in filterValues){
      filteredProgramMetadata[key] = [];
    }
    for(let program of shuffledData) {
      let include = true;
      const includeKeyFilt = {};
      for(let key in filteredProgramMetadata){
        includeKeyFilt[key] = true;
      }
      for (let key in filterValues) {
        if (isNotSelected(updatedFilterValues, program, key)) {
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
      filteredProgramMetadata[key] = [...new Set(filteredProgramMetadata[key])].sort((a, b) => {
        // make "Virtual" and "National" appear first in the location dropdown
        const a_is_remote = (a === "Virtual") || (a === "National");
        const b_is_remote = (b === "Virtual") || (b === "National");
        if((key === "location") && (a_is_remote || b_is_remote)){
          if(a_is_remote && b_is_remote){
            return b > a ? 1 : -1;
          } else if(a_is_remote){
            return -1;
          } else {
            return 1;
          }
        }
        if(a === b){
          return 0;
        }
        return a > b ? 1 : -1;
      });
    }

    setFilteredPrograms(filteredData);
    setFilterMetadata(filteredProgramMetadata);
  };

  const isNotSelected = (rawFilters, program, key) => {
    if(rawFilters[key].length === 0){
      return false;
    }
    const filters = {...rawFilters};
    filters["location"] = [...rawFilters["location"]];
    switch(typeof(program[key])){
      case "string":
        return !filters[key].includes(program[key]);
      case "object":
        return !hasOverlap(filters[key], program[key]);
      case "boolean":
        return filters[key][0] && !program[key];
      default:
        return false;
    }
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
    setFilteredPrograms(shuffledData.slice(0));
    const origFilterVals = {...defaultFilterValues};
    setFilterValues(origFilterVals);
    handleFilterRows(origFilterVals);
    window.history.replaceState(null, null, window.location.pathname);
  };

  return (
    <div style={{backgroundColor: "#FFFFFF", textAlign: simplify ? "center": "left"}}>
      <Paper id={"search-bar"} elevation={2} style={{padding: "0px 5% 10px 5%"}}>
        <div style={{padding: "10px 0px", fontSize: "100%"}}>
          {dropdownFilterInfo.map((dropdown) =>
            <AutocompleteFilter keyLabel={dropdown.key} key={dropdown.key} userLabel={dropdown.label}
                                options={filterMetadata[dropdown.key]}
                                update={(filters) => updateFilters(filters, dropdown.key)}
                                indent={true} currFilters={filterValues[dropdown.key]}
                                tooltip={dropdown.tooltip}/>
          )}
        </div>
        <div style={{padding: "10px 0px", fontSize: "100%"}}>
          {checkboxFilterInfo.map((checkbox) =>
            <CheckboxFilter keyLabel={checkbox.key} key={checkbox.key} userLabel={checkbox.label}
                            update={(checked) => updateFilters([checked], checkbox.key)}
                            checked={filterValues[checkbox.key][0]} tooltip={checkbox.tooltip}/>
          )}
        </div>
        <div style={{verticalAlign: "top", padding: "10px 0px"}}>
          <Button color="primary" variant="contained" onClick={resetFilter} style={{marginRight: "20px", marginBottom: "10px", backgroundColor: "rgb(21, 32, 74)", borderRadius: "25px"}}>
            <ClearIcon size={"small"}/>&nbsp;Reset
          </Button>
          <Button color="primary" variant="contained" style={{backgroundColor: "rgb(21, 32, 74)", marginBottom: "10px", borderRadius: "25px"}}>
            <CloudDownloadIcon size="small"/>
            <CSVLink data={filteredPrograms} filename={exportFilename} headers={headers}
                     style={{verticalAlign: "center", color: "inherit", textDecoration: "none"}}>
              &nbsp;Download {filteredPrograms.length} selected program{filteredPrograms.length === 1 ? "" : "s"}
            </CSVLink>
          </Button>
        </div>
      </Paper>
      <div style={{textAlign: "center"}}>
      {filteredPrograms.map(program => (
        <ProgramCard key={program.id+"-"+program.name} program={program} simplify={simplify}/>
      ))}
      </div>
    </div>
  );
};

export default ProgramCardArea;