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

    const programTypeColors = {
      "Afterschool Program": "rgba(122, 196, 165",
      "Apprenticeship": "rgba(60, 135, 134",
      "Challenge": "rgba(21, 175, 208",
      "Conference": "rgba(181, 58, 109",
      "Curriculum": "rgba(124, 51, 111",
      "Fellowship": "rgba(131, 157, 197",
      "Hackathon": "rgba(241, 127, 76",
      "Internship": "rgba(229, 191, 33",
      "Robotics": "rgba(180, 32, 37",
      "Scholarship": "rgba(255, 105, 180",
      "Summer Camp": "rgba(11, 31, 65",
      "Summer Program": "rgba(0, 160, 0",
    };

    return (
      <Card elevation={2} style={{margin: "20px", width: simplify ? "auto" : "520px",
          display: "inline-block", textAlign: "left", verticalAlign: "top",
          borderRadius: 0,
          backgroundColor: programTypeColors[program.type]+",0.05)"}}>
        <ProgramCardHeader program={program} color={programTypeColors[program.type]}/>
        <div style={{height: (expand || simplify) ? "auto" : "280px"}}>
          {!(expand || simplify) &&
            <ProgramCardSidebar program={program} color={programTypeColors[program.type]}/>
          }
          <div style={{padding: "12px 20px 10px 20px", marginTop: "10px", width: (expand || simplify)? "auto": "380px", display: "inline-block",
          verticalAlign: "top", height: "100%"}}>
            {program.objective !== null && ((expand || simplify) ?
              <Typography variant={"body2"} style={{marginBottom: "20px", color: "black", fontSize: "85%"}}>
                {program.objective} {program.objective.length !== program.short_objective.length}
              </Typography> :
              <Typography variant={"body2"} style={{marginBottom: "20px", color: "black", fontSize: "85%"}}>
                {program.short_objective} {program.objective.length !== program.short_objective.length}
              </Typography>)
            }
          </div>
          {(expand || simplify) && <ProgramMetadataTable program={program} color={programTypeColors[program.type]}/>}
        </div>
        {!simplify &&
        <CardActionArea style={{
          backgroundColor: programTypeColors[program.type] + ",1)", color: "white",
          padding: "0px 20px", height: "40px", textAlign: "center"
        }} onClick={() => setExpand(!expand)}>
          <Typography variant={"body2"} style={{fontWeight: "bold"}}>
            {expand ? "Hide " + program.type + " Details" : "Show " + program.type + " Details"}
          </Typography>
        </CardActionArea>
        }
      </Card>
    )
};

export default ProgramCard;