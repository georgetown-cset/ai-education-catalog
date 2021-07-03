import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
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
            {programEmoji[program.type]} {program.type} - {program.cost}
          </Typography>
        </CardActionArea>
    </div>
  )
};

export default ProgramCardHeader;