import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ApproveIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from "@material-ui/core";
import RejectIcon from '@material-ui/icons/Cancel';
import { Column, SCHEMA } from "../../common/schema";



const useStyles = makeStyles({
  iconContainer: {
    marginRight: "24px",
  },
})

function CustomToolbarSelect(props) {

  var classes = useStyles();


  function getSelectedGmailAddress():string[] {
    var selectedGmailAddresses = [];
    var gmailColumn:Column = "gmail"
    var columnIndex:number = SCHEMA["requests"].columns.indexOf(gmailColumn)
    props.displayData.forEach((row, index) => {
      if (props.selectedRows.data.find(selectedRow => selectedRow.dataIndex === index)) {
        selectedGmailAddresses.push(row.data[columnIndex]);
      }
    })
    return selectedGmailAddresses;
  }


  var handleRejectRequests = () => {
    //console.log(props.model)
    console.log(getSelectedGmailAddress())
    props.setSelectedRows([]);
    props.model.reject(getSelectedGmailAddress())
  };


  var handleAcceptRequests = () => {
    //console.log(props.model)
    //props.model.accept(getSelectedGmailAddress())
    props.setSelectedRows([]);
  };

  return (
    <div className={classes.iconContainer}>

        <IconButton onClick={handleRejectRequests}>
          <RejectIcon />
        </IconButton>

        <IconButton onClick={handleAcceptRequests}>
          <ApproveIcon />
        </IconButton>

    </div>
  );

}



export default CustomToolbarSelect;