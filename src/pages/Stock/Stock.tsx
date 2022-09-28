import { useEffect, useState } from "react";
import { Grid, useTheme } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useFormula } from "hooks/useFormula";
import { useStock } from "hooks/useStock";
import { useResolution } from "hooks/useResolution";
import RightComponent from "./RightComponent";
import {
  AlertGrid,
  StyledDivider,
  StyledGrid,
  StyledGridLeft,
  StyledSpan,
  StyledTitle,
} from "./StockStyles";
import StockTable, { EditRow } from "./StockTable";

const Stock = () => {
  const { isXs, h1 } = useResolution();
  const theme = useTheme();
  const { portionsFormulas, getPortionsFormulas } = useFormula();
  const { editPortionFormula, getDolar, dolar } = useStock();

  const [alert, setAlert] = useState<string | undefined>();
  const [editEnable, setEditEnable] = useState<EditRow | undefined>();
  const [portionEdit, setPortionEdit] = useState<number[]>([]);
  const [changePortions, setChangePortions] = useState(true);

  const editPortion = (idForm: string) => {
    if (portionEdit[Number(idForm)]) {
      editPortionFormula(Number(idForm), portionEdit[Number(idForm)], {
        success: () => setChangePortions(true),
        error: (msg) =>
          msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
      });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    idFormula: string,
    oldValue: number
  ) => {
    portionEdit[Number(idFormula)] = Number(event.target.value) - oldValue;
    setPortionEdit(portionEdit);
  };

  useEffect(() => {
    getPortionsFormulas({
      error: (msg) =>
        msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
    });
    setChangePortions(false);
    if (!dolar)
      getDolar({
        error: (msg) =>
          msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
      });
  }, [dolar, getDolar, getPortionsFormulas, changePortions, setChangePortions]);

  return (
    <>
      <StyledGrid
        item
        xs={12}
        container
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <StyledGridLeft
          item
          container
          xs={12}
          md={9}
          xl={10}
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
            <StyledTitle
              variant={h1}
              color="textPrimary"
              ismobile={String(isXs)}
            >
              STOCK
            </StyledTitle>
          </Grid>
          {isXs && <RightComponent dolar={dolar || 0} />}
          <Grid item xs={12}>
            <StyledSpan>Hoy</StyledSpan>
            <StyledDivider backcolor={theme.palette.primary.main} />
          </Grid>

          <Grid item xs={12}>
            <StockTable
              portionsFormulas={portionsFormulas}
              editEnable={editEnable}
              setEditEnable={setEditEnable}
              handleChange={handleChange}
              editPortion={editPortion}
            />
          </Grid>
        </StyledGridLeft>
        {!isXs && <RightComponent dolar={dolar || 0} />}
      </StyledGrid>
    </>
  );
};
export default Stock;
