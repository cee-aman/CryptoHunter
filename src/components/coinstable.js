/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import axios from "axios";
import { useContext } from "react";
import { crypto } from "./cryptocontext";
import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Pagination, TextField } from "@mui/material";
import tableData from './tableData.json'


const useStyles = makeStyles(() => ({
row : {
  backgroundColor : "#16171a",
  cursor : "pointer",
  "&:hover" : {
    backgroundColor : "#131111"
  }, 
  fontFamily : "Montserrat"
},
pageina : {
  "& .MuiPaginationItem-root" : {
    color : "gold"
  },
}
}))

function CoinsTable() {
  const [CoinData, setCoinData] = useState(tableData);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState('')
  const [page, setpage] = useState(1)
  const { currency, symbol } = useContext(crypto);

  const classes = useStyles()
  
  const fetchCoins = async () => {
    setloading(true);
    const response = await axios.get(CoinList(currency));
    if(response.status === 200) {
      setCoinData(response.data);
      setloading(false);
      
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);


  // const fetchCoins = async () => {
  //   setloading(true);
  //   setCoinData(tableData);
  //   setloading(false);
  // };

  // useEffect(() => {
  //   fetchCoins();
  // }, []);

  const handleSearchBar = () => {
    // Correctly convert names and symbols to lowercase
    return CoinData.filter((coin) => {
      return coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase());
    });
  };
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

useEffect(() => {
  console.log(handleSearchBar());
  console.log(search)

}, [search])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const headers = ["Coin", "Price", "24h Change", "Market Cap"];


  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ fontFamily: "Montserrat", marginTop: 20 }}
        >
          Crypto Prices by Market Cap
        </Typography>
        <TextField style={{marginTop: 15}} fullWidth label="Search" id="fullWidth" onChange={(e) => setsearch(e.target.value) } />
        <TableContainer>
        
        {
            loading ? <LinearProgress style={{color : "gold", width : "100%", marginTop: "10px"}} /> : (

                <>
                <Table style={{marginTop: 40}}>
                <TableHead style={{backgroundColor : "#EEBC1D"}}>
                <TableRow>
                {
                    headers.map((table) =>(
                        <TableCell key={table} style={{color : "black", fontWeight : 700, fontFamily : "montserrat"}} >{table}</TableCell>
                    ) )
                }
                </TableRow>
                
                </TableHead>
                <TableBody>
                {handleSearchBar().slice((page -1) * 10, (page - 1 ) * 10 + 10)
                  .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row" style={{ display: "flex", gap: 15 }}>
                        <Link to={`/coins/${row.id}`}>
                          <img src={row.image} alt={row.name} height="50" style={{ marginBottom: 10 }} />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ textTransform: "uppercase", fontSize: 22 }}>{row.symbol}</span>
                            <span style={{ color: "darkgray" }}>{row.name}</span>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell >{symbol}{numberWithCommas(row.current_price.toFixed(2))}</TableCell>
                      <TableCell ><span style={{color : profit > 0 ? "rgb(14, 203 ,129)" : "red", fontWeight : 500}}>{profit? "+" : "-"}{numberWithCommas(row.price_change_percentage_24h.toFixed(2))}%</span> </TableCell>
                      <TableCell>{numberWithCommas(row.market_cap)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
                </Table>
                </>
            ) 
        }
        </TableContainer>
              <Pagination  style={{padding: 20, display : 'flex', justifyContent : 'center', width : '100%'}} count={(handleSearchBar()?.length/10).toFixed(0)} variant="outlined" color="secondary"
              onChange={(_, value) => { setpage(value)
                window.scroll(0, 450)

              }}
               />

       
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
