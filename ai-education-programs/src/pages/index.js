import React, {useEffect} from "react"
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import {data} from "../data/data";
import cset_logo from "../images/cset_logo.svg";
import aiedu_logo from "../images/aiedu_logo.png";
import "../styles/styles.css";

const IndexPage = () => {

  useEffect(() => {
    document.title = "AI Education Programs";
    document.documentElement.lang = "en";
    handleFilterRows(null, [], "name");
  }, []);

  // thank you https://stackoverflow.com/a/63066975
  const isSSR = typeof window === "undefined";

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
    "underrep": []
  };
  const [filterValues, setFilterValues] = React.useState({...defaultFilterValues});
  const [filterMetadata, setFilterMetadata] = React.useState({...defaultFilterValues});
  const [filteredPrograms, setFilteredPrograms] = React.useState(data.slice(0));

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
            (typeof(program[key]) === "object" && !hasOverlap(updatedFilterValues[key], program[key])))) {
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
          if(typeof(program[key]) === "string") {
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
    <div>
      <div id="toolbar" style={{"margin": "20px"}}>
        <div style={{width: "50%", display: "inline-block"}}>
          <a href={"https://cset.georgetown.edu"} target="_blank" rel="noreferrer"
            title="Link to CSET website, cset.georgetown.edu">
            <img src={cset_logo} style={{"width": "300px"}} alt="CSET Logo"/>
          </a>
        </div>
        <div style={{width: "50%", display: "inline-block", textAlign: "right"}}>
          <a href={"https://aiedu.org/"} target="_blank" rel="noreferrer"
            title="Link to AI Education Project website, aiedu.org">
            <img src={aiedu_logo} style={{"height": "50px"}} alt="AI Edu Logo"/>
          </a>
        </div>
      </div>
      <div id="project-description" style={{"margin": "50px 10%"}}>
        ...header info...
      </div>
      {!isSSR && (
        <React.Suspense fallback={<div style={{textAlign: "center"}}><CircularProgress/></div>}>
          <div style={{backgroundColor: "#FFFFFF", textAlign: "center"}}>
            <div id={"search-bar"} style={{padding: "10px", textAlign: "center"}}>
              {labelElts.map(labelElt =>
              <Autocomplete
                multiple
                options={filterMetadata[labelElt.key]}
                style={{ width: (labelElt.key === "name" ? "40%" : "20%"),
                  minWidth: "250px", padding:"0px 20px 10px 0px", display: "inline-block"}}
                size="small"
                key={labelElt.key}
                renderInput={(params) => <TextField {...params} label={labelElt.label}/>}
                onChange={(evt, values) => handleFilterRows(evt, values, labelElt.key)}
                value={filterValues[labelElt.key]}
               />
              )}
              <div style={{display: "inline-block", verticalAlign: "bottom"}}>
                <Button color="primary" size="small" variant="contained" style={{marginRight: "10px"}} onClick={resetFilter}>
                  Clear Filters
                </Button>
              </div>
            </div>
            <div>
            {filteredPrograms.map(program => (
              <ProgramCard key={program.id+"-"+program.name} program={program}/>
            ))}
            </div>
          </div>
        </React.Suspense>
      )}
    </div>
  )
};

const ProgramCard = (props) => {
    const {program} = props;
    const [showLongSummary, setShowLongSummary] = React.useState(false);

    const get_pretty_list = function(ary){
      if(ary === null || ary.length === 0){
        return null;
      } else if(ary.length === 1){
        return ary[0];
      } else if(ary.length === 2){
        return ary[0]+" and "+ary[1];
      } else{
        return ary.slice(0, ary.length -1).join(", ")+" and "+ary[ary.length -1];
      }
    };

    return (
      <Card elevation={2} style={{margin: "20px", width: "500px",
        display: "inline-block", textAlign: "left",
        minHeight: "400px", backgroundColor: "rgba(0,160,0,0.05)"}}>
        <ProgramCardHeader program={program}/>
        <div style={{padding: "10px 20px 20px 20px", marginTop: "10px"}}>
          <div style={{marginBottom: "20px"}}>
            <Typography variant={"h6"}>
              <Link rel={"noreferrer"} target={"_blank"} href={""} style={{color: "rgba(0,160,0,1)"}}>{program.name}</Link>
            </Typography>
          </div>
          {program.objective !== null && (showLongSummary ?
            <Typography variant={"body2"} style={{marginBottom: "20px", color: "#636363"}}>
              {program.objective} {program.objective.length !== program.short_objective.length && <Link style={{cursor: "pointer"}} onClick={() => setShowLongSummary(false)}>Show less...</Link>}
            </Typography> :
            <Typography variant={"body2"} style={{marginBottom: "20px", color: "#636363"}}>
              {program.short_objective} {program.objective.length !== program.short_objective.length && <Link style={{cursor: "pointer"}} onClick={() => setShowLongSummary(true)}>Show more...</Link>}
            </Typography>)
          }
          <Typography variant={"body2"} style={{marginBottom: "20px", color: "#636363", fontWeight: "bold", fontSize: "80%"}}>
            This program is targeted to {program.underrep !== null && program.underrep.length > 0 && get_pretty_list(program.underrep)+" "}{get_pretty_list(program.target)}{program.pre_reqs !== null && program.pre_reqs.length > 0 && " who have the following pre-requisites: " + get_pretty_list(program.pre_reqs)}.
          </Typography>
        </div>
      </Card>
    )
};

const ProgramCardHeader = (props) => {
  const {program} = props;

  return (
    <div>
        <CardActionArea style={{backgroundColor: "rgba(0,160,0,1)", padding: "7px 5px", color: "white", textAlign: "center"}}>
          <Typography variant={"body1"} style={{fontWeight: "bold", marginBottom: "5px"}}>{program.type}</Typography>
        </CardActionArea>
        <CardActionArea style={{backgroundColor: "rgba(0,160,0,0.7)", padding: "7px 5px", color: "white", textAlign: "center"}}>
          <div>
            <div style={{display: "inline-block", minWidth: "100px", width: "50%", textAlign: "center", borderRight: "1px solid grey"}}>
              <Typography variant={"body2"} style={{fontSize: "80%"}}>Cost: {program.cost}</Typography>
            </div>
            <div style={{display: "inline-block", minWidth: "100px", width: "50%", textAlign: "center"}}>
              <Typography variant={"body2"} style={{fontSize: "80%"}}>Location: {program.location.join(", ")}</Typography>
            </div>
          </div>
        </CardActionArea>
    </div>
  )
};

export default IndexPage
