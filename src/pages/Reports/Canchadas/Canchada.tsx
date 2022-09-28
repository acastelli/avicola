import { useEffect, useState } from "react";
import { Grid, useTheme } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useFormula } from "hooks/useFormula";
import { useResolution } from "hooks/useResolution";
import {
  AlertGrid,
  StyledDivider,
  StyledFilterIcon,
  StyledGrid,
  StyledTitle,
} from "./CanchadaStyles";
import CanchadasTable from "./CanchadasTable";
import { DatePicker } from "@material-ui/pickers";

const Canchada = () => {
  const { isXs, h1 } = useResolution();
  const theme = useTheme();
  const { portionsFormulas, getPortionsFormulas } = useFormula();
  const [alert, setAlert] = useState<string | undefined>();
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    getPortionsFormulas(
      {
        error: (msg) =>
          msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
      },
      selectedDate.toISOString().slice(0, 10)
    );
  }, [getPortionsFormulas, selectedDate]);

  return (
    <>
      <StyledGrid
        item
        xs={12}
        container
        justifyContent="center"
        alignContent="flex-start"
        ismobile={String(isXs)}
      >
        <AlertGrid
          item
          container
          justifyContent="center"
          ismobile={String(isXs)}
        >
          {alert && (
            <Alert
              severity="error"
              onClose={() => {
                setAlert(undefined);
              }}
            >
              <AlertTitle>Error</AlertTitle>
              {alert}
            </Alert>
          )}
        </AlertGrid>

        <Grid item xs={12}>
          <StyledTitle variant={h1} color="textPrimary" ismobile={String(isXs)}>
            CANCHADAS
          </StyledTitle>
        </Grid>
        <Grid container item xs={12} md={7}>
          <StyledFilterIcon fontSize="large" />
          <DatePicker
            value={selectedDate}
            format="d MMMM, yyyy"
            onChange={(e) => handleDateChange(e as Date)}
          />
          <StyledDivider backcolor={theme.palette.primary.main} />
        </Grid>

        <Grid item xs={12} md={7}>
          <CanchadasTable portionsFormulas={portionsFormulas} />
        </Grid>
      </StyledGrid>
    </>
  );
};
export default Canchada;
