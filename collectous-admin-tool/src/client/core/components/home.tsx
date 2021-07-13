import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import DashboardCard from '../sub-components/dashboard-card';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);



  function Home(_props: any){
    const classes = useStyles();
    return(<div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DashboardCard className={classes.paper} description="TODO: Show details about active collectors, collector invites" title="Status of Data Collectors">xs=12 sm=6</DashboardCard>
        </Grid>
        <Grid item xs={12} sm={6}>
        <DashboardCard className={classes.paper} description="TODO: Show graph on the amount of data collected" title="Data collected"></DashboardCard>
        </Grid>
        <Grid item xs={12} sm={8}>
        <DashboardCard className={classes.paper} description="TODO: Show recent user activities as a list" title="Recent activities"></DashboardCard>
        </Grid>
        <Grid item xs={12} sm={4}>
        <DashboardCard className={classes.paper} description="TODO: Show content like last since data archived etc" title="System log"></DashboardCard>
        </Grid>
      </Grid>
    </div>);
  }


export default Home;