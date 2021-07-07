import React, { SetStateAction, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "./components/custom-toolbar-select";

import Loading from "./components/loading"
import server from '../utils/server';
import { prettyPrint } from './util'
import { observer } from "mobx-react-lite"
import { RequestStore } from "./repository/request";


const { serverFunctions } = server;

type ComponentProps ={
  store: RequestStore,
  history: any,
  location: any,
  match: any,
  staticContext: any
}
const RequestList  = observer((props:React.PropsWithChildren<ComponentProps>) => {
  const {store, ...config} = props
  const [stp, setStp] = useState("replace");
  const options = {
    filter: true,
    selectableRows: 'multiple',
    filterType: "dropdown",
    responsive: "simple",
    rowsPerPage: 10,
    selectToolbarPlacement: stp,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} store = {store}  />
    ),
  };
 
  return <MUIDataTable title={"Request list"} columns={store.header} data={store.rows} options={options} />
  
});


export default RequestList;