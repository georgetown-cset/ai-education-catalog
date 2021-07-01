import React, {useEffect} from "react"
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';

import cset_logo from "../images/cset_logo.svg";
import aiedu_logo from "../images/aiedu_logo.png";
import "../styles/styles.css";
import "../components/layout.css"

const ProgramCardArea = React.lazy(() => import("../components/program_card_area"));

const IndexPage = () => {

  useEffect(() => {
    document.title = "AI Education Catalog";
    document.documentElement.lang = "en";
  }, []);

  // thank you https://stackoverflow.com/a/63066975
  const isSSR = typeof window === "undefined";

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
          <ProgramCardArea/>
        </React.Suspense>
      )}
    </div>
  )
};

export default IndexPage
