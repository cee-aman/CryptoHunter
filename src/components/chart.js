import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, createTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import { Line } from 'react-chartjs-2';
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { crypto } from './cryptocontext';
import SelectButton from "./buttoncomponent";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%", // Adjusted to full width
    minHeight: "600px",
    minWidth : "1000px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
  },
}));

const Chart = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = useContext(crypto);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setHistoricData(data.prices);
      } catch (error) {
        console.error('Failed to fetch historical data:', error);
      }
    };

    fetchData();
  }, [days, currency, coin.id]);

  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ]

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
      <div className={classes.container}>
        {historicData.length === 0? (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <Line
            data={{
              labels: historicData.map((priceData, index) => {
                const date = new Date(priceData[0]);
                const time = date.getHours() > 12? `${date.getHours() - 12}: ${date.getMinutes()} PM` : `${date.getHours()}: ${date.getMinutes()} AM`;
                return days === 1? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  label: `Price (past ${days} Days) in ${currency}`,
                  data: historicData.map(priceData => parseFloat(priceData[1])), // Ensure prices are numbers
                  borderColor: "#EEBC1D",
                  fill: false,
                },
              ],
            }}
            options={{
              elements : {
                point : {
                  radius : 1
                }

              } 
            }}
           
          />
        )}
        <div style={{display : 'flex', marginTop : 20, justifyContent : "space-around", width : "100%"}}>
       {
       chartDays.map((day) => (
        <SelectButton key={day.value} 
        selected={day.value === days} OnClick={() => setDays(day.value)}>
        {day.label}        
        </SelectButton>
       ))
       }
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Chart;