import React from "react"
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: "80vh", // app bar
        margin: 0,
        overflow: "hidden"
    },
 
})


function Loading(props) {
    var classes = useStyles();
    return (
        <div className={classes.loadingContainer}>
            <CircularProgress disableShrink />
        </div>)
}

export default Loading;