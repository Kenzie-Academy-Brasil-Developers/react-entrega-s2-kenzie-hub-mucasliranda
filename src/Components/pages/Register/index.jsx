import {Box, Typography, Select, InputLabel, FormControl, TextField, MenuItem, Button} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup"
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../../services/api"
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles( (theme) => ({

  leaveButton: {

    backgroundColor: theme.palette.grey.three,
    "&:hover": {
      backgroundColor: theme.palette.grey.two,
    }
  }

}))

export default function Register() {

  const classes = useStyles()

  // console.log(classes)

  const history = useHistory()

  const[value, setValue] = useState("")

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Required field!")
      .min(3, "Minimum 3 characters!"),
    email: yup
      .string()
      .required("Required field!")
      .email("Email not is valid!"),
    password: yup
      .string()
      .required("Required field!")
      .min(8, "Minimum 8 characters!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password does not match!"),
  });
  
  const {register, handleSubmit, formState: { errors },} = useForm({ 
    resolver: yupResolver(schema) 
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleReturn = () => {
    history.push("/")
  }
  
  const onRegister = (data) => {
    data.course_module = value
    data.bio           = "loreeem"
    data.contact       = "lorem ipsumm"
    console.log(data)
    api.post("/users", data)
      .then( (res) => {
        console.log(res)
        toast("Conta criada com sucesso!")
      })
      .catch( (err) =>{
        console.log(err)
        toast("Conta não foi criada!")
      })
  };

  return(
    <Box sx={{backgroundColor:"grey.four", 
      width:"100vw", height:"100vh", 
      paddingBottom:"calc(100vh * 0.10)", 
      display:"flex", flexDirection:"column", 
      justifyContent:"center", gap:"25px", alignItems:"center"}}>
      
      <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", maxWidth: "369px", width:"100%", margin:"0px 12px",  }} >
        <Typography variant="h1" color={"color.primary"} align="center" >
          Kenzie Hub
        </Typography>

        <Button onClick={handleReturn} variant="greyThree" sx={{padding:"9px", backgroundColor:"grey.three"}} >
          Return
        </Button>
      </Box>

      <Box sx={{
        backgroundColor:"grey.three", maxWidth: "369px", width: "92%",
        margin:"0px calc(100% * 0.06)", padding:" 32px 0px",
        display:"flex", flexDirection:"column",
        }}>

        <Typography variant="h1" align="center" mb="18px" >
          Register
        </Typography>

        <Typography variant="subtitle1" align="center" mt="" mb="30px" >
            Free and fast
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onRegister)} sx={{padding:"0px calc(100% * 0.06)", display:"flex", flexDirection:"column", gap:"25px"}} >

          <TextField color="info" label="Name" type="text" {...register("name")} helperText={errors.name?.message} error={!!errors.name?.message} />

          <TextField color="info" label="Email" type="text" {...register("email")} helperText={errors.email?.message} error={!!errors.email?.message} />

          <TextField color="info" label="Password" type="password" {...register("password")} helperText={errors.password?.message} error={!!errors.password?.message} />

          <TextField color="info" label="Confirm Password" type="password" {...register("confirmPassword")} helperText={errors.confirmPassword?.message} error={!!errors.confirmPassword?.message} />
          
          <FormControl fullWidth >
            <InputLabel id="Module" color="info" sx={{color: "grey.one",}} >Module</InputLabel>
            <Select
              required
              label="Module"
              labelId="Module"
              color="info"
              value={value}
              onChange={handleChange}
              sx={{backgroundColor:"grey.two",color:"grey.one",}}
            >
              <MenuItem value="First module (Front-end)" sx={{backgroundColor:"grey.two"}}>First module (Front-end)</MenuItem>
              <MenuItem value="Second module (Back-end)" sx={{backgroundColor:"grey.two"}}>Second module (Back-end)</MenuItem>
            </Select>
          </FormControl>
          
          <Button type="submit" variant="contained" sx={{padding:"9px", marginTop: "-15px", }} >
            Submit
          </Button>

        </Box>

      </Box>

    </Box>
  )
  
}