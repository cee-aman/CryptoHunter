import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import axios from "axios";
import { useContext } from "react";
import { crypto } from "./cryptocontext";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  InputBase,
  LinearProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Toolbar,
  Typography,
  alpha,
  createTheme,
  styled,
} from "@material-ui/core";
import tableData from "./tableData.json";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  marginTop: 30,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function CoinsTable() {
  const [CoinData, setCoinData] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState('')

  const { currency } = useContext(crypto);

//   const fetchCoins = async () => {
//     setloading(true);
//     const response = await axios.get(CoinList(currency));
//     setCoinData(response.data);
//     setloading(false);
//   };

//   useEffect(() => {
//     fetchCoins();
//   }, [currency]);


  const fetchCoins = async () => {
    setloading(true);
    setCoinData(tableData);
    setloading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);


  console.log(loading);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ fontFamily: "Montserrat", marginTop: 20 }}
        >
          Crypto Prices by Market Cap
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            style={{ fontFamily: "Montserrat" }}
            placeholder="Search…"
            onChange={(event) => setsearch(event.target.value)} // Log the input value
          />
        </Search>
        <TableContainer>
        
        {
            loading ? <LinearProgress style={{color : "gold", width : "80%"}} /> : (

                <>
                <Table style={{marginTop: 40}}>
                <TableHead style={{backgroundColor : "#EEBC1D"}}>
                <TableRow>
                {
                    ["Coin", "Price", "24h Change", "Market Cap"].map((table) =>(
                        <TableCell key={table} style={{color : "black", fontWeight : 700, fontFamily : "montserrat"}} align={table === "Coin" ? '' : "right"  }>{table}</TableCell>
                    ) )
                }
                </TableRow>
                
                </TableHead>
                </Table>
                </>
            ) 
        }
        </TableContainer>
       
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
