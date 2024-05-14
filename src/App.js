import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/header';
import CoinPage from './pages/coinpage';
import { makeStyles } from '@material-ui/core/styles';
import Homepage from './components/homepage';

const useStyles = makeStyles(() => ({
  App : {
    backgroundColor : "#14161a",
    color : 'white',
    minHeight : "100vh"
  }
}))


function App() {


const classes = useStyles()


  return (
    <div className="App">
    <BrowserRouter>
    <div className={classes.App}>
    <Header />
    <Routes>
    <Route  path='/' Component={Homepage}/>
    <Route  path='/coins/:id' Component={CoinPage}/>

    </Routes>
    </div>
    
    </BrowserRouter>

    </div>
  );
}

export default App;
