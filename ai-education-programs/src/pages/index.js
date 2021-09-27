import React, {useEffect} from "react"
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";

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
        <div id="project-description">
          <h1>AI Education Catalog</h1>
          <h4 style={{lineHeight: "1.5rem", textAlign: "left"}}>The AI Education Catalog was created by a partnership between
            the <Link href={"https://cset.georgetown.edu"} target="_blank" rel="noopener"
          title="Link to CSET website, cset.georgetown.edu">Center for Security and Emerging Technology</Link> and
            the <Link href={"https://aiedu.org/"} target="_blank" rel="noopener">AI Education Project</Link>. It aims to
            raise awareness of the AI-related programs available for students and educators and to help inform AI
            education and workforce policy. We welcome contributions or corrections through
            our <Link href={"https://github.com/georgetown-cset/ai-education-catalog"} target="_blank" rel="noopener"
            title="Link to project github repository.">GitHub repository</Link> or
            contact form.
          </h4>
          <h4><Link style={{padding: "0px 5px"}}>+ Show More</Link></h4>
        </div>
        <div id="colorbar">
          <img alt="Decorative header image of hand reaching for books." src={header1} id={"header1"} className={"header-img"}/>
          <img alt="Decorative header image of person working on a laptop." src={header2} id={"header2"} className={"header-img"}/>
          <img alt="Decorative header image of person coding." src={header3} id={"header3"} className={"header-img"}/>
          <img alt="Decorative header image of a truck that might be used in a robotics coding exercise." src={header4} id={"header4"} className={"header-img"}/>
          <img alt="Decorative header image of a campsite." src={header5} id={"header5"} className={"header-img"}/>
        </div>
        <div id="header-color-overlay"></div>
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
