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
import UserValidation from './components/user-validation';

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { RequestModel } from './model/requests';
import { UserValidationModel } from './model/user-validation';
import { responsiveFontSizes } from '@material-ui/core/styles';
import { observer } from 'mobx-react-lite';


/* Reference: Uses responsive navbar boilerplate code*/


/* Models */
const REQUEST_MODEL = new RequestModel()
const USER_VALIDATION_MODEL = new UserValidationModel()

const THEME = responsiveFontSizes(createTheme({
  typography: { fontFamily: ['Roboto', 'Nunito', 'sans-serif'].join(','), }
}));

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
        <Requests model={REQUEST_MODEL} {...props} />)} />
    <Route path="/collectors" component={Collectors} />
    <Route path="/update-form" component={UpdateForm} />
    <Route path="/analysis" component={Analysis} />
    <Route path="/settings" component={Settings} />
  </div>);




const App = observer((props: React.PropsWithChildren<any>) => {
  var { window } = props
  var classes = useStyles();

  var theme = useTheme()
  var [isMobileOpen, setIsMobileOpen] = useState(false);
  var [isUserValidated, setIsUserValidated] = useState(false)

  var handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };


  var container =
    window !== undefined ? () => window().document.body : undefined;


  var appContent =
    <div className={classes.root}>
      <CssBaseline />
      <CustomAppbar onClick={handleDrawerToggle} />
      <HashRouter>
        <Drawer mobileState={[isMobileOpen, setIsMobileOpen]} container={container} theme={theme} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {ROUTE_PATHS}
        </main>
      </HashRouter>
    </div>

  var userValidationContent = <UserValidation model={USER_VALIDATION_MODEL} />

  return (
    <ThemeProvider theme={THEME}>
      {USER_VALIDATION_MODEL.isValidUser ? appContent : userValidationContent}
    </ThemeProvider>
  );
})

export default App;
