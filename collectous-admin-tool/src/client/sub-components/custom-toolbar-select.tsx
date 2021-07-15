import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ApproveIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from "@material-ui/core";
import RejectIcon from '@material-ui/icons/Cancel';
import { Column, SCHEMA } from "../../common/schema";
import { useSnackbar } from "notistack";



const useStyles = makeStyles({
  iconContainer: {
    marginRight: "24px",
  },
})

function CustomToolbarSelect(props) {

  var classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
    //console.log(getSelectedGmailAddress())
    props.setSelectedRows([]);
    handleRequests()
    props.model.reject(getSelectedGmailAddress())
  };

  function handleRequests(){
    props.setSelectedRows([]);
    enqueueSnackbar("Processing changes in the backend.", { 
      variant: 'info',
  })
  }

  var handleAcceptRequests = () => {
    //console.log(props.model)
    handleRequests()
    props.model.accept(getSelectedGmailAddress())
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