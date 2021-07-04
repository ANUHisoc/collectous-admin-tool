import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ApproveIcon from '@material-ui/icons/CheckCircle';
import server from '../../utils/server';
import { makeStyles } from "@material-ui/core";
import RejectIcon from '@material-ui/icons/Cancel';


const { serverFunctions } = server;

const useStyles = makeStyles({
  iconContainer: {
    marginRight: "24px",
  },
})


function CustomToolbarSelect(props){

  var classes = useStyles();

  var handleRejectRequests = () => {
    console.log(props.displayData)
    var first = props.displayData[0].data[0]
    serverFunctions.acceptRequests([first])
  };

  var handleAcceptRequests = () => {
    var first = props.displayData[0].data[0]
    serverFunctions.acceptRequests([first])
  };


    return (
      <div className={classes.iconContainer}>
        <Tooltip title={"Reject"}>
          <IconButton onClick={handleRejectRequests}>
            <RejectIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Approve"}>
          <IconButton onClick={handleAcceptRequests}>
            <ApproveIcon />
          </IconButton>
        </Tooltip>

      </div>
    );
  
}

export default CustomToolbarSelect;