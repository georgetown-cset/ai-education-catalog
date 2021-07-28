import cset_logo from "../images/cset_logo.svg";
import aiedu_logo from "../images/aiedu_logo.png";
import React from "react";

const CatalogToolbar = () => {
  return (
    <div id="toolbar" style={{"margin": "20px 20px 0px 20px"}}>
      <div style={{width: "50%", display: "inline-block", verticalAlign: "top"}}>
        <a href={"https://cset.georgetown.edu"} target="_blank" rel="noreferrer"
          title="Link to CSET website, cset.georgetown.edu">
          <img src={cset_logo} style={{"width": "300px"}} alt="CSET Logo"/>
        </a>
      </div>
      <div style={{width: "50%", display: "inline-block", textAlign: "right", verticalAlign: "top"}}>
        <a href={"https://aiedu.org/"} target="_blank" rel="noreferrer"
          title="Link to AI Education Project website, aiedu.org">
          <img src={aiedu_logo} style={{"height": "50px"}} alt="AI Edu Logo"/>
        </a>
      </div>
    </div>
  );
};

export default CatalogToolbar;