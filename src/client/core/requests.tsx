import React, {SetStateAction, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "./components/custom-toolbar-select";
import InputLabel from '@material-ui/core/InputLabel';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import server from '../utils/server';

const { serverFunctions } = server;

function RequestList() {

  const [stp, setStp] = useState("replace");
  const [data,setData] = useState([])
  const [columns,setColumn] = useState([])
  const [isLoading,setLoading] = useState(true)

  useEffect(() => {
    if(isLoading)
    serverFunctions.getRequestData()
    .then( result=> {
      setColumn(result[0])
      setData(result.splice(1))
    setLoading(false)})
  })





  const options = {
    filter: true,
    selectableRows: 'multiple',
    filterType: "dropdown",
    responsive: "vertical",
    rowsPerPage: 10,
    selectToolbarPlacement: stp,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
    ),
  };

  return (
      <MUIDataTable title={"Request list"} data={data} columns={columns} options={options} />

  );
}

export default RequestList;