import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ApproveIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from "@material-ui/core";
import RejectIcon from '@material-ui/icons/Cancel';
import { RequestStore } from "../repository/request";



const useStyles = makeStyles({
  iconContainer: {
    marginRight: "24px",
  },
})


function CustomToolbarSelect(props) {

  var classes = useStyles();

  function getSelectedGmailAddress() {
    var selectedGmailAddresses = [];
    props.displayData.forEach((row, index) => {
      if (props.selectedRows.data.find(selectedRow => selectedRow.dataIndex === index)) {
        selectedGmailAddresses.push(row.data[0]);
      }
    })
    return selectedGmailAddresses;
  }

  var handleRejectRequests = () => {
    console.log(props.store)
    props.store.reject()
    props.setSelectedRows([]);
  };


  var handleAcceptRequests = () => {
    console.log(props.store)
    props.store.accept()
    props.setSelectedRows([]);
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