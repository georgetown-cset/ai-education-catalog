import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import "../styles/styles.css";

const ProgramCardHeader = (props) => {
  const {program, color} = props;

  const programEmoji = {
    "Afterschool Program": "🎒",
    "Apprenticeship": "🛠️",
    "Challenge": "💪",
    "Conference": "🗣️",
    "Curriculum": "✏️",
    "Fellowship": "🎓",
    "Hackathon": "💻",
    "Internship": "📓",
    "Robotics": "🤖",
    "Scholarship": "💸",
    "Summer Camp": "⛺",
    "Summer Program": "☀️",
  };

  return (
    <div>
        <CardActionArea style={{backgroundColor: color+",1)", padding: "7px 5px", color: "white", textAlign: "center"}}>
          <Typography variant={"body2"} style={{fontWeight: "bold"}}>
            {programEmoji[program.type]} {program.type}
          </Typography>
        </CardActionArea>
        <CardActionArea style={{backgroundColor: color+",0.7)", padding: "3px 5px", color: "white", textAlign: "center"}}>
          <div>
            <div style={{display: "inline-block", minWidth: "100px", width: "50%", textAlign: "center", borderRight: "1px solid white"}}>
              <Typography variant={"body2"} style={{fontSize: "80%", fontWeight: "bold"}}>{program.cost}</Typography>
            </div>
            <div style={{display: "inline-block", minWidth: "100px", width: "50%", textAlign: "center"}}>
              <Typography variant={"body2"} style={{fontSize: "80%", fontWeight: "bold"}}><LocationOnIcon style={{fontSize: "120%", verticalAlign: "top"}}/> {program.location.join(", ")}</Typography>
            </div>
          </div>
        </CardActionArea>
    </div>
  )
};

export default ProgramCardHeader;