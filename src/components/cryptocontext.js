import React, { createContext, useEffect, useState } from 'react'

export const crypto = createContext()


function CryptoContext({children}) {
    const [currency, setcurrency] = useState("INR")
    const [symbol, setsymbol] = useState("₹")
    const [coin, setcoin] = useState()


    useEffect(() => {
     if(currency === "INR") {
setsymbol("₹")
     } else if (currency === "USD") {
        setsymbol("$")
     }
     }, [currency])
    

  return (
    <crypto.Provider value={{currency, symbol, setcurrency,setcoin, coin}}>
    {children}
    </crypto.Provider>
  )
}

export default CryptoContext