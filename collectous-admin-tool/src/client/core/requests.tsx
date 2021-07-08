import React, { SetStateAction, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "./components/custom-toolbar-select";

import Loading from "./components/loading"
import { observer } from "mobx-react-lite"
import { RequestStore } from "./repository/request";



type ComponentProps = {
  store: RequestStore,
  history: any,
  location: any,
  match: any,
  staticContext: any
}

const RequestList = observer((props: React.PropsWithChildren<ComponentProps>) => {
  const { store, ...config } = props
  const [stp, setStp] = useState("replace");

  const options = {
    filter: false,
    selectableRows: 'multiple',
    filterType: "dropdown",
    responsive: "simple",
    rowsPerPage: 10,
    print: false,
    selectToolbarPlacement: stp,
    onRowSelectionChange: ({}, allRowsSelected: [], {}) => {
      store.updateIsOptionsSelected(allRowsSelected)
      },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} store={store} />
    ),
  };

  var dataTable = <MUIDataTable title={"Request list"} data={store.rows} columns={store.header} options={options} />
  return store.isLoading ? <Loading /> : dataTable

});

export default RequestList;