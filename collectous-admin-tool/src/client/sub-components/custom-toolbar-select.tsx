import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ApproveIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from "@material-ui/core";
import RejectIcon from '@material-ui/icons/Cancel';



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
    console.log(props.model)
    props.model.reject()
    props.setSelectedRows([]);
  };


  var handleAcceptRequests = () => {
    console.log(props.model)
    props.model.accept()
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