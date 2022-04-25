import {Box, Typography} from "@mui/material"
import api from "../../services/api"
import { useEffect } from "react"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles( (theme) => ({

  eachTechs: {
    "&:hover": {
      backgroundColor: theme.palette.grey.two
    }
  }
  
}))

export default function Techs({each,handleClickTechs}) {

  const classes = useStyles()
  
  return(
    <Box className={classes.eachTechs} onClick={handleClickTechs} id={each.id} sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", backgroundColor: "grey.four", padding: "12px", borderRadius: "4px", }} >

      <Typography sx={{fontSize: "14px", color: "grey.zero", fontWeight: "700",}} >
        {each.title}
      </Typography>

      <Typography sx={{fontSize: "12px", color: "grey.one", fontWeight: "400",}} >
        {each.status}
      </Typography>

    </Box>
  )

}