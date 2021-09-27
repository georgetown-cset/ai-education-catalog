import React, {useEffect} from "react"
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';

import "../styles/styles.css";
import "../components/layout.css"
import header1 from "../images/header1.png";
import header2 from "../images/header2.png";
import header3 from "../images/header3.png";
import header4 from "../images/header4.png";
import header5 from "../images/header5.png";
import CatalogToolbar from "../components/toolbar";

const ProgramCardArea = React.lazy(() => import("../components/program_card_area"));

const IndexPage = () => {

  useEffect(() => {
    document.title = "AI Education Catalog";
    document.documentElement.lang = "en";
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
  }, []);

  const [simplify, setSimplify] = React.useState(true);
  const handleWindowResize = () => {
    setSimplify(window.innerWidth < 750)
  };

  // thank you https://stackoverflow.com/a/63066975
  const isSSR = typeof window === "undefined";

  return (
    <div>
      <CatalogToolbar/>
      <div id="colorbar-container">
        <div id="colorbar">
          <img alt="header1" src={header1} id={"header1"} className={"header-img"}/>
          <img alt="header2" src={header2} id={"header2"} className={"header-img"}/>
          <img alt="header3" src={header3} id={"header3"} className={"header-img"}/>
          <img alt="header4" src={header4} id={"header4"} className={"header-img"}/>
          <img alt="header5" src={header5} id={"header5"} className={"header-img"}/>
        </div>
        <div id="project-description" style={{"margin": "0px 10% 50px 10%", textAlign: "center", zIndex: 2, color: "white", position: "absolute", top: "0px"}}>
          <h1>🤖 AI Education Catalog 🤖</h1>
          <h4>A joint project from the <Link>Center for Security and Emerging Technology</Link> and the <Link>AI Education Project</Link>.</h4>
          <h4><Link style={{padding: "0px 10px"}} href={"/about"}>About</Link> • <Link style={{padding: "0px 5px"}} href={"/team"}>Team</Link> • <Link style={{padding: "0px 5px"}}>Contact Us</Link></h4>
        </div>
      </div>
      {!isSSR && (
        <React.Suspense fallback={<div style={{textAlign: "center"}}><CircularProgress/></div>}>
          <ProgramCardArea simplify={simplify}/>
        </React.Suspense>
      )}
    </div>
  )
};

export default IndexPage
