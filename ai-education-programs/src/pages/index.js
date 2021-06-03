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
    //window.addEventListener("resize", handleWindowResize);
    //handleWindowResize();
  }, []);

  const [filteredPrograms, setFilteredPrograms] = React.useState(data.slice(0));

  // thank you https://stackoverflow.com/a/63066975
  const isSSR = typeof window === "undefined";

  const labelElts = [
    {"key": "name", "label": "Search for a Program"},
  ];

  let simplify = false;

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
              filters to go here
              <div style={{display: (simplify ? "block" : "inline-block"), verticalAlign: "bottom"}}>
                <Button color="primary" size="small" variant="contained" style={{marginRight: "10px"}}>
                  Clear Filters
                </Button>
              </div>
            </div>
            <div>
            {filteredPrograms.map(program => (
              <ProgramCard key={program.name} program={program} simplify={simplify}/>
            ))}
            </div>
          </div>
        </React.Suspense>
      )}
    </div>
  )
};

const ProgramCard = (props) => {
    const {program, simplify} = props;

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
      <Card elevation={2} style={{margin: "20px", width: (simplify ? "80%" : "500px"),
        display: "inline-block", textAlign: "left", padding: (simplify ? "20px" : "0px"),
        minHeight: "500px", backgroundColor: "rgba(0,160,0,0.05)"}}>
        <ProgramCardHeader program={program}/>
        <div style={{padding: (simplify ? "0px" : "10px 20px 20px 20px"), marginTop: "10px"}}>
          <div style={{marginBottom: "20px"}}>
            <Typography variant={"h6"}>
              <Link rel={"noreferrer"} target={"_blank"} href={""} style={{color: "rgba(0,160,0,1)"}}>{program.name}</Link>
            </Typography>
          </div>
          <Typography variant={"body2"} style={{marginBottom: "20px", color: "#636363"}}>
            {program.objective}
          </Typography>
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
