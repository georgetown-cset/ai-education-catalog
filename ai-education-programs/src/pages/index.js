import React, {useEffect} from "react"
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';

import "../styles/styles.css";
import "../components/layout.css"
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
      <div id="project-description" style={{"margin": "0px 10% 50px 10%", textAlign: "center"}}>
        <h1>🤖 AI Education Catalog 🤖</h1>
        <h4>A joint project from the <Link>Center for Security and Emerging Technology</Link> and the <Link>AI Education Project</Link>.</h4>
        <h4><Link style={{padding: "0px 10px"}} href={"/about"}>About</Link> • <Link style={{padding: "0px 5px"}} href={"/team"}>Team</Link> • <Link style={{padding: "0px 5px"}}>Contact Us</Link></h4>
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
