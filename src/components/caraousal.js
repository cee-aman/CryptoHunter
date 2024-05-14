import { makeStyles } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { TrendingCoins } from '../config/api'
import { crypto } from './cryptocontext'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom'
import coinData from './coins.json'



const useStyle  = makeStyles(() => ({
cara : {
    height : "50%",
    display : "flex", 
    alignItems : 'center'
},

carouselItem : {
  display : 'flex',
  flexDirection : 'column',
  alignItems : 'center',
  cursor : "pointer",
  textTransform : 'uppercase',
  color : 'white'

},

}))

function Carousel() {
const classes = useStyle()
const [treding, settreding] = useState([])

const {currency, symbol} = useContext(crypto)
console.log(coinData, "das")


 function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const fetchTrendingCoins = async () => {
    const response = await axios.get(TrendingCoins(currency))
    console.log(response)
    settreding(response.data)
}

console.log(treding)

useEffect(() => {
    fetchTrendingCoins()
}, [currency])

// const getCoinData = () => {
//   settreding(coinData)
// }
// useEffect(() => {
//  getCoinData()
// }, [])


const items = treding.map((coin) => {
let profit = coin.price_change_percentage_24h >= 0

  return (
    <Link className={classes.carouselItem} to={`/coins/${coin.id}`} 
    >
    <img src={coin?.image}  alt={coin.name} height="80" style={{marginBottom : 10}}   />
    <span>{coin?.symbol}
     &nbsp;
<span style={{color : profit > 0 ? "rgb(14, 203 ,129)" : "red", fontWeight : 500}}>
{profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)} %
</span>  
     </span>
     <span style={{fontSize : 22, fontWeight : 500}}>
     {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
     </span>

    </Link>
    
  )
})

const responsive = {
  0 : {
    items : 2
  },
  512 : {
    items : 4
  }
}

  return (
    <div className={classes.cara}>
    
    
<AliceCarousel
disableDotsControls
 mouseTracking
 infinite
 autoPlayInterval={1000}
 animationDuration={1500}
    responsive={responsive}
     items={items}
      disableButtonsControls
      autoPlay />
    </div>
  )
}

export default Carousel