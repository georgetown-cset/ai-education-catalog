import React from "react";
import Link from "@material-ui/core/Link";

import cset_logo from "../images/cset_logo.svg";
import github_logo from "../images/GitHub-Mark-Light-32px.png";
import aiedu_logo from "../images/aiedu_logo.svg";


const CatalogToolbar = (props) => {
  const {simplify} = props;

  return (
    <div id="toolbar" style={{padding: "15px 20px 10px 20px", backgroundColor: "rgb(21, 32, 74)",
      color: "white", height: "75px"}}>
      <div style={{width: "33%", display: simplify ? "none": "inline-block", verticalAlign: "middle"}}>
        <a href={"https://cset.georgetown.edu"} target="_blank" rel="noreferrer"
          title="Link to CSET website, cset.georgetown.edu">
          <img src={cset_logo} style={{height: "30px", margin: "0", verticalAlign: "middle"}} alt="CSET Logo"/>
        </a>
      </div>
      <div style={{width: simplify? "100%" : "33%", display: "inline-block", verticalAlign: "middle",
        textAlign: "center", height: "35px"}}>
        <a href={"https://github.com/georgetown-cset/ai-education-catalog"} target="_blank" rel="noreferrer"
          title="Link to project github repository.">
          <img src={github_logo} alt="Github logo" height={"25px"}  style={{verticalAlign: "bottom"}}/>
        </a>
        <span style={{padding: "0px 10px"}}>•</span>
        <Link href={"https://docs.google.com/forms/d/e/1FAIpQLSftdThJPlSsm-KGkVQl1QlrjFvO3LABNyzYaERpRrL1TwMhFQ/viewform"}
              target="_blank" rel="noopener"
              style={{color: "rgb(20, 196, 185)", verticalAlign: "middle"}}
          title="Link to contact form">
          Contact Us
        </Link>
      </div>
      <div style={{width: "33%", display: simplify ? "none": "inline-block", textAlign: "right",
        verticalAlign: "middle"}}>
        <a href={"https://aiedu.org/"} target="_blank" rel="noreferrer"
          title="Link to AI Education Project website, aiedu.org">
          <img src={aiedu_logo} style={{height: "35px", margin: "0"}} alt="AI Edu Logo"/>
        </a>
      </div>
    </div>
  );
};

export default CatalogToolbar;