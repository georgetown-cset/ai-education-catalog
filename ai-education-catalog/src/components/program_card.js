import React from "react";
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography";
import ProgramCardHeader from "./program_card_header";
import "../styles/styles.css";
import ProgramCardSidebar from "./program_card_sidebar";
import CardActionArea from "@material-ui/core/CardActionArea";
import ProgramMetadataTable from "./program_metadata_table";

const ProgramCard = (props) => {
    const {program, simplify} = props;
    const [expand, setExpand] = React.useState(false);

    const programTypeColorsDark = {
      "After-School Program": "rgba(189, 22, 172)",
      "Apprenticeship": "rgba(0, 124, 122)",
      "Challenge": "rgba(66, 13, 157)",
      "Conference": "rgba(222, 111, 24)",
      "Curriculum": "rgba(214, 160, 0)",
      "Fellowship": "rgba(39, 59, 199)",
      "Hackathon": "rgba(19, 44, 113)",
      "Internship": "rgba(44, 167, 123)",
      "Robotics": "rgba(121, 90, 212)",
      "Scholarship": "rgba(57, 57, 57)",
      "Summer Camp": "rgba(255, 55, 148)",
      "Summer Program": "rgba(0, 160, 0)",
    };

    const programTypeColorsLight = {
      "After-School Program": "rgba(200, 59, 186)",
      "Apprenticeship": "rgba(0, 174, 171)",
      "Challenge": "rgba(102, 77, 217)",
      "Conference": "rgba(232, 135, 60)",
      "Curriculum": "rgba(237, 188, 39)",
      "Fellowship": "rgba(86, 102, 214)",
      "Hackathon": "rgba(46, 74, 149)",
      "Internship": "rgba(50, 193, 142)",
      "Robotics": "rgba(150, 126, 221)",
      "Scholarship": "rgba(93, 93, 93)",
      "Summer Camp": "rgba(255, 95, 169)",
      "Summer Program": "rgba(0, 160, 0)",
    };

    return (
      <Card elevation={2} style={{margin: "20px", width: simplify ? "auto" : "520px",
          display: "inline-block", textAlign: "left", verticalAlign: "top",
          borderRadius: 0,
          backgroundColor: programTypeColorsDark[program.type].replace(")",", 0.05)")}}>
        <ProgramCardHeader program={program}
                           color={programTypeColorsDark[program.type]}/>
        <div style={{height: (expand || simplify) ? "auto" : "280px"}}>
          {!(expand || simplify) &&
            <ProgramCardSidebar program={program} color={programTypeColorsLight[program.type]}/>
          }
          <div style={{padding: "12px 20px 10px 20px", marginTop: "10px", width: (expand || simplify)? "auto": "380px", display: "inline-block",
          verticalAlign: "top", height: "100%"}}>
            {program.objective !== null && ((expand || simplify) ?
              <Typography variant={"body2"} style={{marginBottom: "20px", color: "black", fontSize: "0.95rem"}}>
                {program.objective} {program.objective.length !== program.short_objective.length}
              </Typography> :
              <Typography variant={"body2"} style={{marginBottom: "20px", color: "black", fontSize: "0.95rem"}}>
                {program.short_objective} {program.objective.length !== program.short_objective.length}
              </Typography>)
            }
          </div>
          {(expand || simplify) && <ProgramMetadataTable program={program}
                                                         color={programTypeColorsLight[program.type]}
                                                         borderColor={programTypeColorsDark[program.type]}/>}
        </div>
        {!simplify &&
        <CardActionArea style={{
          backgroundColor: programTypeColorsDark[program.type], color: "white",
          padding: "0px 20px", height: "40px", textAlign: "center"
        }} onClick={() => setExpand(!expand)}>
          <Typography variant={"body2"} style={{fontWeight: "bold"}}>
            {expand ? "Hide Details" : "Show Details"}
          </Typography>
        </CardActionArea>
        }
      </Card>
    )
};

export default ProgramCard;