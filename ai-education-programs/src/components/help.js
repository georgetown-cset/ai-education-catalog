import React from "react";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";


const HelpModal = (props) => {
  const {description, title, content} = props;
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{display: "inline-block", verticalAlign: "bottom", marginBottom: "10px"}}>
      <Dialog open={open} onClose={()=>setOpen(false)}
              aria-labelledby={"Help"} aria-describedby={title}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent style={{paddingBottom: "20px"}}>
          {content}
        </DialogContent>
      </Dialog>
      <Button color="secondary" variant={"outlined"} size="small"
              style={{minWidth: "15px"}} onClick={()=>setOpen(!open)}>
        Help!
      </Button>
    </div>
  );
};

export default HelpModal;