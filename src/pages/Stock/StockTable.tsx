import { IconButton, Table, TableBody, TableRow } from "@material-ui/core";
import { Edit, Check, Close } from "@material-ui/icons";
import { useResolution } from "hooks/useResolution";
import { PortionFormula } from "utils/formula";
import { Dispatchable } from "utils/helpers";
import { StyledTableCell, StyledTextField } from "./StockStyles";

export type EditRow = {
  enable: boolean;
  rowID: string;
};

interface StockTableProps {
  portionsFormulas: PortionFormula[];
  editEnable: EditRow | undefined;
  setEditEnable: Dispatchable<any>;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    idFormula: string,
    oldValue: number
  ) => void;
  editPortion: (idForm: string) => void;
}

const StockTable = ({
  portionsFormulas,
  editEnable,
  setEditEnable,
  handleChange,
  editPortion,
}: StockTableProps) => {
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
                {editEnable &&
                editEnable.rowID === row.formula.id &&
                editEnable.enable ? (
                  <>
                    <StyledTextField
                      name={"portions" + row.formula.id}
                      defaultValue={row.quantity}
                      type="number"
                      variant="standard"
                      ismobile={isXs}
                      inputProps={{
                        min: 0,
                        step: 0.5,
                        style: {
                          textAlign: "center",
                          fontSize: "1.6rem",
                          borderBottom: "2px solid #c6a965",
                        },
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, row.formula.id, row.quantity)
                      }
                    />
                  </>
                ) : (
                  <> {row.quantity} canchadas </>
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {editEnable &&
                editEnable.rowID === row.formula.id &&
                editEnable.enable ? (
                  <>
                    <IconButton
                      color="default"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        editPortion(row.formula.id);
                        setEditEnable({
                          enable: false,
                          rowID: row.id,
                        });
                      }}
                    >
                      <Check />
                    </IconButton>
                    <IconButton
                      color="default"
                      aria-label="upload picture"
                      component="span"
                      onClick={() =>
                        setEditEnable({
                          enable: false,
                          rowID: row.formula.id,
                        })
                      }
                    >
                      <Close />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    color="default"
                    aria-label="upload picture"
                    component="span"
                    onClick={() =>
                      setEditEnable({
                        enable: true,
                        rowID: row.formula.id,
                      })
                    }
                  >
                    <Edit />
                  </IconButton>
                )}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default StockTable;
