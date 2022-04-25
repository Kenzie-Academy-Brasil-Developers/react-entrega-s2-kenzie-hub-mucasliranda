import { Backdrop, Box, Typography, IconButton, TextField, Button, Select, MenuItem, InputLabel, FormControl, CircularProgress } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { toast } from "react-toastify";
import api from "../../services/api"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles( (theme) => ({
  deleteButton: {
    backgroundColor: theme.palette.grey.one,
    "&:hover":{
      backgroundColor: theme.palette.grey.two,
    }
  },

  eachTechs: {
    "&:hover": {
      backgroundColor: "blue"
    }
  }
  
}))

export default function CreateTech({setEditTech, editTech, techToEdit, auth}) {

  const classes = useStyles()

  const [status, setStatus] = useState("")

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Required field!")
      .min(2, "Minimum 2 characters!"),
  });
  
  const {register, handleSubmit, formState: { errors },} = useForm({ 
    resolver: yupResolver(schema) 
  });

  const handleChange = (event) => {
    setStatus(event.target.value);
  }

  const onRegister = (data) => {
    data.status = status
    console.log(data)
    api.put(`/users/techs/${techToEdit.id}`, data, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}})
      .then( (res) => {
        console.log(res)
        setEditTech(!editTech)
        toast("Tech editado!")
      })
      .catch( (err) =>{
        console.log(err)
        toast("Tech não editado!")
      })
  };

  const onDelete = () => {
    api.delete(`/users/techs/${techToEdit.id}`, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then( (res) => {
      console.log(res)
      setEditTech(!editTech)
      toast("Tech excluido!")
    })
    .catch( (err) =>{
      console.log(err)
      toast("Tech excluido!")
    })
  }

  return(
    <Backdrop
      open={editTech}
      sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: "flex", alignItems: "center"}}
    >

      <Box sx={{backgroundColor: "transparent", display: "flex", justifyContent: "center", flexDirection:"column", alignItems: "center", maxWidth: "400px", width: "100%", padding: "0px 12px",}} >
        
        <Box sx={{backgroundColor: "grey.two", width: "100%", borderRadius: "3px 3px 0px 0px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px",}} >

          <Typography sx={{}} >
            Technology details
          </Typography>

          <IconButton onClick={() => {
            setEditTech(!editTech)
            }} sx={{padding: "0px", }} >
            <CloseIcon sx={{color: "grey.one", height: "18px", width: "18px",}} />
          </IconButton>

        </Box>

        {!techToEdit.status ? (
          <CircularProgress />
        ):(
          <Box component="form" onSubmit={handleSubmit(onRegister)} sx={{backgroundColor: "grey.three", width: "100%", borderRadius: "3px 3px 0px 0px", display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center", gap: "35px" , padding: "20px 16px",}} >

            <TextField color="info" type="text" value={techToEdit.title} {...register("title")} />

            <FormControl sx={{width: "100%", maxWidth: "252px"}} >
              <InputLabel id="Status" color="info" sx={{color: "grey.one",}} >Status</InputLabel>
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

            <Box sx={{display: "flex", flexDirection: "space-between", maxWidth: "252px", width: "100%", gap: "22px",}} >

              <Button type="submit" variant="contained" sx={{padding:"9px", marginTop: "-15px", maxWidth: "154px", width: "100%",}} >
                Save
              </Button>
              
              <Button onClick={onDelete} variant="contained" className={classes.deleteButton} sx={{padding:"9px", marginTop: "-15px", maxWidth: "76px", width: "100%",}} >
                Delete
              </Button>

            </Box>

          </Box>
        )}

      </Box>

    </Backdrop>
  )

}