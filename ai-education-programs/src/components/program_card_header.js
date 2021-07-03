import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import "../styles/styles.css";
import Link from "@material-ui/core/Link";

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
        <CardActionArea style={{backgroundColor: color+",1)", padding: "7px 5px", color: "white",
          paddingLeft: "20px", height: "100%"}}>
          <Typography variant={"h6"} style={{fontSize: "110%"}}>
            {programEmoji[program.type]}&nbsp;&nbsp;{program.url ?
              <Link rel={"noreferrer"} target={"_blank"} href={program.url} style={{color: "white"}}>{program.name}</Link>
              :
              <span>{program.name}</span>
            }
          </Typography>
        </CardActionArea>
    </div>
  )
};

export default ProgramCardHeader;