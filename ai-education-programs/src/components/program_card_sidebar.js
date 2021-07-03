import React from "react";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoneyOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import Typography from "@material-ui/core/Typography";

const ProgramCardSidebar = (props) => {
  const {program, color} = props;

  return (
    <div style={{backgroundColor: color+",0.75)", width: "140px", padding: "15px 10px", color: "white",
      display: "inline-block", height: "100%"}}>
      <div>
        {program.location.length > 0 &&
        <SidebarElement label={"Location"} Icon={LocationOnIcon}
                        value={program.location.length > 1 ? "Multiple" :
                                ((program.location_details === null || program.location_details === undefined) ?
                                  program.location[0] : program.location_details+" (" + program.location[0] + ")")}/>
        }
        {program.target.length > 0 &&
        <SidebarElement label={"Target Audience"} Icon={PeopleIcon}
                        value={program.target.length > 1 ? "Multiple" : program.target[0]}/>
        }
        <SidebarElement label={"Cost"} Icon={MoneyOnIcon} value={program.cost}/>
      </div>
    </div>
  );
};

const SidebarElement = (props) => {
  const {label, value, Icon} = props;

  return (
    <div style={{marginBottom: "25px"}}>
      <Typography variant={"body2"} style={{fontSize: "60%", marginBottom: "5px"}}>
        <Icon style={{fontSize: "120%", verticalAlign: "top"}}/> {label}</Typography>
      <Typography variant={"body2"} style={{fontWeight: 600, fontSize: "75%", marginLeft: "5px"}}>
        {value}
      </Typography>
    </div>
  );
};

export default ProgramCardSidebar;