import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import "../styles/styles.css";
import Link from "@material-ui/core/Link";

const ProgramCardHeader = (props) => {
  const {program, color} = props;
  const [hover, setHover] = React.useState(false);

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

  function click(url){
    if(url){
      window.open(url,"_blank","noopener");
    }
  }

  return (
    <div>
        <CardActionArea style={{backgroundColor: color+",1)", color: "white",
          padding: "0px 20px", height: "80px"}} onMouseEnter={()=> setHover(true)}
          onMouseLeave={() => setHover(false)} onClick={() => click(program.url)}
        >
          <Typography variant={"h6"} style={{fontSize: "110%"}}>
            {programEmoji[program.type]}&nbsp;&nbsp;
              <span style={{color: "white", textDecoration: (hover ? "underline": "")}}>{program.name}</span>
          </Typography>
        </CardActionArea>
    </div>
  )
};

export default ProgramCardHeader;