import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


function DashboardCard(props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h4">{props.title}</Typography>
                <Typography variant="body2" component="p">{props.description} </Typography>
            </CardContent>
        </Card>
    )
}


export default DashboardCard;