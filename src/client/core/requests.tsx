import React, { SetStateAction, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "./components/custom-toolbar-select";

import Loading from "./components/loading"
import server from '../utils/server';
import { prettyPrint } from './util'


const { serverFunctions } = server;


function RequestList() {

  const [stp, setStp] = useState("replace");
  const [data, setData] = useState([])
  const [columns, setColumn] = useState([])
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    if (isLoading) {
      serverFunctions.getRequestData()
        .then(result => {
          setColumn(prettyPrint(result[0]))
          setData(result.splice(1))
          setLoading(false)
        })
    }
  },[])



  const options = {
    filter: true,
    selectableRows: 'multiple',
    filterType: "dropdown",
    responsive: "simple",
    rowsPerPage: 10,
    selectToolbarPlacement: stp,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
    ),
  };

  return (
    isLoading ? <Loading /> : <MUIDataTable title={"Request list"} data={data} columns={columns} options={options} />
  );
}

export default RequestList;