import {Box, AppBar, Typography, Button, IconButton} from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateTech from "../../CreateTech";
import Techs from "../../Techs";
import api from "../../../services/api";
import EditTech from "../../EditTech"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles( (theme) => ({

  leaveButton: {

    backgroundColor: theme.palette.grey.three,
    "&:hover": {
      backgroundColor: theme.palette.grey.two,
    }
  }

}))

export default function Home({auth, setAuth}) {

  const classes = useStyles()

  const [createTech, setCreateTech] = useState(false)

  const [editTech, setEditTech]     = useState(false)

  const [techToEdit, setTechToEdit] = useState("")

  const [infos, setInfos]           = useState("")

  const history = useHistory()

  !!!localStorage.getItem("token") && (history.push("/"))

  const handleLeave = () => {
    localStorage.clear();
    history.push("/")
  }

  const handleClickTechs = (event) => {

    setTechToEdit(
      infos.techs.find( (each) => {
        return each.id === event.target.id
      })
    )

    console.log(techToEdit)

    setEditTech(!editTech)
    
  }

  useEffect( () => {
    api.get(`/users/${localStorage.getItem("id")}`, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then( (res) => {
      setInfos(res.data)
      // console.log(res)
    })
    .catch( (err) =>{
      console.log(err)
    })
  },[createTech, editTech])



  return(
    <Box sx={{backgroundColor:"grey.four", 
      width:"100vw", height:"100vh",
      alignItems: "center", justifyContent: "center",
    }}>
      
      <AppBar position="static" sx={{backgroundColor: "transparent", height: "73px", display: "flex", justifyContent: "center", flexDirection:"row", alignItems: "center", width: "100vw", padding:"0px 12px", borderBottom: "1px solid #212529"}} >
        
        <Box sx={{display: "flex", justifyContent: "space-between", flexDirection:"row", alignItems: "center", maxWidth: "780px", width: "100%"}} >
          
          <Typography variant="h1" color="primary" >
            Kenzie Hub
          </Typography>

          <Button onClick={handleLeave} variant="contained" className={classes.leaveButton} sx={{padding:"9px", backgroundColor:"grey.three"}} >
            Leave
          </Button>

        </Box>

      </AppBar>

      <Box sx={{backgroundColor: "transparent", display: "flex", justifyContent: "center", flexDirection:"row", alignItems: "center", width: "100vw", borderBottom: "1px solid #212529", padding: "0px 12px"}} >
        
        <Box sx={{height: "131px", display: "flex", justifyContent: "space-between", flexDirection:"row", alignItems: "center", maxWidth: "780px", width: "100%"}} >

          <Typography sx={{fontSize: "18px", color: "grey.zero", fontWeight: "700",}} >
            Hey, {infos.name}
          </Typography>

          <Typography sx={{fontSize: "12px", color: "grey.one", fontWeight: "400",}} >
            {infos.course_module}
          </Typography>

        </Box>

      </Box>

      <Box sx={{backgroundColor: "transparent", display: "flex", justifyContent: "center", flexDirection:"column", alignItems: "center", width: "100vw", padding: "0px 12px",}} >
        
        <Box sx={{display: "flex", justifyContent: "space-between", flexDirection:"row", alignItems: "center", maxWidth: "780px", width: "100%", padding:"18px 0px"}} >

        <Typography sx={{fontSize: "16px", color: "grey.zero", fontWeight: "600",}} >
            Techs
        </Typography>

        <IconButton onClick={() => {
          setCreateTech(!createTech)
          }} sx={{padding: "0px", }} >
          <AddBoxIcon size="large" sx={{color: "#212529", height: "32px", width: "32px",}} />
        </IconButton>

        </Box>

        <Box sx={{display: "flex", justifyContent: "space-between", flexDirection:"column", alignItems: "center", width: "100%", maxWidth: "780px", padding:"22px 8.5px", backgroundColor: "#212529", gap: "16px", borderRadius: "4px",}} >

          {infos &&(
            infos.techs.map( (each, index) => {
              return <Techs each={each} key={index} handleClickTechs={handleClickTechs} />
            })
          )}


        </Box>

        <CreateTech createTech={createTech} setCreateTech={setCreateTech} auth={auth} />

        <EditTech editTech={editTech} setEditTech={setEditTech} techToEdit={techToEdit} auth={auth} />
        
      </Box>

    </Box>
  )
}