import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ClearIcon from '@material-ui/icons/Clear';
import Paper from "@material-ui/core/Paper";
import {CSVLink} from "react-csv";
import {data} from "../data/data";
import ProgramCard from "./program_card";

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

const ProgramCardArea = (props) => {
  const {simplify} = props;

  useEffect(() => {
    handleFilterRows(null, [], "name");
  }, []);

  const classes = useStyles();

  const labelElts = [
    {"key": "name", "label": "Search for Specific Programs"},
    {"key": "organization", "label": "Select Hosting Organizations"},
    {"key": "target", "label": "Select Target Audiences"},
  ];

  const defaultFilterValues = {
    "name": [],
    "organization": [],
    "type": [],
    "target": [],
    "location": [],
    "is_free": [false],
    "is_underrep": [false],
    "is_community_program": [false]
  };

  const checkboxes = ["is_free", "is_underrep", "is_community_program"];

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
    { label: "gender", key: "gender" },
    { label: "race/ethnicity", key: "race/ethnicity"},
    { label: "participant_level", key: "level" },
    { label: "prerequisites", key: "pre_reqs" },
  ];

  const handleToggleChange = (changed_key) => {
    handleFilterRows("", [!filterValues[changed_key][0]], changed_key);
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
    setFilteredPrograms(data.slice(0));
    handleFilterRows(null, [], "name", true);
    setActiveStep(-1);
  };

  const [activeStep, setActiveStep] = React.useState(-1);
  const steps = getSteps();

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  function getSteps() {
    return ["Select Locations", "Select Program Types", "Customize Search"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div style={{marginLeft: "30px"}}>
            <Autocomplete
            multiple
            options={filterMetadata["location"]}
            style={{ minWidth: "300px",
              padding:"0px 20px 10px 0px", display: "inline-block"}}
            size={"small"}
            renderInput={(params) => <TextField {...params} label={"Select locations..."}/>}
            onChange={(evt, values) => handleFilterRows(evt, values, "location")}
            value={filterValues["location"]}
           />
          </div>
        );
      case 1:
        return (
          <div style={{marginLeft: "30px"}}>
            <Autocomplete
            multiple
            options={filterMetadata["type"]}
            style={{ minWidth: "300px",
              padding:"0px 20px 10px 0px", display: "inline-block"}}
            size={"small"}
            renderInput={(params) => <TextField {...params} label={"Select program types..."}/>}
            onChange={(evt, values) => handleFilterRows(evt, values, "type")}
            value={filterValues["type"]}
           />
          </div>
        );
      case 2:
        return (
          <div style={{marginLeft: "30px"}}>
            <div>
              <Typography component={"body2"} style={{fontWeight: "bold"}}>Only show programs that are:&nbsp;&nbsp;&nbsp;</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterValues["is_free"][0]}
                    onChange={() => handleToggleChange("is_free")}
                    inputProps={{'aria-label': 'primary checkbox'}}
                  />
                }
                label={"Free"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterValues["is_underrep"][0]}
                    onChange={() => handleToggleChange("is_underrep")}
                    inputProps={{'aria-label': 'primary checkbox'}}
                  />
                }
                label={"Serve underrepresented populations"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterValues["is_community_program"][0]}
                    onChange={() => handleToggleChange("is_community_program")}
                    inputProps={{'aria-label': 'primary checkbox'}}
                  />
                }
                label={"Community-run"}
              />
            </div>
            <div>
            {labelElts.map(labelElt =>
              <Autocomplete
                multiple
                options={filterMetadata[labelElt.key]}
                style={{ minWidth: "300px",
                  padding:"0px 20px 10px 0px", display: "inline-block"}}
                size={"small"}
                key={labelElt.key}
                renderInput={(params) => <TextField {...params} label={labelElt.label}/>}
                onChange={(evt, values) => handleFilterRows(evt, values, labelElt.key)}
                value={filterValues[labelElt.key]}
               />
              )}
            </div>
          </div>
        );
      default:
        return 'Unknown step';
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
                <Step key={label}>
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
        <div style={{textAlign: "left", padding: activeStep > -1 ? "10px 40px 20px 40px": "0", backgroundColor: "rgba(66, 83, 175, 0.05)"}}>
          {activeStep > -1 &&
            getStepContent(activeStep)
          }
        </div>
        <div style={{padding: "10px 0px 5px 0px"}}>
          <Typography variant={"body1"} style={{fontWeight: "bold"}}>Displaying {filteredPrograms.length} program{filteredPrograms.length === 1 ? "" : "s"}</Typography>
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