import {Box, Typography, TextField, Button } from "@mui/material"
import { useHistory } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { toast } from "react-toastify";
import api from "../../../services/api"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles( (theme) => ({

  createButton: {

    backgroundColor: theme.palette.grey.one,
    "&:hover": {
      backgroundColor: theme.palette.grey.two,
    }
    
  }

}))

export default function Login() {

  const classes = useStyles()

  console.log(classes)

  const history = useHistory()

  const handleRegister = () => {
    history.push("/register")
  }

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Required field!")
      .email("Email not is valid!"),
    password: yup
      .string()
      .required("Required field!")
      .min(8, "Minimum 8 characters!"),
  });

  const {register, handleSubmit, formState: { errors },} = useForm({ 
    resolver: yupResolver(schema) 
  });

  const onLogin = (data) => {
    api.post("/sessions", data)
      .then( (res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);
        history.push("/home")
        toast.success("Logado com sucesso!")
      })
      .catch( (err) => {
        console.log(err)
        toast("Deu erro no login!")
      })
  }

  return(
    <Box sx={{backgroundColor:"grey.four", 
      width:"100vw", height:"100vh", 
      paddingBottom:"calc(100vh * 0.10)", 
      display:"flex", flexDirection:"column", 
      justifyContent:"center", gap:"25px", alignItems:"center"}}>
      
      <Typography variant="h1" color={"color.primary"} align="center" >
        Kenzie Hub
      </Typography>

      <Box sx={{
        backgroundColor:"grey.three", maxWidth: "369px", width: "92%",
        margin:"0px calc(100% * 0.06)", padding:" 32px 0px",
        display:"flex", flexDirection:"column",
        }}>

        <Typography variant="h1" align="center" mb="45px" >
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onLogin)} sx={{padding:"0px calc(100% * 0.06)", display:"flex", flexDirection:"column", gap:"40px", }} >

          <TextField color="info" label="Email" type="text" {...register("email")} helperText={errors.email?.message} error={!!errors.email?.message} />

          <TextField color="info" label="Password" type="password" {...register("password")} helperText={errors.password?.message} error={!!errors.password?.message} />
          
          <Button type="submit" variant="contained" sx={{padding:"9px", marginTop: "-15px", }} >
            Submit
          </Button>

          <Typography variant="subtitle1" align="center" mt="-10px" mb="-20px" >
            Don't have account?
          </Typography>

          <Button variant="greyOne" onClick={handleRegister} sx={{padding:"9px"}} >
            Create account
          </Button>

        </Box>

      </Box>

    </Box>
  )

}