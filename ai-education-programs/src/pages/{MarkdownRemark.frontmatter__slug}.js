// With thanks to https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/

import React from "react"
import { graphql } from "gatsby"
import "../styles/styles.css";
import CatalogToolbar from "../components/toolbar";
import Link from "@material-ui/core/Link";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import claire from "../images/claire.jpg";
import kayla from "../images/kayla.png";


export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <div>
      <CatalogToolbar showTitle={true}/>
      <div style={{margin: "auto", maxWidth: "1200px", marginTop: "50px", padding: "0px 20px"}}>
        <h1 style={{marginBottom: "40px"}}>{frontmatter.title}</h1>
        <Typography component={"div"}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <h3 style={{fontWeight: "bold", marginTop: "40px"}}>
          <Link href={"/"} rel={"noopener"} target={"_blank"}>Return to the Catalog</Link>
        </h3>
        {frontmatter.title === "AI Education Catalog Team" &&
          <div>
            <TableContainer component={Paper} style={{marginBottom: "50px"}}>
              <Table aria-label="simple table" size={"small"} style={{marginBottom: 0}}>
                <TableBody>
                  <TableRow style={{verticalAlign: "middle"}}>
                    <TableCell><img src={claire} style={{margin: "5px 0px 0px 10px", borderRadius: "10px", maxWidth: "200px"}}/></TableCell>
                    <TableCell><span style={{fontWeight: "bold"}}>Claire Perkins</span> was a Semester Research Analyst at Georgetown’s Center for Security and Emerging Technology (CSET), where she researched STEM education and Chinese innovation. She is currently earning a B.S. in Psychology with a certificate in Applied Statistical Modeling at The University of Texas at Austin. In addition to her work at CSET, Claire conducts research at a child development and cognition lab. She is also the co-founder of Epiphany, a non-profit student volunteer organization that uses art to bridge generational gaps and foster meaningful connections.</TableCell>
                  </TableRow>
                  <TableRow style={{verticalAlign: "middle"}}>
                    <TableCell><img src={kayla} style={{margin: "5px 0px 0px 10px", borderRadius: "10px", maxWidth: "200px"}}/></TableCell>
                    <TableCell><span style={{fontWeight: "bold"}}>Kayla Goode</span> is a Research Analyst at Georgetown’s Center for Security and Emerging Technology (CSET), where she works on the CyberAI Project. Previously, she worked as a consultant building data visualizations for the Department of Commerce and Department of Homeland Security. She completed her M.A. in Security Studies from Georgetown University and received her B.A. in Peace and Conflict Studies from Colgate University.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        }
      </div>
    </div>
  )
}
export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`