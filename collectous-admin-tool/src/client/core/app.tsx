import React, { useState } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import CustomAppbar from './sub-components/appbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from './sub-components/drawer';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Home from './components/home'
import Requests from './components/requests'
import Collectors from './components/collectors';
import UpdateForm from './components/update-form';
import Analysis from './components/analysis';
import Settings from './components/settings';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { RequestStore } from './model/request';
import { Login } from './model/login';


/* Reference: Uses responsive navbar boilerplate code*/


/* Models */
const REQUEST_STORE = new RequestStore()
const LOGIN = new Login()

const THEME = createMuiTheme({
  typography: { fontFamily: ['Roboto', 'Nunito', 'sans-serif'].join(','), }
});

export const DRAWER_WIDTH = 220;


let useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));


const ROUTE_PATHS: JSX.Element = (
  <div className="content">
    <Route exact path='/' component={Home} />
    <Route path="/requests"
    render={(props) => (
    <Requests  store = {REQUEST_STORE} {...props}/>)}  />
    <Route path="/collectors" component={Collectors} />
    <Route path="/update-form" component={UpdateForm} />
    <Route path="/analysis" component={Analysis} />
    <Route path="/settings" component={Settings} />
  </div>);


function Skeleton(props) {
  var { window } = props;
  var classes = useStyles();

  var theme = useTheme()
  var [mobileOpen, setMobileOpen] = useState(false);
  var handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  var container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={THEME}>

      <div className={classes.root}>
        <CssBaseline />
        <CustomAppbar onClick={handleDrawerToggle} />
        <HashRouter>
          <Drawer mobileState={[mobileOpen, setMobileOpen]} container={container} theme={theme} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {ROUTE_PATHS}
          </main>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}

export default Skeleton;
