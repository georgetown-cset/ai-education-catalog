import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import LaunchIcon from '@material-ui/icons/Launch';

const ProgramMetadataTable = (props) => {
  const {program, color, borderColor} = props;

  return (
    <TableContainer component={Paper} style={{borderRadius: 0}}>
      <Table aria-label="simple table" size={"small"}
             style={{marginBottom: 0, backgroundColor: color, color: "white"}}>
        <TableBody>
          {program.location.length > 0 &&
          <MetadataRow borderColor={borderColor} label={"Location"}
                       value={(program.location_details !== null ?
                         program.location_details+", " : "")+program.location.join(", ")}/>
          }
          <MetadataRow borderColor={borderColor} label={"Participant Level"}
                       value={program.level !== null ? program.level : program.target.join(", ")}/>
          {program.gender.length > 0 &&
          <MetadataRow borderColor={borderColor} label={"Gender"} value={program.gender.join(", ")}/>
          }
          {program.race_ethnicity.length > 0 &&
          <MetadataRow borderColor={borderColor} label={"Race/Ethnicity"} value={program.race_ethnicity.join(", ")}/>
          }
          {program.pre_reqs.length > 0 &&
          <MetadataRow borderColor={borderColor} label={"Pre-requisites"} value={program.pre_reqs.join(", ")}/>
          }
          <MetadataRow borderColor={borderColor} label={"Cost"} value={program.cost}/>
          {program.organization &&
          <MetadataRow borderColor={borderColor} label={"Organization"} value={program.organization}/>
          }
          {program.duration &&
          <MetadataRow borderColor={borderColor} label={"Duration"} value={program.duration}/>
          }
          <TableRow>
            <TableCell style={{borderColor: borderColor}}></TableCell>
            <TableCell component="th" scope="row" style={{paddingLeft: "10px", fontWeight: "bold",
              textAlign: "right", borderColor: borderColor}}>
              <Link href={program.url} rel={"noopener"} target={"_blank"}
                    style={{color: "white"}}>
                Visit Website <LaunchIcon style={{fontSize: "100%", verticalAlign: "middle"}}/>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MetadataRow = (props) => {
  const {borderColor, label, value} = props;

  return (
    <TableRow>
      <TableCell component="th" scope="row" style={{paddingLeft: "15px", width: "175px",
        fontWeight: "bold", color: "white", borderColor: borderColor}}>{label}</TableCell>
      <TableCell align="left" style={{color: "white", borderColor: borderColor}}>
        {value}
      </TableCell>
    </TableRow>
  );
};

export default ProgramMetadataTable;