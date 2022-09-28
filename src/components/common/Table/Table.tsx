import { useState } from "react";
import { useTheme } from "@material-ui/core";
import MaterialTable, { Column } from "material-table";
import { AddCircleOutline } from "@material-ui/icons";
import { Dispatchable } from "utils/helpers";
import { useIngredientes } from "hooks/useIngredientes";
import AddStock from "pages/AddStock/AddStock";
import { StyledTableContainer } from "components/Layout/LayoutStyles";
import { Popup } from "../Popup/Popup";
import { Ingrediente } from "../../../utils/ingrediente";
import { tableIcons } from "./TableIcons";
import { localization, options } from "./TableSettings";
import { StyledButton, StyledCircularProgress } from "./TableStyles";

interface TableProps {
  setAlert: Dispatchable<string | undefined>;
  setUpdateIngrediente: Dispatchable<boolean>;
}

const columnsIng: Array<Column<Ingrediente>> = [
  { title: "NOMBRE", field: "name", editable: "never" },
  {
    title: "CANTIDAD",
    field: "quantity",
    type: "numeric",
    align: "left",
    editable: "onUpdate",
    render: (rowData) => Math.round(rowData.quantity),
  },
  {
    title: "CANTIDAD MINIMA",
    field: "minQuantity",
    type: "numeric",
    align: "left",
    editable: "onUpdate",
  },
  {
    title: "PRECIO",
    field: "cost",
    type: "numeric",
    align: "left",
    editable: "onUpdate",
  },
  {
    title: "MONEDA",
    field: "currency",
    lookup: { USD: "USD", PESOS_URUGUAYOS: "$" },
    align: "left",
    editable: "onUpdate",
  },
];

export const Table = ({ setAlert, setUpdateIngrediente }: TableProps) => {
  const {
    ingredientesLoader,
    deleteIngrediente,
    updateIngrediente,
    data,
    setData,
  } = useIngredientes();
  const theme = useTheme();
  const [columns] = useState(columnsIng);
  const [selectedingrediente, setSelectedingrediente] = useState<Ingrediente>();
  const [open, setOpen] = useState(false);

  const closePopup = () => {
    setOpen(false);
  };

  const addStock = (ingrediente: Ingrediente) => {
    setSelectedingrediente(ingrediente);
    setOpen(true);
  };

  const handleRowUpdate = (
    newData: Ingrediente,
    oldData: Ingrediente | undefined
  ) => {
    return new Promise((resolve, reject) => {
      const dataUpdate = [...data];
      if (oldData) {
        const index = dataUpdate.findIndex((obj) => obj.id === oldData.id);
        dataUpdate[index] = newData;
        setData(dataUpdate);
        updateIngrediente(newData, {
          success: () => {
            resolve(() => {
              setUpdateIngrediente(true);
            });
          },
          error: (msg) =>
            msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
        });
      }
    });
  };

  const handleRowDelete = (oldData: Ingrediente) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataDelete = [...data];
        const index = dataDelete.findIndex((obj) => obj.id === oldData.id);
        deleteIngrediente(oldData.id, {
          success: () => {
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
            resolve(() => {
              setUpdateIngrediente(true);
            });
          },
          error: (msg) =>
            resolve(
              msg ? setAlert(msg as string) : setAlert("Ocurrio un error")
            ),
        });
      }, 1000);
    });
  };

  return (
    <>
      {selectedingrediente && (
        <Popup open={open} handleClose={closePopup}>
          <AddStock
            ingrediente={selectedingrediente}
            handleClose={closePopup}
          />
        </Popup>
      )}
      <StyledTableContainer>
        {ingredientesLoader && <StyledCircularProgress />}
        {!ingredientesLoader && data && (
          <MaterialTable
            columns={columns}
            data={data}
            localization={localization}
            editable={{
              onRowUpdate: (newData, oldData) =>
                handleRowUpdate(newData, oldData),
              onRowDelete: (oldData) => handleRowDelete(oldData),
            }}
            actions={[
              {
                icon: () => (
                  <StyledButton
                    disableFocusRipple={true}
                    disableTouchRipple={true}
                    disableRipple={true}
                    backcolor={theme.palette.buttonColor.main}
                    hovercolor={theme.palette.buttonColor.secondary}
                    startIcon={<AddCircleOutline />}
                  >
                    Stock
                  </StyledButton>
                ),
                tooltip: "Agregar Stock ingrediente",

                iconProps: {
                  title: "Stock",
                },
                onClick: (event, rowData) => addStock(rowData as Ingrediente),
              },
            ]}
            icons={tableIcons}
            options={options}
            title=""
          />
        )}
      </StyledTableContainer>
    </>
  );
};
