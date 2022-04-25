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
            backgroundColor: "#212529"
          }
        },
      },
    },

  
  }

  const [auth, setAuth] = useState("")

  // theme.props = {
  //   MuiButton: {
  //     disableElevation: true,
  //   },
  // }

  // theme.overrides = {
  //   MuiList: {
  //     root: {
  //       padding: "0px",
  //     }
  //   },
  //   MuiButton: {
  //     disableElevation: true,
  //   },
  //   MuiOutlinedInput: {
  //     root: {
  //       fieldset: {
  //         borderColor: "none",
  //       },
  //     },
  //   },
  //   MuiInputLabel: {
  //     root: {
  //       color: 'white',
  //     }
  //   }
  // }

  // MuiTextField: {
  //   styleOverrides: {
  //     root: {
  //       input: {
  //         height: "16px",
  //         '@media (max-width:600px)': {
  //           height: "8px",
  //         },
  //       },
  //     },
  //   },
  // },

  // theme = responsiveFontSizes(theme)

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

        <Routes auth={auth} setAuth={setAuth} />

      </div>

    </ThemeProvider>
  );
}

export default App;