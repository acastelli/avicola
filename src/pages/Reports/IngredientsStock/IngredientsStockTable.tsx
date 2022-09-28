import { Table, TableBody, TableRow } from "@material-ui/core";
import { useResolution } from "hooks/useResolution";
import { Ingrediente } from "utils/ingrediente";
import { StyledTableCell } from "./IngredientsStockStyles";

interface IngredientsStockTableProps {
  ingredients: Ingrediente[];
}

const IngredientsStockTable = ({ ingredients }: IngredientsStockTableProps) => {
  const { isXs } = useResolution();
  return (
    <>
      <Table>
        <TableBody>
          {ingredients
            .sort((a) => (a.quantity > 1000 ? 1 : -1))
            .map((row) => (
              <TableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                  <div
                    style={{
                      width: `${
                        row.quantity > row.minQuantity ? "100%" : "10%"
                      }`,
                      backgroundColor: `${
                        row.quantity > row.minQuantity ? "green" : "red"
                      }`,
                      height: "1rem",
                      borderRadius: "1rem",
                    }}
                  ></div>
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  align={isXs ? "center" : "right"}
                >
                  {Math.round(row.quantity)} kilos
                </StyledTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default IngredientsStockTable;
