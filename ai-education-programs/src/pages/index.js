import React, {useEffect} from "react"
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import {data} from "../data/data";
import cset_logo from "../images/cset_logo.svg";
import aiedu_logo from "../images/aiedu_logo.png";
import "../styles/styles.css";

const IndexPage = () => {

  useEffect(() => {
    document.title = "AI Education Catalog";
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
    "underrep": [],
    "is_free": [false]
  };

  const [filterValues, setFilterValues] = React.useState({...defaultFilterValues});
  const [filterMetadata, setFilterMetadata] = React.useState({...defaultFilterValues});
  const [filteredPrograms, setFilteredPrograms] = React.useState(data.slice(0));

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
    <div>
      <div id="toolbar" style={{"margin": "20px 20px 0px 20px"}}>
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
      <div id="project-description" style={{"margin": "0px 10% 50px 10%", textAlign: "center"}}>
        <h1>🤖 AI Education Catalog 🤖</h1>
        <h4>A joint project of the <Link>Center for Security and Emerging Technology</Link> and the <Link>AI Education Project</Link>.</h4>
        <h4><Link style={{padding: "0px 10px"}}>About</Link> • <Link style={{padding: "0px 5px"}}>Team</Link> • <Link style={{padding: "0px 5px"}}>Contact Us</Link></h4>
      </div>
      {!isSSR && (
        <React.Suspense fallback={<div style={{textAlign: "center"}}><CircularProgress/></div>}>
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
              <div style={{display: "inline-block", verticalAlign: "bottom"}}>
                <Button color="primary" size="small" variant="contained" style={{marginRight: "10px"}} onClick={resetFilter}>
                  Clear Filters
                </Button>
                <span>Showing {filteredPrograms.length} results!</span>
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

    const programTypeColors = {
      "Afterschool Program": "rgba(122, 196, 165",
      "Apprenticeship": "rgba(60, 135, 134",
      "Challenge": "rgba(21, 175, 208",
      "Conference": "rgba(181, 58, 109",
      "Curriculum": "rgba(124, 51, 111",
      "Fellowship": "rgba(131, 157, 197",
      "Hackathon": "rgba(241, 127, 76",
      "Internship": "rgba(229, 191, 33",
      "Robotics": "rgba(180, 32, 37",
      "Scholarship": "rgba(255, 105, 180",
      "Summer Camp": "rgba(11, 31, 65",
      "Summer Program": "rgba(0, 160, 0",
    };

    const get_pretty_list = function(ary){
      if(ary === null || ary.length === 0){
        return null;
      } else if(ary.length === 1){
        return ary[0].toLowerCase();
      } else if(ary.length === 2){
        return (ary[0]+" and "+ary[1]).toLowerCase();
      } else{
        return (ary.slice(0, ary.length -1).join(", ")+" and "+ary[ary.length -1]).toLowerCase();
      }
    };

    return (
      <Card elevation={2} style={{margin: "20px", width: "480px",
        display: "inline-block", textAlign: "left",
        minHeight: "320px", backgroundColor: programTypeColors[program.type]+",0.05)"}}>
        <ProgramCardHeader program={program} color={programTypeColors[program.type]}/>
        <div style={{padding: "10px 20px 20px 20px", marginTop: "10px"}}>
          <div style={{marginBottom: "20px"}}>
            <Typography variant={"h6"} style={{fontSize: "100%", fontWeight: "bold"}}>
              <Link rel={"noreferrer"} target={"_blank"} href={""} style={{color: programTypeColors[program.type]+",1)"}}>{program.name}</Link>
            </Typography>
          </div>
          {program.objective !== null && (showLongSummary ?
            <Typography variant={"body2"} style={{marginBottom: "20px", color: "black", fontSize: "85%"}}>
              {program.objective} {program.objective.length !== program.short_objective.length && <Link style={{cursor: "pointer", color: programTypeColors[program.type]+",1)"}} onClick={() => setShowLongSummary(false)}>Show less...</Link>}
            </Typography> :
            <Typography variant={"body2"} style={{marginBottom: "20px", color: "black", fontSize: "85%"}}>
              {program.short_objective} {program.objective.length !== program.short_objective.length && <Link style={{cursor: "pointer", color: programTypeColors[program.type]+",1)"}} onClick={() => setShowLongSummary(true)}>Show more...</Link>}
            </Typography>)
          }
          <Typography variant={"body2"} style={{marginBottom: "20px", color: "#636363", fontWeight: "bold", fontSize: "75%"}}>
            This program is targeted to {program.underrep !== null && program.underrep.length > 0 && get_pretty_list(program.underrep)+" "}{program.level ? program.level : get_pretty_list(program.target)}{program.pre_reqs !== null && program.pre_reqs.length > 0 && " who have the following pre-requisites: " + get_pretty_list(program.pre_reqs)}.
          </Typography>
        </div>
      </Card>
    )
};

const ProgramCardHeader = (props) => {
  const {program, color} = props;

  const programEmoji = {
    "Afterschool Program": "🎒",
    "Apprenticeship": "🛠️",
    "Challenge": "💪",
    "Conference": "🗣️",
    "Curriculum": "✏️",
    "Fellowship": "🎓",
    "Hackathon": "💻",
    "Internship": "📓",
    "Robotics": "🤖",
    "Scholarship": "💸",
    "Summer Camp": "⛺",
    "Summer Program": "☀️",
  };

  return (
    <div>
        <CardActionArea style={{backgroundColor: color+",1)", padding: "7px 5px", color: "white", textAlign: "center"}}>
          <Typography variant={"body2"} style={{fontWeight: "bold"}}>
            {programEmoji[program.type]} {program.type}
          </Typography>
        </CardActionArea>
        <CardActionArea style={{backgroundColor: color+",0.7)", padding: "3px 5px", color: "white", textAlign: "center"}}>
          <div>
            <div style={{display: "inline-block", minWidth: "100px", width: "50%", textAlign: "center", borderRight: "1px solid white"}}>
              <Typography variant={"body2"} style={{fontSize: "80%", fontWeight: "bold"}}>Cost: {program.cost}</Typography>
            </div>
            <div style={{display: "inline-block", minWidth: "100px", width: "50%", textAlign: "center"}}>
              <Typography variant={"body2"} style={{fontSize: "80%", fontWeight: "bold"}}>Location: {program.location.join(", ")}</Typography>
            </div>
          </div>
        </CardActionArea>
    </div>
  )
};

export default IndexPage
