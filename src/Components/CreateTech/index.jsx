import { Backdrop, Box, Typography, IconButton, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { toast } from "react-toastify";
import api from "../../services/api"


export default function CreateTech({createTech, setCreateTech}) {

  const [status, setStatus] = useState("")

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Required field!")
      .min(2, "Minimum 2 characters!"),
  });
  
  const {register, handleSubmit, reset, formState: { errors },} = useForm({ 
    resolver: yupResolver(schema) 
  });

  const handleChange = (event) => {
    setStatus(event.target.value);
  }

  const onRegister = (data) => {
    data.status = status
    console.log(data)
    api.post("/users/techs", data, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}})
      .then( (res) => {
        console.log(res)
        setCreateTech(!createTech)
        toast("Tech criado!")
        reset()
      })
      .catch( (err) =>{
        console.log(err)
        toast("Tech não criado!")
      })
  };

  return(
    <Backdrop
      open={createTech}
      sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: "flex", alignItems: "center"}}
    >

    <Box sx={{backgroundColor: "transparent", display: "flex", justifyContent: "center", flexDirection:"column", alignItems: "center", maxWidth: "400px", width: "100%", padding: "0px 12px",}} >
      
      <Box sx={{backgroundColor: "grey.two", width: "100%", borderRadius: "3px 3px 0px 0px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px",}} >

        <Typography sx={{}} >
          New technology
        </Typography>

        <IconButton onClick={() => {
          setCreateTech(!createTech)
          }} sx={{padding: "0px", }} >
          <CloseIcon sx={{color: "grey.one", height: "18px", width: "18px",}} />
        </IconButton>

      </Box>

      <Box component="form" onSubmit={handleSubmit(onRegister)} sx={{backgroundColor: "grey.three", width: "100%", borderRadius: "3px 3px 0px 0px", display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center", gap: "35px" , padding: "20px 16px",}} >

          <TextField color="info" type="text" label="Name" {...register("title")} />

          <FormControl sx={{width: "100%", maxWidth: "252px"}} >
            <InputLabel id="Status" color="info" sx={{color: "grey.one",}} >Age</InputLabel>
            <Select
              required
              label="Status"
              labelId="Status"
              color="info"
              value={status}
              onChange={handleChange}
              sx={{backgroundColor:"grey.two",color:"grey.one",}}
            >
              <MenuItem value="Beginner" sx={{backgroundColor:"grey.two"}}>Beginner</MenuItem>
              <MenuItem value="Basic" sx={{backgroundColor:"grey.two"}}>Basic</MenuItem>
              <MenuItem value="Advanced" sx={{backgroundColor:"grey.two"}}>Advanced</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained"  sx={{padding:"9px", marginTop: "-15px", maxWidth: "252px", width: "100%",}} >
            Create
          </Button>

      </Box>

    </Box>

    </Backdrop>
  )

}