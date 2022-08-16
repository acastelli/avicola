import { Column } from "@material-table/core";
import { Formula } from "utils/formula";

export const columnsFormula: Array<Column<Formula>> = [
  { title: "NOMBRE", field: "name" },
  {
    title: "COSTO",
    field: "cost",
    type: "currency",
    align: "left",
  },
];

export const options = {
  paging: true,
  pageSize: 5,
  emptyRowsWhenPaging: false,
  pageSizeOptions: [5, 10, 20],
  actionsColumnIndex: -1,
  headerStyle: {
    backgroundColor: "#c6a965",
    opacity: 0.75,
  },
  searchFieldStyle: {
    paddingLeft: "1rem",
    margin: "1rem",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    fontSize: "1.5rem",
  },
};
