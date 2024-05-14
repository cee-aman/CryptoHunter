import { Container, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles(() => ({
    banner : {
        backgroundImage : "url(./banner2.jpg)"
    },
    contain : {
        height : 400,
        paddingTop: 25,
        display:"flex",
        flexDirection : "column",
        justifyContent : 'space-around'

    }
        }))

function Banner() {

   
const classes = useStyle()
    
  return (
    <div className={classes.banner}>
    <Container className={classes.contain}>
    
    
    
    </Container>
    
    
    
    </div>
  )
}

export default Banner