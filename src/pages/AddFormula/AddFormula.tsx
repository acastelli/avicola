import { Grid } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "utils/constants";
import FormulaForm, { NewFormula } from "components/FormulaForm/FormulaForm";
import { useResolution } from "hooks/useResolution";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useFormula } from "hooks/useFormula";
import { MainContainerGrid } from "components/Layout/LayoutStyles";
import { StyledTitle } from "./AddFormulaStyles";

type ShowIngrediente = {
  id: string;
  name: string;
  quantity: number;
};

const AddFormula = () => {
  const navigate = useNavigate();
  const { isXs, h1 } = useResolution();
  const [alert, setAlert] = useState<string | undefined>();
  const { getFormulas, formulas, addFormula, editFormula } = useFormula();
  const [formulaName, setFormulaName] = useState<string | undefined>();

  let { id } = useParams();
  let intId = id ? parseInt(id) : 0;

  const [selectedIngredientes, setSelectedIngredientes] = useState<
    ShowIngrediente[] | undefined
  >([]);

  useEffect(() => {
    if (id) {
      getFormulas({
        success: () => {
          let newFormula = formulas.find((f) => parseInt(f.id) === intId);
          let mappedProducts = newFormula?.products?.map((p) => {
            return {
              id: p.product.id,
              name: p.product.name,
              quantity: p.product.quantity,
            } as ShowIngrediente;
          });
          setSelectedIngredientes(mappedProducts);
        },
      });
    }
    setFormulaName(formulas.find((f) => parseInt(f.id) === intId)?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = (data: NewFormula) => {
    addFormula(data, {
      success: () => navigate(ROUTES.FORMULAS),
      error: (msg) =>
        msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
    });
  };

  const onSubmitEdit = (data: NewFormula) => {
    data.name = formulaName || "";
    editFormula(data, {
      success: () => navigate(ROUTES.FORMULAS),
      error: (msg) =>
        msg ? setAlert(msg as string) : setAlert("Ocurrio un error"),
    });
  };

  const handleClose = () => {
    navigate(ROUTES.FORMULAS);
  };

  return (
    <>
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
      <MainContainerGrid
        container
        justifyContent="flex-start"
        alignItems="center"
        ismobile={String(isXs)}
      >
        <Grid item xs={12}>
          <StyledTitle variant={h1} color="textPrimary" ismobile={String(isXs)}>
            {id ? "MODIFICAR FORMULA" : "AGREGAR FORMULA"}
          </StyledTitle>
        </Grid>
        <Grid item xs={12}>
          <FormulaForm
            nameForm={formulaName}
            onSubmit={(data) =>
              !formulaName ? onSubmit(data) : onSubmitEdit(data)
            }
            handleClose={handleClose}
            setAlert={setAlert}
            setSelectedIngredientes={setSelectedIngredientes}
            selectedIngredientes={selectedIngredientes}
            formulaName={formulaName}
          />
        </Grid>
      </MainContainerGrid>
    </>
  );
};

export default AddFormula;
