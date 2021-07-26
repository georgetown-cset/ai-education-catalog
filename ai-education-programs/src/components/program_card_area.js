import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Paper from "@material-ui/core/Paper";
import {CSVLink} from "react-csv";
import {data} from "../data/data";
import ProgramCard from "./program_card";
import AutocompleteFilter from "./autocomplete_filter";
import CheckboxFilter from "./checkbox_filter";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

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

  const classes = useStyles();

  const dropdownLabelElts = [
    {"key": "name", "label": "Search by Program Title"},
    {"key": "keywords", "label": "Search by Keyword"},
    {"key": "organization", "label": "Select Hosting Organizations"},
    {"key": "target", "label": "Select Target Audiences"},
  ];
  const checkboxLabels = {
    "is_free": "Free",
    "is_underrep": "Serve underrepresented populations",
    "is_community_program": "Community-run"
  };

  const dropdowns = ["name", "keywords", "organization", "type", "target", "location"];
  const checkboxes = ["is_free", "is_underrep", "is_community_program"];
  const defaultFilterValues = {};
  for(let dropdown of dropdowns){
    defaultFilterValues[dropdown] = [];
  }
  for(let checkbox of checkboxes){
    defaultFilterValues[checkbox] = [false];
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
    { label: "race/ethnicity", key: "race/ethnicity"},
    { label: "participant_level", key: "level" },
    { label: "prerequisites", key: "pre_reqs" },
  ];

  const updateFilters = (filters, changed_key) => {
    let updatedFilterValues = {...filterValues};
    updatedFilterValues[changed_key] = [...filters];
    setFilterValues(updatedFilterValues);
    handleFilterRows(updatedFilterValues);
  };

  useEffect(() => {
    handleFilterRows(filterValues);
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
        if ((updatedFilterValues[key].length !== 0) &&
          ((typeof(program[key]) === "string" && !updatedFilterValues[key].includes(program[key])) ||
            (typeof(program[key]) === "object" && !hasOverlap(updatedFilterValues[key], program[key])) ||
            (checkboxes.includes(key) && updatedFilterValues[key][0] && !program[key]))) {
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
    setFilteredPrograms(shuffledData.slice(0));
    handleFilterRows(null, [], "name", true);
    setActiveStep(-1);
  };

  const [activeStep, setActiveStep] = React.useState(-1);
  const steps = ["Select Locations", "Select Program Types", "Customize Search"];

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AutocompleteFilter keyLabel={"location"} userLabel={"Select locations..."}
                              options={filterMetadata["location"]}
                              update={(filters) => updateFilters(filters, "location")}
                              indent={true} currFilters={filterValues["location"]}/>
        );
      case 1:
        return (
          <AutocompleteFilter keyLabel={"type"} userLabel={"Select program types..."}
                              options={filterMetadata["type"]} handleFilterRows={handleFilterRows}
                              update={(filters) => updateFilters(filters, "type")}
                              indent={true} currFilters={"type"}/>
        );
      case 2:
        return (
          <div style={{marginLeft: "30px"}}>
            <div>
              <Typography component={"body2"} style={{fontWeight: "bold"}}>
                Only show programs that are:&nbsp;&nbsp;&nbsp;</Typography>
              {checkboxes.map(checkboxKey =>
                <CheckboxFilter keyLabel={checkboxKey} userLabel={checkboxLabels[checkboxKey]}
                                update={(checked) => updateFilters([checked], checkboxKey)}/>
              )}
            </div>
            <div>
            {dropdownLabelElts.map(labelElt =>
              <AutocompleteFilter keyLabel={labelElt.key} userLabel={labelElt.label}
                                  options={filterMetadata[labelElt.key]}
                                  update={(filters) => updateFilters(filters, labelElt.key)}
                                  currFilters={filterValues[labelElt.key]}/>
            )}
            </div>
          </div>
        );
      default:
        return 'Unknown step';
    }
  }

  function prettyLabel(key, value=null){
    if(value == null){
      return checkboxLabels[key];
    }
    return value.substring(0,1).toUpperCase()+value.substring(1);
  }

  function isComplete(label){
    switch(label){
      case "Select Locations":
        return filterValues["location"].length > 0;
      case "Select Program Types":
        return filterValues["type"].length > 0;
      default:
          const boolSelected = filterValues["is_free"][0] || filterValues["is_underrep"][0] ||
                                  filterValues["is_community_program"][0];
          const arySelected = filterValues["name"].length > 0 || filterValues["organization"].length > 0 ||
                                  filterValues["target"].length > 0 || filterValues["keywords"].length > 0;
          return boolSelected || arySelected;
    }
  }

  return (
    <div style={{backgroundColor: "#FFFFFF", textAlign: "center"}}>
      <Paper id={"search-bar"} elevation={2} style={{paddingBottom: "10px"}}>
        <div style={{padding: "10px 40px", textAlign: "center", fontSize: "100%",
          display: "inline-block", minWidth: simplify? "200px" : "750px", width: "70%"}}>
          <div className={classes.root} style={{textAlign: "left"}}>
            <Stepper nonLinear activeStep={activeStep} orientation={simplify ? "vertical" : "horizontal"}>
              {steps.map((label, index) => (
                <Step key={label} completed={isComplete(label)}>
                  <StepButton onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
        <div style={{display: "inline-block", verticalAlign: "top", width: "30%", minWidth: "300px"}}>
          <Button color="primary" variant="contained" style={{margin: "30px 10px 0px 0px"}} onClick={resetFilter}>
            <ClearIcon size={"small"}/>&nbsp;Reset
          </Button>
          <Button color="primary" variant="contained" style={{margin: "30px 10px 0px 0px"}}>
            <CloudDownloadIcon size="small"/><CSVLink data={filteredPrograms} filename={exportFilename} headers={headers}
                     style={{verticalAlign: "center", color: "inherit", textDecoration: "none"}}>
              &nbsp;Download
            </CSVLink>
          </Button>
        </div>
        <div style={{textAlign: "left", padding: activeStep > -1 ? "10px 40px 20px 40px": "0", borderBottom: activeStep > -1 ? "1px dashed blue" : ""}}>
          {activeStep > -1 &&
            getStepContent(activeStep)
          }
        </div>
        <div style={{padding: "10px 0px 5px 0px"}}>
          <Typography variant={"body1"} style={{fontWeight: "bold"}}>Displaying {filteredPrograms.length} program{filteredPrograms.length === 1 ? "" : "s"}</Typography>
          <div>
            {Object.keys(filterValues).map((key) => (
              key.startsWith("is_") ?
                (filterValues[key][0] && <Chip style={{"margin": "10px"}} label={prettyLabel(key)} color="primary" />)
                :
                (filterValues[key].map((value) => <Chip style={{"margin": "10px 5px"}} label={prettyLabel(key, value)} color="primary" />))
            ))}
          </div>
        </div>
      </Paper>
      <div>
      {filteredPrograms.map(program => (
        <ProgramCard key={program.id+"-"+program.name} program={program} simplify={simplify}/>
      ))}
      </div>
    </div>
  );
};

export default ProgramCardArea;