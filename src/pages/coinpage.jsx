/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { crypto } from '../components/cryptocontext'
import axios from 'axios'
import { SingleCoin } from '../config/api'
import Chart from './../components/chart';
import { LinearProgress, Typography, makeStyles } from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import singleCoindata from '../../src/components/singleCoin.json'

const useStyle = makeStyles((theme) => ({
main : {
  display : 'flex',
  [  theme.breakpoints.down('md') ]: {
flexDirection :"column",
alignItems : 'center'
  }
},
sidebar : {
  width : "30%",
  display : "flex",
  flexDirection : "column",
  marginTop : 25,
  borderRight : "2px solid grey",
  alignItems : 'center',
  [  theme.breakpoints.down('md') ]: {
    width : '100%'
      }
},
heading :  {
  fontWeight : 'bold',
  marginBottom : 20,
  fontFamily : "Montserrat"
}, desc :{
  width : '100%',
  fontFamily : "Montserrat",
  padding: 25,
  paddingBottom : 15,
  paddingTop : 0,
  textAlign : "justify"
}, 
marketData : {
   alignSelf : 'start',
   padding : 25,
   paddingTop : 10,
   width : '100%',
   [  theme.breakpoints.down('md') ]: {
    display : 'flex',
    justifyContext : 'space-around',
      },
      [  theme.breakpoints.down('sm') ]: {
        flexDirection : 'column',
        alignItems : "center"
          }, 
          [  theme.breakpoints.down('xs') ]: {
            alignItems : 'start'
              }


}
}))
function CoinPage() {

  const classes = useStyle()

  const {id} =  useParams()
  const [coin, setcoin] = useState(singleCoindata)
  const {currency} = useContext(crypto)
console.log(coin, "dasdas")

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchSingleCoin =  async() => {
const response = await axios.get(SingleCoin(id))
if (response.status === 200) {
  setcoin(response.data)

}
  }
 useEffect(() => {
  fetchSingleCoin()
 }, [id])
 console.log(coin)

 if(!coin) return <LinearProgress style={{backgroundColor : "gold"}} />

  
  return (
    <div className={classes.main}>
    <div className={classes.sidebar}>
    <img src={coin?.image?.large} alt={coin?.name} height= '200' />
    <Typography variant='h3' className={classes.heading}>{coin?.name} </Typography>
    <Typography className={classes.desc}>{ReactHtmlParser(coin?.description?.en.split(". ")[0])}. </Typography>
    <div className={classes.marketData}>
    <span style={{display : 'flex'}}>
<Typography variant='h5'  className={classes.heading} >Rank : </Typography>    
&nbsp; &nbsp;
<Typography variant='h5'  style={{fontFamily :"Montserrat"}} >              {numberWithCommas(coin?.market_cap_rank)}
</Typography>    

    </span>
    <span style={{display : 'flex'}}>
    <Typography variant='h5'  className={classes.heading} >Current Price : </Typography>    
    &nbsp; &nbsp;
    <Typography variant='h5'  style={{fontFamily :"Montserrat"}} >   {numberWithCommas(coin?.market_data.current_price[currency?.toLowerCase()])} </Typography>    
    
        </span>
        <span style={{display : 'flex'}}>
        <Typography variant='h5'  className={classes.heading} >Market Cap : </Typography>    
        &nbsp; &nbsp;
        <Typography variant='h5'  style={{fontFamily :"Montserrat"}} >{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()])}  </Typography>    
        
            </span>
    </div>
    
    </div>
    <div>
    <Chart coin={coin} />
    
    </div>
    
    </div>
  )
}

export default CoinPage