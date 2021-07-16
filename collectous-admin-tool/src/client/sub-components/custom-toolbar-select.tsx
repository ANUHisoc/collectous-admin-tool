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
  var notificationKey;
  var classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function getSelectedGmailAddress(): string[] {
    var selectedGmailAddresses = [];
    var gmailColumn: Column = "gmail"
    var columnIndex: number = SCHEMA["requests"].columns.indexOf(gmailColumn)
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
    props.model.rejectRequests(getSelectedGmailAddress())
      .then((isSuccessful: boolean) => {
        showUpdateMessage(isSuccessful)
      })
      .catch(error=> console.log(error))
  };

  function showUpdateMessage(isSuccessful: boolean) {
    closeSnackbar(notificationKey)
    if (isSuccessful) {
      enqueueSnackbar("Successfuly updated the backend.", { variant: 'success',
      autoHideDuration: 2000, })
    }
    else {
      enqueueSnackbar("Something wrong happened.", { variant: 'error',
      autoHideDuration: 2000,  })
    }
  }

  function handleRequests() {
    props.setSelectedRows([]);
   notificationKey =  enqueueSnackbar("Processing changes in the backend.", {
      variant: 'info',
      persist: true,
    })
  }

  var handleAcceptRequests = () => {
    //console.log(props.model)
    handleRequests()
    props.model.acceptRequests(getSelectedGmailAddress())
      .then((isSuccessful: boolean) => {
        showUpdateMessage(isSuccessful)
      })
      .catch(error=> console.log(error))
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