/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { crypto } from '../components/cryptocontext'
import axios from 'axios'
import { SingleCoin } from '../config/api'
import Chart from './../components/chart';
import { Button, LinearProgress, Typography, makeStyles } from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import singleCoindata from '../../src/components/singleCoin.json'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [isLoading, setIsLoading] = useState(false); // New state variable for tracking loading state
  const {id} =  useParams()
  const {currency, coin, setcoin} = useContext(crypto)
console.log(coin, "dasdas")
const [dataBool, setdataBool] = useState(false)
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const showHardCodedData = () => {
    setcoin(singleCoindata)
    setdataBool(true)
  }

  console.log(coin)

  const fetchSingleCoin = async () => {
    setIsLoading(true); // Set isLoading to true at the start of the request
    try {
      const response = await axios.get(SingleCoin(id));
      if (response.status === 200) {
        setcoin(response.data);
        setdataBool(true);
      }
    } catch (error) {
      console.error("Failed to fetch coin data:", error);
      setdataBool(false);
      // Optionally, set a default value or handle the error differently
    } finally {
      setIsLoading(false); // Set isLoading to false regardless of the request outcome
    }
  };
 
 useEffect(() => {
  fetchSingleCoin()
 }, [id])
 console.log(coin)


 return (
  isLoading? <LinearProgress style={{ backgroundColor: "gold" }} /> :
 !dataBool? (
    <>
      <Typography variant="h5" style={{ textAlign: 'center', marginTop: '10px', fontFamily: "montserrat" }}>
        APIs are paid, but this is just a demo. I can show you hardcoded data. This feature is free for the first render or after waiting for a minute. Alternatively, you can click the button below to see the hardcoded data. My goal here is to showcase my skills.
      </Typography>
      <div style={{ marginTop: 50, display: "flex", alignItems: "center", justifyContent: 'center' }}>
        <Button onClick={showHardCodedData} color='primary'>Show HardCoded Data</Button>
      </div>
    </>
  ) : (
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
    <Typography variant='h5'  style={{fontFamily :"Montserrat"}} > {numberWithCommas(coin?.market_data.current_price[currency?.toLowerCase()])} </Typography>    
    
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
);
}

export default CoinPage;