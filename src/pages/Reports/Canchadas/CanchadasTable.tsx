import { Table, TableBody, TableRow } from "@material-ui/core";
import { useResolution } from "hooks/useResolution";
import { PortionFormula } from "utils/formula";
import { StyledTableCell } from "./CanchadaStyles";

interface CanchadasTableProps {
  portionsFormulas: PortionFormula[];
}

const CanchadasTable = ({ portionsFormulas }: CanchadasTableProps) => {
  const { isXs } = useResolution();
  return (
    <>
      <Table>
        <TableBody>
          {portionsFormulas.map((row) => (
            <TableRow key={row.formula.id}>
              <StyledTableCell component="th" scope="row">
                {row.formula.name}
              </StyledTableCell>
              <StyledTableCell
                component="th"
                scope="row"
                align={isXs ? "center" : "right"}
              >
                {row.quantity} canchadas
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CanchadasTable;
