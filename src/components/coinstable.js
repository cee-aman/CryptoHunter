/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import axios from "axios";
import { useContext } from "react";
import { crypto } from "./cryptocontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  styled,
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

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '.MuiPaginationItem-root': {
    color: 'gold',
  },
  '.MuiPaginationItem-root	': {
    backgroundColor: 'gold',
  },
  '.MuiPaginationItem-root	': {
    backgroundColor: 'gold',
  },
}));


function CoinsTable() {
  const [CoinData, setCoinData] = useState(tableData);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState('')
  const [page, setpage] = useState(1)
  const { currency, symbol } = useContext(crypto);

  const classes = useStyles()

  const showErrorToast = () => {
    toast.error("API limit reached. Displaying hardcoded data." )
  };
  
  const fetchCoins = async () => {
    setloading(true); // Indicate loading state
    try {
      const response = await axios.get(CoinList(currency)); // Attempt to fetch data
      if (response.status === 200) {
        setCoinData(response.data); // Set the fetched data
        setloading(false); // Indicate that loading has finished
      } else {
        console.error(`Unexpected status code: ${response.status}`);
        showErrorToast()        // Handle cases where the status code is not 200
      }
    } catch (error) {
      console.error("An error occurred while fetching coins:", error);
      showErrorToast()        // Handle cases where the status code is not 200
      // Log the error
      // Handle the error appropriately, e.g., by setting an error state or showing a message to the user
      setloading(false); // Ensure loading state is cleared even in case of an error
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


  const handleSearchBar = () => {
    // Correctly convert names and symbols to lowercase
    return CoinData.filter((coin) => {
      return coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase());
    });
  };
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

    // Example usage of toast
 

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
        <TextField style={{marginTop: 15, backgroundColor : "#ffff"}} fullWidth label="Search" id="fullWidth" onChange={(e) => setsearch(e.target.value) } />
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
              <StyledPagination style={{padding: 20, display : 'flex', justifyContent : 'center', width : '100%'}} count={(handleSearchBar()?.length/10).toFixed(0)} color="primary" 
              onChange={(_, value) => { setpage(value)
                window.scroll(0, 450)

              }}
               />


      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
