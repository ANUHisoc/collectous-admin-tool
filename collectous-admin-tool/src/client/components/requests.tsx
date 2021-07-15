import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "../sub-components/custom-toolbar-select";

import Loading from "../sub-components/loading"
import { observer } from "mobx-react-lite"
import { RequestModel } from "../model/requests";
import { hideDataTableColumn } from "./util";



type ComponentProps = {
  model: RequestModel,
  history: any,
  location: any,
  match: any,
  staticContext: any
}

const RequestList = observer((props: React.PropsWithChildren<ComponentProps>) => {
  var { model, ...config } = props
  var [stp, setStp] = useState("replace");

  var options = {
    filter: false,
    selectableRows: 'multiple',
    filterType: "dropdown",
    responsive: "simple",
    rowsPerPage: 10,
    print: false,
    selectToolbarPlacement: stp,
    onRowSelectionChange: ({ }, allRowsSelected: [], { }) => {
      model.updateIsOptionsSelected(allRowsSelected)
    },

    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows}
        displayData={displayData}
        setSelectedRows={setSelectedRows}
        model={model} />
    ),
  };



  var dataTable = <MUIDataTable title={"Request list"}
    data={model.rows}
    columns={hideDataTableColumn(model.header.slice(), "folder_id")}
    options={options} />
  return model.isLoading ? <Loading /> : dataTable

});

export default RequestList;