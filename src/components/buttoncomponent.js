import { makeStyles } from '@material-ui/core'
import React from 'react'
const useStyle = makeStyles(() => ({
    selectbutton: {
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor:   "gold" ,
        fontWeight: 700,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
        //   margin: 5,
      },
}))

function SelectButton({children, selected , OnClick}) {
    
    
const classes = useStyle()

  return (
    <span onClick={OnClick} className={classes.selectbutton}>
    {children}
    </span>
  )
}

export default SelectButton