import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import Carousel from './caraousal'

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

    }, 
    tagline : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : "center",
        textAlign : 'center'

    }
        }))

function Banner() {

   
const classes = useStyle()
    
  return (
    <div className={classes.banner}>
    <Container className={classes.contain}>
    <div className={classes.tagline}>
    <Typography variant='h2' style={{fontWeight : "bold", fontFamily : "Montserrat", marginBottom : 15}}>
    Crypto Sleuth
        </Typography>
        <Typography variant='subtitle2' style={{color : "darkgray", textTransform : 'capitalize', fontFamily : 'Montserrat'}} >
        Gather up all the juicy details on your top crypto pick.
        </Typography>
    </div>
    <Carousel /> 
    
    
    
    </Container>
    
    
    
    </div>
  )
}

export default Banner