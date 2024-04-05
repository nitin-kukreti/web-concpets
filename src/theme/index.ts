import { createTheme } from "@mui/material";
import { green, pink } from "@mui/material/colors";
import '@mui/material/Button';
declare module '@mui/material/styles' {
    interface Palette {
      nitinPallet: Palette['primary'];
    }

    interface PaletteOptions {
       nitinPallet?: PaletteOptions['primary'];
    }
  }

  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        nitinPallet: true;
    }
    interface ButtonPropsVariantOverrides {
        nitinVariant:true;
      }
      interface ButtonStyleOverrides {
        nitinVariant:true;
      }
  }

export const theme = createTheme({
     palette: {
        primary: {
            main: green[800],
        },
        nitinPallet: {
            main: pink[800],
            contrastText: '#ffffff'
        },
     },
     components: {
        MuiButton: {
            styleOverrides: {
                
            },
            variants: [
                {
                    props: {variant: 'nitinVariant'},
                    style: {
                    }
                }
            ]
        }
     }
  });