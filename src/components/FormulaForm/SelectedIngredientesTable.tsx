import MaterialTable from "@material-table/core";
import { localization } from "components/common/Table/TableSettings";
import { useEffect, useState } from "react";
import { Dispatchable } from "utils/helpers";
import { ShowIngrediente } from "./FormulaForm";
import { options } from "./SelectIngredientesTableOptions";

interface SelectedIngredientesTableProps {
  selectedIngredientes: ShowIngrediente[] | undefined;
  setSelectedIngredientes: Dispatchable<ShowIngrediente[] | undefined>;
}

export const SelectedIngredientesTable = ({
  selectedIngredientes,
  setSelectedIngredientes,
}: SelectedIngredientesTableProps) => {
  const [data, setData] = useState(selectedIngredientes);

  useEffect(() => {
    setData(selectedIngredientes);
  }, [selectedIngredientes]);

  const handleRowUpdate = (
    newData: ShowIngrediente,
    oldData: ShowIngrediente | undefined,
    data: ShowIngrediente[]
  ) => {
    return new Promise((resolve, reject) => {
      const dataUpdate = [...data];
      if (oldData) {
        const index = dataUpdate.findIndex((obj) => obj.id === oldData.id);
        dataUpdate[index] = newData;
        setData(dataUpdate);
        setSelectedIngredientes([...dataUpdate]);
        resolve(dataUpdate);
      }
    });
  };

  const handleRowDelete = (
    oldData: ShowIngrediente,
    data: ShowIngrediente[]
  ) => {
    return new Promise((resolve, reject) => {
      let dataDelete = [...data];
      const index = oldData.id;
      dataDelete = dataDelete.filter((i) => i.id !== index);
      setData([...dataDelete]);
      setSelectedIngredientes([...dataDelete]);
      resolve(dataDelete);
    });
  };

  return (
    <>
      {data && (
        <MaterialTable
          title=""
          columns={[
            { title: "Nombre", field: "name", editable: "never" },
            { title: "Cantidad", field: "quantity" },
          ]}
          data={data}
          options={options}
          localization={localization}
          editable={{
            onRowUpdate: (newData, oldData) =>
              handleRowUpdate(newData, oldData, data),
            onRowDelete: (oldData) => handleRowDelete(oldData, data),
          }}
        />
      )}
    </>
  );
};
