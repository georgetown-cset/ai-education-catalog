import React, {useEffect} from "react"
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import "../styles/styles.css";
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
  const [showMore, setShowMore] = React.useState(false);
  const handleWindowResize = () => {
    setSimplify(window.innerWidth < 550)
  };

  // thank you https://stackoverflow.com/a/63066975
  const isSSR = typeof window === "undefined";

  return (
    <div>
      <CatalogToolbar simplify={simplify}/>
      <div id="colorbar-container">
        <div id="project-description">
          <h1>AI Education Catalog</h1>
          <Typography variant={"h4"} style={{textAlign: "left", marginBottom: "20px"}}>The AI Education Catalog was
            created by a partnership between
            the <Link href={"https://cset.georgetown.edu"} target="_blank" rel="noopener"
          title="Link to CSET website, cset.georgetown.edu">Center for Security and Emerging Technology</Link> and
            the <Link href={"https://aiedu.org/"} target="_blank" rel="noopener">AI Education Project</Link>. It aims
            to raise awareness of the AI-related programs available to students and educators and to help inform AI
            education and workforce policy. We welcome contributions or corrections through
            our <Link href={"https://github.com/georgetown-cset/ai-education-catalog"} target="_blank" rel="noopener"
            title="Link to project github repository.">GitHub repository</Link> or <Link href={"https://docs.google.com/forms/d/e/1FAIpQLSftdThJPlSsm-KGkVQl1QlrjFvO3LABNyzYaERpRrL1TwMhFQ/viewform"} target="_blank" rel="noopener"
                  title="Link to contact form.">contact form</Link>.
          </Typography>
          <div>
          <div>
            <Button style={{padding: "0px 5px", display: showMore ? "none": "block", color: "rgb(20, 196, 185)"}}
                    onClick={() => setShowMore(true)}>+ Show Details</Button>
            <Button style={{padding: "0px 5px", display: showMore ? "block": "none", color: "rgb(20, 196, 185)"}}
                    onClick={() => setShowMore(false)}>- Hide Details</Button>
          </div>
          </div>
        </div>
        <div id="colorbar">
          <img alt="Hand reaching for books." src={header1} id={"header1"} className={"header-img"}/>
          <img alt="Person working on a laptop." src={header2} id={"header2"} className={"header-img"}/>
          <img alt="Person coding." src={header3} id={"header3"} className={"header-img"}/>
          <img alt="Truck that might be used in a robotics coding exercise." src={header4} id={"header4"} className={"header-img"}/>
          <img alt="Campsite." src={header5} id={"header5"} className={"header-img"}/>
        </div>
        <div id="header-color-overlay"></div>
      </div>
      <div style={{backgroundColor: "rgb(21, 32, 74)"}}>
      <div id="more-info" style={{display: showMore ? "block": "none"}}>
        <Typography variant={"body1"} style={{marginBottom: "20px"}}>
          Catalog entries are listed in one of the following categories: after-school
          programs, apprenticeships, challenges, conferences, curricula, fellowships,
          hackathons, internships, robotics, scholarships, and summer camps. Users can
          search by location, program type, hosting organization, and target audience
          (note that available search filters reflect what is available in the currently
          selected programs). Some listed programs may have multiple kinds of offerings;
          where this happens, we have chosen the most prominent offering to label the
          program. We also identify programs that are free, target populations
          underrepresented in STEM fields, or are community oriented.
        </Typography>
        <Typography variant={"body1"} style={{marginBottom: "40px"}}>
          We hope that the catalog is used to increase AI education across the United
          States. We believe a thriving future U.S. workforce includes cultivating
          globally competitive talent on the leading edge of AI design, development, and
          deployment; training and equipping all Americans to operate responsible and
          safe AI; and promoting AI workforce diversity through equitable access and
          opportunity to such resources.
        </Typography>
        <Typography variant={"body2"} style={{marginBottom: "20px"}}>
          Contributors to the AI Education Catalog
          include <Link href={"https://cset.georgetown.edu/staff/claire-perkins/"} target="_blank" rel="noopener">Claire Perkins</Link>
          , <Link href={"https://cset.georgetown.edu/staff/diana-gehlhaus/"} target="_blank" rel="noopener">Diana Gehlhaus</Link>
          , <Link href={"https://cset.georgetown.edu/staff/kayla-goode/"} target="_blank" rel="noopener">Kayla Goode</Link>
          , and <Link href={"https://cset.georgetown.edu/staff/jennifer-melot/"} target="_blank" rel="noopener">Jennifer Melot</Link> at CSET,
          and <Link href={"https://aiedu.org/team-ehrik-aldana"} target="_blank" rel="noopener">Ehrik Aldana</Link>
          , <Link href={"https://aiedu.org/team-grace-doerfler"} target="_blank" rel="noopener">Grace Doerfler</Link>
          , and <Link href={"https://aiedu.org/about-us"} target="_blank" rel="noopener">Gayani Gamage</Link> at the
          AI Education Project. The contributors thank James Dunham, Rebecca Gelles, Igor Mikolic-Torreira,
          Catherine Aiken, and Lynne Weil for their advice and feedback, and Chenxi Liu for assistance with
          program metadata collection.
        </Typography>
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
