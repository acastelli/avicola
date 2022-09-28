import { useState } from "react";
import MaterialTable from "@material-table/core";
import { TableBody, TableHead, TableRow } from "@material-ui/core";
import { useResolution } from "hooks/useResolution";
import { useFormula } from "hooks/useFormula";
import { Formula } from "utils/formula";
import { tableIcons } from "components/common/Table/TableIcons";
import { StyledTableContainer } from "components/Layout/LayoutStyles";
import {
  StyledCell,
  StyledCircularProgress,
  StyledDiv,
  StyledTable,
} from "./FormulasStyles";
import { columnsFormula, options } from "./FormulasTableSettings";

export const FormulasTable = () => {
  const { formulasLoader, formulas, setFormulas, deleteFormula } = useFormula();
  const [columns] = useState(columnsFormula);
  const { isXs } = useResolution();

  return (
    <>
      <StyledTableContainer>
        {formulasLoader ? (
          <StyledCircularProgress />
        ) : (
          <MaterialTable
            columns={columns}
            data={formulas}
            localization={{
              toolbar: {
                searchPlaceholder: "Buscar",
                searchTooltip: "Buscar",
              },
              header: {
                actions: "",
              },
            }}
            editable={{
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...formulas];
                    const index = dataDelete.findIndex(
                      (obj) => obj.id === oldData.id
                    );
                    deleteFormula(oldData.id, {
                      success: () => {
                        dataDelete.splice(index, 1);
                        setFormulas([...dataDelete]);
                        resolve(dataDelete);
                      },
                      error: () => {
                        alert(
                          "La formula no se puede borrar por que tiene canchadas utilizadas."
                        );
                        resolve(dataDelete);
                      },
                    });
                  }, 1000);
                }),
            }}
            detailPanel={({ rowData }: { rowData: Formula }) => {
              return (
                <StyledDiv>
                  {rowData.products.length === 0 ? (
                    <span>La formula no tiene ingredientes asociados</span>
                  ) : (
                    <StyledTable ismobile={String(isXs)}>
                      <TableHead>
                        <TableRow>
                          <StyledCell align="center">Ingrediente</StyledCell>
                          <StyledCell align="center">Cantidad (K)</StyledCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowData.products.map((row) => (
                          <TableRow key={row.product.id}>
                            <StyledCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {row.product.name}
                            </StyledCell>
                            <StyledCell align="center">
                              {row.quantity}
                            </StyledCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </StyledTable>
                  )}
                </StyledDiv>
              );
            }}
            icons={tableIcons}
            options={options}
            title=""
          />
        )}
      </StyledTableContainer>
    </>
  );
};
