import {
  Palette,
  PaletteOptions,
} from "@material-ui/core/styles/createPalette";

import { CSSProperties, useMemo } from "react";
import { ThemeOptions, createTheme, Theme } from "@material-ui/core/styles";

import { AlertClassKey } from "@material-ui/lab";
import { MuiPickersOverrides } from "@material-ui/pickers/typings/overrides";

type overridesPickers = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module "@material-ui/core/styles/overrides" {
  export interface ComponentNameToClassKey extends overridesPickers {}
}

interface OverridesNameToClassKey {
  MuiAlert?: Partial<
    Record<AlertClassKey, CSSProperties | (() => CSSProperties)>
  >;
}

declare module "@material-ui/core/styles/overrides" {
  export interface ComponentNameToClassKey extends OverridesNameToClassKey {}
}

declare module "@material-ui/core/styles/createTheme" {
  interface Theme {
    palette: Palette;
    headerHeight: number;
  }
  interface ThemeOptions {
    palette?: PaletteOptions;
    headerHeight?: number;
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    borderColor: {
      main: string;
      black: string;
      secondary: string;
      light: string;
    };
    inputColor: {
      main: string;
      placeholder: string;
    };
    buttonColor: {
      main: string;
      secondary: string;
    };
  }

  interface PaletteOptions {
    borderColor: {
      main: string;
      black: string;
      secondary: string;
      light: string;
    };
    inputColor: {
      main: string;
      placeholder: string;
    };
    buttonColor: {
      main: string;
      secondary: string;
    };
  }

  interface TypeText {
    invertedPrimary: string;
    black: string;
  }

  interface TypeTextOptions {
    invertedPrimary: string;
    black: string;
  }

  interface TypeBackground {
    gradient: string;
    avatar: string;
    primaryBox: string;
    lightGray: string;
  }

  interface TypeBackgroundOptions {
    gradient: string;
    avatar: string;
    primaryBox: string;
    lightGray: string;
  }
}

const createMyTheme = (options: ThemeOptions): Theme => {
  return createTheme({
    ...options,
  });
};

// colors definition

const $white = "#FFFFFF";
const $black = "#000000";
const $lightBlack = "#2E3B52";
// const $yellow = "#F1B92B";
const $yellow = "#c6a965";
const $darkYellow = "#C38B03";
const $lightYellow = "#c6a965";
const $gray = "#9F9F9F";
const $grayBtn = "#979797";
const $lightGrayBtn = "#D8D8D8";
const $lightGray = "#6F809E";
const $red = "#DE5B5B";

