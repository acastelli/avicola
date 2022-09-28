import { useNavigate } from "react-router-dom";
import { CardContent, Grid, Typography, useTheme } from "@material-ui/core";
import { ROUTES } from "utils/constants";
import { useResolution } from "hooks/useResolution";
import {
  CardDescription,
  CardTitle,
  DivDolar,
  DivDolarContainer,
  MainGrid,
  StyledCard,
  StyledCardAction,
  StyledLink,
} from "./RightComponentStyles";

interface RightProps {
  dolar: number;
}

const RightComponent = ({ dolar }: RightProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isXs, h3, h2 } = useResolution();

  return (
    <>
      {isXs ? (
        <>
          <MainGrid
            item
            xs={12}
            backcolor={theme.palette.primary.main}
            ismobile={String(isXs)}
          >
            <DivDolarContainer ismobile={String(isXs)}>
              <DivDolar>
                <Typography variant={h3}>DOLAR: </Typography>
              </DivDolar>
              <div>
                <Typography variant={h3}>{dolar}</Typography>
              </div>
            </DivDolarContainer>
            <StyledLink
              color="secondary"
              ismobile={String(isXs)}
              onClick={() => navigate(ROUTES.EDIT_DOLAR)}
            >
              Modificar
            </StyledLink>
          </MainGrid>
        </>
      ) : (
        <MainGrid
          item
          md={3}
          xl={2}
          container
          backcolor={theme.palette.grey[100]}
          justifyContent="center"
          ismobile={String(isXs)}
        >
          <Grid item xs={10}>
            <StyledCard backcolor={theme.palette.text.primary}>
              <CardContent>
                <div>
                  <CardTitle
                    color="secondary"
                    gutterBottom
                    variant={h2}
                    display="inline"
                  >
                    COTIZACIÓN
                  </CardTitle>
                </div>
                <DivDolarContainer ismobile={String(isXs)}>
                  <DivDolar>
                    <CardDescription variant={h3} color="textSecondary">
                      DOLAR:
                    </CardDescription>
                  </DivDolar>
                  <div>
                    <CardDescription variant={h3} color="textSecondary">
                      {dolar}
                    </CardDescription>
                  </div>
                </DivDolarContainer>
              </CardContent>
              <StyledCardAction>
                <StyledLink
                  color="secondary"
                  onClick={() => navigate(ROUTES.EDIT_DOLAR)}
                  ismobile={String(isXs)}
                >
                  Modificar
                </StyledLink>
              </StyledCardAction>
            </StyledCard>
          </Grid>
        </MainGrid>
      )}
    </>
  );
};
export default RightComponent;
