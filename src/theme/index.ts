import {  Palette, PaletteColor, createTheme } from "@mui/material";
import { green, pink } from "@mui/material/colors";
// import {} from "@mui/material/styles";
// import {ButtonPropsSizeOverrides}  from '@mui/material/Button';
// import {SwitchPropsColorOverrides,SwitchPropsSizeOverrides}  from '@mui/material/Switch';

declare module '@mui/material/styles' {
    interface Palette {
      nitinPallet: Palette['primary'];
    }

    interface PaletteOptions {
       nitinPallet: PaletteOptions['primary'];
    }
  }

  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        nitinPallet?: true;
    }
    interface ButtonPropsVariantOverrides {
        rounded?:true;
    }
    interface ButtonStyleOverrides {
        nitinVariant?:true;
    }
    interface ButtonPropsSizeOverrides {
      extraLarge?: true;
    }

  }

  declare module '@mui/material/Fab' {
    interface FabPropsColorOverrides {
      nitinPallet?: true;
    }
  }

  declare module '@mui/material/Switch' {
    interface SwitchPropsColorOverrides {
      nitinPallet?: true;
    }
    interface SwitchPropsSizeOverrides{
      extraLarge?: true;
    }
  }

export const theme = createTheme({
     palette: {
        primary: {
            main: green[800],
        },
        nitinPallet: {
            main: pink[800],
            dark: pink[900],
            light: pink[300],
            contrastText: '#ffffff'
        },
     },
     components: {
        MuiButton: {
            styleOverrides: {
              root: ({ownerState,theme:_theme})=>{
                return ({
                ...(ownerState.variant === 'rounded' && ownerState.color && {
                   backgroundColor: (_theme.palette[ownerState.color as keyof Palette] as PaletteColor).main,
                   borderRadius: '50%',
                   color: (_theme.palette[ownerState.color as keyof Palette] as PaletteColor).contrastText,
                   ":hover":{
                    backgroundColor: (_theme.palette[ownerState.color as keyof Palette] as PaletteColor).dark,
                   }
                })
              })},

            },
            variants: [
              {
                props: {variant: 'rounded',color:'nitinPallet',size: 'small'},
                style: {
                 width: '200px',
                 height: '200px',
                }
              }
            ]

        },
        MuiFab: {
          
        }
     }
  });