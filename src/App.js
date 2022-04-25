import './App.css';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';


function App() {

  let theme = createTheme({
    palette: {
      primary: {
        main: '#ff577f',
      },
      secondary: {
        main: '#343B41',
        light: '#868e96', 
      },
      info: {
        main: "#f8f9fa"
      },
      color: {
        primary: '#ff577f',
        focus: '#ff427f',
        negative: '#59323f',
      },
      grey: {
        four: '#121214',
        three: '#212529',
        two: '#343b41',
        one: '#868e96',
        zero: '#f8f9fa',
      },
      feedback: {
        sucess: "#3fe864",
        negative: "#e83f5b",
      },
    },
    typography: {
      fontFamily: [
        "Inter",
        "Sans-serif"
      ].join(","),
      h1: {
        fontWeight: "700",
        fontSize: "18px",
        '@media (max-width:600px)': {
          fontSize: "16px",
        },
        color: "#F8F9FA",
      },
      h2: {
        fontWeight: "700",
        fontSize: "16px"
      },
      h3: {
        fontWeight: "700",
        fontSize: "14px"
      },
      subtitle1: {
        fontWeight: "600",
        fontSize: "12px",
        '@media (max-width:600px)': {
          fontSize: "9.5px",
        },
        color: "#868e96",
      },
      button: {
        textTransform: "none",
        fontSize: "16px",
        fontWeight: "400",
        '@media (max-width:600px)': {
          fontSize: "12.8px",
        },
      },
    },
    
  })

  theme.components = {
    MuiList: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiTextField: {
      styleOverrides:{
        root: {
          label: {
            color: "#868E96",
          },
          input: {
            color: '#f8f9fa',
          },
          backgroundColor: "#343b41"
        },
      },
    },
    MuiMenuItem: {
      styleOverrides:{
        root: {
          color: '#f8f9fa',
          "&:hover": {
            backgroundColor: theme.palette.grey.one
          },
          "&:focus": {
            backgroundColor: theme.palette.grey.three
          }
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: {variant: "greyOne"},
          style: {
            color: theme.palette.grey.zero,
            backgroundColor: theme.palette.grey.one,
            "&:hover": {
              backgroundColor: theme.palette.grey.two,
            }
          },
        },
        {
          props: {variant: "greyThree"},
          style: {
            color: theme.palette.grey.zero,
            backgroundColor: theme.palette.grey.three,
            "&:hover": {
              backgroundColor: theme.palette.grey.two,
            }
          },
        },
      ]
    }
  
  }

  return (
    <ThemeProvider theme={theme} >

      <div className='app' >

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />

        <Routes />

      </div>

    </ThemeProvider>
  );
}

export default App;