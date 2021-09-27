import cset_logo from "../images/cset_logo.svg";
import aiedu_logo from "../images/aiedu_logo.png";
import React from "react";

const CatalogToolbar = () => {
  return (
    <div id="toolbar" style={{padding: "15px 20px 10px 20px", backgroundColor: "rgb(21, 32, 74)"}}>
      <div style={{width: "50%", display: "inline-block", verticalAlign: "middle"}}>
        <a href={"https://cset.georgetown.edu"} target="_blank" rel="noreferrer"
          title="Link to CSET website, cset.georgetown.edu">
          <img src={cset_logo} style={{width: "300px", margin: "0"}} alt="CSET Logo"/>
        </a>
      </div>
      <div style={{width: "50%", display: "inline-block", textAlign: "right", verticalAlign: "middle"}}>
        <a href={"https://aiedu.org/"} target="_blank" rel="noreferrer"
          title="Link to AI Education Project website, aiedu.org">
          <img src={aiedu_logo} style={{height: "40px", margin: "0"}} alt="AI Edu Logo"/>
        </a>
      </div>
    </div>
  );
};

export default CatalogToolbar;