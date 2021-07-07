import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './home';
import Requests from './requests';
import Collectors from './collectors';
import UpdateForm from './update-form';
import Analysis from './analysis';
import Settings from './settings';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import GroupIcon from '@material-ui/icons/Group';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import AssessmentIcon from '@material-ui/icons/Assessment';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import indigo from '@material-ui/core/colors/indigo';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { RequestStore } from './repository/request';


{/* Reference: Uses responsive navbar boilerplate code*/ }


const THEME = createMuiTheme({
  typography: { fontFamily: ['Roboto', 'Nunito', 'sans-serif'].join(','), }
});

const DRAWER_WIDTH = 220;

const NAMES_ICONS: { [id: string]: JSX.Element } = {
  "Home": <HomeIcon />,
  "Requests": <MailIcon />,
  "Collectors": <GroupIcon />,
  "Update Form": <ListAltRoundedIcon />,
  "Analysis": <AssessmentIcon />,
  "Settings": <SettingsIcon />,
};


const REQUEST_STORE = new RequestStore(["teste", "tetse1"], [[1,1], [2,5]])
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

const NAV_LINKS: string[] = Object.keys(NAMES_ICONS)
  .map(name => name.toLowerCase()
    .replace(' ', '-')
    .replace("home", ''));

let useStyles = makeStyles(theme => ({
  icon: {
    color: 'white',
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      background: indigo[600]
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
    background: indigo[600],
    color: "white"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

function Skeleton(props) {
  var { window } = props;
  var classes = useStyles();
  var theme = useTheme();
  var [mobileOpen, setMobileOpen] = React.useState(false);

  var handleDrawerToggle = () => { setMobileOpen(!mobileOpen); };

  var drawer = (
    <div>
      <div className={classes.toolbar} />
      <List onClick={() => { setMobileOpen(false); }} >
        {Object.keys(NAMES_ICONS).map((name, index) => (
          <ListItem button key={name} component={NavLink} to={"/".concat(NAV_LINKS[index])}>
            <ListItemIcon className={classes.icon}>{NAMES_ICONS[name]}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  var container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={THEME}>
      <HashRouter>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Collectous
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{ paper: classes.drawerPaper, }}
                ModalProps={{ keepMounted: true, }} >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{ paper: classes.drawerPaper, }}
                variant="permanent"
                open >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {ROUTE_PATHS}
          </main>
        </div>
      </HashRouter>

    </ThemeProvider>
  );
}

export default Skeleton;
