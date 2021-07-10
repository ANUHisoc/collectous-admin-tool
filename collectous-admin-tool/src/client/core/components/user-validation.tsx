import React from "react";
import { UserValidationModel } from "../model/user-validation";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Alert, AlertTitle } from '@material-ui/lab';

interface ComponentProps {
    model: UserValidationModel
}

let useStyles = makeStyles(_theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
    },
    appName: {
        color: "#2196F3",
        textAlign: "center",
    },
}));

/*Note: Below string does not uses a keyboard producible hypen; 
See https://stackoverflow.com/questions/8753296/how-to-prevent-line-break-at-hyphens-in-all-browsers */
const APP_NAME = "Collectous admin‑tool"

const UserValidation = observer((props: React.PropsWithChildren<ComponentProps>) => {
    var classes = useStyles()
    var { model } = props

    var loadingContent = <CircularProgress disableShrink />
    var errorMessageContent = <Alert severity="error">
        <AlertTitle>Insufficient permission</AlertTitle>
        You do not have permission to use this tool. Please <strong>contact</strong> your respective NGO 
        administrator for access to this.
    </Alert>

    return (
        <div className={classes.root}>
            <Grid container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={3}>
                <Grid item xs={12}  >
                    <Typography variant="h2" className={classes.appName}>{APP_NAME}</Typography>
                </Grid>
                <Grid item xs={9}  >
                    {((model.isAuthenticating) || (model.isValidUser)) ?
                        loadingContent : errorMessageContent
                    }
                </Grid>
            </Grid>
        </div>)
})


export default UserValidation;