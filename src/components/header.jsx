import { AppBar, Container, MenuItem, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'
import React, { useContext } from 'react'
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import { dark } from '@material-ui/core/styles/createPalette';
import { faker } from '@faker-js/faker';
import { crypto } from './cryptocontext';

const useStyles = makeStyles(() => ({
    title : {
        flex : 1, 
        color : 'gold',
        fontFamily : "Montserrat",
        fontWeight : "bold",
        cursor : 'pointer'
    },
    flex : {
        display: "flex",
        justifyContent : "spaceBetween"

    }
}))



function Header() {

const {currency, setcurrency} = useContext(crypto)
console.log(currency)

    const classes = useStyles()

    const darkTheme = createTheme({
        palette: {
          primary : {
            main : "#fff"
          },
          type : "dark"
        },
      });

  return (
    <ThemeProvider  theme={darkTheme}>
    <AppBar className={classes.flex} color='transparent' position='static'  > 
    
    <Container>
    
    <Toolbar>
    <Link to='/'>
    <Typography variant='h6' className={classes.title}>
    Crypto Investigator 
    </Typography>
    </Link>
 
<Select style={{height: 40, width : 100, marginLeft: "66rem"}}  value={currency} onChange={(e) => setcurrency(e.target.value) } variant='outlined' >
<MenuItem value={"USD"} >USD</MenuItem>
<MenuItem value={"ISD"}>INR</MenuItem>

</Select>
    </Toolbar>
    </Container>
    
    </AppBar>
    </ThemeProvider>
    
  )
}

export default Header