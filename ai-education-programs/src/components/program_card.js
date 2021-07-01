import React from "react";
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ProgramCardHeader from "./program_card_header";
import "../styles/styles.css";

const ProgramCard = (props) => {
    const {program} = props;
    const [showLongSummary, setShowLongSummary] = React.useState(false);

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

    const get_pretty_list = function(ary){
      if(ary === null || ary.length === 0){
        return null;
      } else if(ary.length === 1){
        return ary[0].toLowerCase();
      } else if(ary.length === 2){
        return (ary[0]+" and "+ary[1]).toLowerCase();
      } else{
        return (ary.slice(0, ary.length -1).join(", ")+" and "+ary[ary.length -1]).toLowerCase();
      }
    };

    return (
      <Card elevation={2} style={{margin: "20px", width: "480px",
        display: "inline-block", textAlign: "left",
        minHeight: "320px", backgroundColor: programTypeColors[program.type]+",0.05)"}}>
        <ProgramCardHeader program={program} color={programTypeColors[program.type]}/>
        <div style={{padding: "10px 20px 20px 20px", marginTop: "10px"}}>
          <div style={{marginBottom: "20px"}}>
            <Typography variant={"h6"} style={{fontSize: "100%", fontWeight: "bold"}}>
              {program.url ?
                <Link rel={"noreferrer"} target={"_blank"} href={program.url}
                      style={{color: programTypeColors[program.type] + ",1)"}}>{program.name}</Link>
                :
                <span>{program.name}</span>
              }
            </Typography>
          </div>
          {program.objective !== null && (showLongSummary ?
            <Typography variant={"body2"} style={{marginBottom: "20px", color: "black", fontSize: "85%"}}>
              {program.objective} {program.objective.length !== program.short_objective.length && <Link style={{cursor: "pointer", color: programTypeColors[program.type]+",1)"}} onClick={() => setShowLongSummary(false)}>Show less...</Link>}
            </Typography> :
            <Typography variant={"body2"} style={{marginBottom: "20px", color: "black", fontSize: "85%"}}>
              {program.short_objective} {program.objective.length !== program.short_objective.length && <Link style={{cursor: "pointer", color: programTypeColors[program.type]+",1)"}} onClick={() => setShowLongSummary(true)}>Show more...</Link>}
            </Typography>)
          }
          <Typography variant={"body2"} style={{marginBottom: "20px", color: "#636363", fontWeight: "bold", fontSize: "75%"}}>
            This program is targeted to {program.underrep !== null && program.underrep.length > 0 && get_pretty_list(program.underrep)+" "}{program.level ? program.level : get_pretty_list(program.target)}{program.pre_reqs !== null && program.pre_reqs.length > 0 && " who have the following pre-requisites: " + get_pretty_list(program.pre_reqs)}.
          </Typography>
        </div>
      </Card>
    )
};

export default ProgramCard;