const createGenericTheme = () => {
  return createMyTheme({
    palette: {
      type: "light",
      background: {
        paper: $white,
        default: $white,
      },
      primary: {
        main: $yellow,
        contrastText: $white,
      },
      secondary: {
        main: $white,
        contrastText: $yellow,
      },
      text: {
        primary: $black,
        black: $black,
        secondary: $yellow,
        invertedPrimary: $white,
      },
      borderColor: {
        main: $gray,
        black: $black,
        secondary: $black,
        light: $lightBlack,
      },
      inputColor: {
        main: $lightBlack,
        placeholder: $lightGray,
      },
      buttonColor: {
        main: $grayBtn,
        secondary: $lightGrayBtn,
      },
      error: {
        main: $red,
      },
    },
    spacing: (factor) => `${factor}rem`,
    typography: {
      fontFamily: "Poppins",
      fontSize: 16,
      htmlFontSize: 16,
      //h1 to h3 for desktop design
      h1: {
        fontSize: "4.0rem",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "8rem",
        letterSpacing: "-0.02em",
      },
      h2: {
        fontSize: "2.0rem",
        lineHeight: "2.0rem",
        fontStyle: "normal",
        fontWeight: 600,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontSize: "1.8rem",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "3.2rem",
        letterSpacing: "-0.01em",
      },
      // h4 to h6 for mobile
      h4: {
        fontSize: "2.8rem",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "3.6rem",
        letterSpacing: "-0.03em",
      },
      h5: {
        fontSize: "1.8rem",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "2.2rem",
        letterSpacing: "-0.02em",
      },
      h6: {
        fontSize: "1.2rem",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "2rem",
        letterSpacing: "-0.02em",
      },
      subtitle1: {
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "2.4rem",
        letterSpacing: "-0.02em",
      },
      subtitle2: {
        fontSize: "1.2rem",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "1.6rem",
        letterSpacing: "-0.03em",
      },
      body1: {
        fontSize: "2.4rem",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "4rem",
      },
      body2: {
        fontSize: "1.6rem",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "2.8rem",
        letterSpacing: "-0.02em",
      },
      button: {
        fontWeight: "bold",
        fontSize: "1.2rem",
        lineHeight: "3.2rem",
      },
      caption: {},
      overline: {},
    },

    overrides: {
      MuiAvatar: {
        root: {
          width: "8rem",
          height: "8rem",
        },
      },
      MuiMenuItem: {
        root: {
          fontSize: "1.2rem",
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
      MuiButton: {
        root: {
          color: $white,
          backgroundColor: $yellow,
          height: "4rem",
          borderRadius: "0",
          textTransform: "uppercase",
          fontWeight: 600,
          fontSize: "1.2rem",
          lineHeight: "3.2rem",
          [`@media screen and (max-width: 600px)`]: {
            fontSize: "1rem",
            lineHeight: "2.4rem",
          },
          "&:hover": {
            backgroundColor: $darkYellow,
          },
        },
        containedSecondary: {
          borderColor: $yellow,
          border: "1px solid",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "rgba(255, 98, 64, 0.1)",
          },
        },
      },
      MuiInput: {
        root: {
          fontSize: "1.8rem",
          lineHeight: "4rem",
          [`@media screen and (max-width: 600px)`]: {
            fontSize: "1.4rem",
            lineHeight: "2rem",
          },
        },
      },
      MuiListItem: {
        root: {
          "&$selected": {
            //backgroundColor: "red",
            // "&:hover": {
            //   backgroundColor: "red",
            // },
          },
        },
        button: {
          // "&:hover": {
          //   backgroundColor: "red",
          // },
        },
      },
      MuiOutlinedInput: {
        root: {
          "& $notchedOutline": {
            borderColor: $lightGray,
          },
          "&$focused $notchedOutline": {
            borderColor: $lightGray,
          },
          fontSize: "1.8rem",
          lineHeight: "4rem",
          [`@media screen and (max-width: 600px)`]: {
            fontSize: "1.4rem",
            lineHeight: "2rem",
          },
        },
        notchedOutline: {},
      },
      MuiFilledInput: {
        root: {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        },
        input: {
          padding: '27px 33px 10px'
        }
      },
      MuiFormLabel: {
        root: {
          fontSize: "1.8rem",
          [`@media screen and (max-width: 600px)`]: {
            fontSize: "1.4rem",
          },
        },
      },
      MuiTextField: {
        root: {
          "& .MuiInput-underline:before": {
            borderBottom: "none",
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "none",
          },
        },
      },
      MuiInputLabel: {
        root: {
          color: $lightGray,
          "&.Mui-focused": {
            color: $lightGray,
          },
        },
      },
      MuiDivider: {
        root: {
          opacity: 0.3,
          backgroundColor: "transparent",
          border: `1px solid ${$yellow}`,
          transform: "rotate(180deg)",
        },
      },
      MuiCard: {
        root: {
          border: `1px solid ${$lightGray}`,
        },
      },
      MuiSelect: {
        select: {
          textAlign: "left",
        },
      },
      MuiAlert: {
        root: {
          textAlign: "left",
        },
        message: {
          padding: 0,
        },
        action: {
          alignItems: 'start',
          padding: '7px 0',
        }
      },
      MuiTableSortLabel: {
        root: {
          "&:hover": {
            color: $black,
          },
          "&:focus": {
            color: $black,
          }
        },
        icon: {
          opacity: 1,
          "&:active": {
            color: $black,
          },
        },
      },
      MuiFormControl: {
        root: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          "& .MuiTextField-root": {
            margin: "1rem",
            width: "300px",
          },
          "& .MuiButtonBase-root": {
            margin: "0",
          },
        },
      },
      MuiFormHelperText: {
        root: {
          fontSize: "1.2rem",
        },
      },
      MuiPickersSlideTransition: {
        transitionContainer: {
          "& p": {
            lineHeight: "2.8rem",
          },
        },
      },
      MuiInputBase: {
        root: {
          fontSize: '1.8rem',
        }
      },
      MuiIconButton: {
        root: {
          "&:hover": {
            backgroundColor: 'inherit',
            borderRadius: 0,
          },
        },
      },
      MuiTouchRipple: {
        root: {
          borderRadius: 0,
        },
        child: {
          backgroundColor: 'inherit',
          borderRadius: 0,
          
        },
      },
      MuiToolbar: {
        regular: {
          backgroundColor: $lightYellow,
          opacity: '0.75'
        },
      },
      MuiTableFooter:{
        root: {
           backgroundColor: $white
        }
      },
      MuiTablePagination: {
        toolbar: {
        backgroundColor: $white
      } },
      MuiSnackbarContent: {
        root: {
          borderRadius: ".8rem",
          justifyContent: "center",
          padding: "2.4rem 5rem 2.4rem 5rem",
          maxHeight: "8rem",
          [`@media screen and (max-width: 764px)`]: {
            padding: "1.4rem 3.8rem 1.5rem 3.8rem;",
            borderRadius: ".4rem",
          },
        },
        message: {
          padding: 0,
        },
      },
    },
  });
};

export const useTheme = (): Theme => {
  return useMemo(() => {
    return createGenericTheme();
  }, []);
};
