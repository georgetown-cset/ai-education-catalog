import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import "../styles/styles.css";
import after_school_program from "../images/After School Program.svg";
import apprenticeship from "../images/Apprenticeship.svg";
import challenge from "../images/Challenge.svg";
import conference from "../images/Conference.svg";
import curriculum from "../images/Curriculum.svg";
import fellowship from "../images/Fellowship.svg";
import hackathon from "../images/Hackathon.svg";
import internship from "../images/Internship.svg";
import robotics from "../images/Robotics.svg";
import scholarship from "../images/Scholarship.svg";
import summer_camp from "../images/Summer Camp.svg";

const ProgramCardHeader = (props) => {
  const {program, color} = props;
  const [hover, setHover] = React.useState(false);

  const program_name_to_img = {
    "Afterschool Program": after_school_program,
    "Apprenticeship": apprenticeship,
    "Challenge": challenge,
    "Conference": conference,
    "Curriculum": curriculum,
    "Fellowship": fellowship,
    "Hackathon": hackathon,
    "Internship": internship,
    "Robotics": robotics,
    "Scholarship": scholarship,
    "Summer Camp": summer_camp
  };

  function click(url){
    if(url){
      window.open(url,"_blank","noopener");
    }
  }

  return (
    <div>
        <CardActionArea style={{backgroundColor: color, color: "white",
          padding: "0px 20px", height: "90px"}} onMouseEnter={()=> setHover(true)}
          onMouseLeave={() => setHover(false)} onClick={() => click(program.url)}
        >
          <Typography variant={"h6"} style={{fontSize: "100%"}}>
            <span style={{color: "white", textDecoration: (hover ? "underline": "")}}>{program.name}</span>
          </Typography>
          <Typography variant={"body2"} style={{fontSize: "75%", marginTop: "5px"}}>
            <img src={program_name_to_img[program.type]} alt={program.type} style={{height: "15px", marginRight: "7px"}}/> {program.type}
          </Typography>
        </CardActionArea>
    </div>
  )
};

export default ProgramCardHeader;