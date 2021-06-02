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
        <a href={"https://cset.georgetown.edu"} target="_blank" rel="noreferrer"
           title="Link to CSET website, cset.georgetown.edu">
          <img src={cset_logo} style={{"width": "300px"}} alt="CSET Logo"/>
        </a>
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

    return (
      <Card elevation={2} style={{margin: "20px", width: (simplify ? "80%" : "450px"),
        display: "inline-block", textAlign: "left", padding: (simplify ? "20px" : "0px"),
        minHeight: "500px"}}>
        <div style={{display: "inline-block",
          padding: (simplify ? "0px" : "20px 20px 20px 20px"), marginTop: "10px"}}>
          <Typography variant={"h6"} style={{marginBottom: "20px"}}>
            <Link rel={"noreferrer"} target={"_blank"} href={""}>{program.name}</Link>
          </Typography>
          <Typography variant={"body2"} style={{marginBottom: "20px", color: "#636363"}}>
            {program.objective}
          </Typography>
        </div>
      </Card>
    )
};

export default IndexPage
