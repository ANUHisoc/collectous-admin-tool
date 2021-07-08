// TODO class so to keep track of notifications via state

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import { DRAWER_WIDTH } from '../app'
import { Hidden, List, ListItem, ListItemIcon, ListItemText, Theme } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import GroupIcon from '@material-ui/icons/Group';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
        background: indigo[600],
        color: "white"
    },
    toolbar: theme.mixins.toolbar,
    icon: {
        color: 'white',
    },

}));

const NAMES_ICONS: { [id: string]: JSX.Element } = {
    "Home": <HomeIcon />,
    "Requests": <MailIcon />,
    "Collectors": <GroupIcon />,
    "Update Form": <ListAltRoundedIcon />,
    "Analysis": <AssessmentIcon />,
    "Settings": <SettingsIcon />,
};

const NAV_LINKS: string[] = Object.keys(NAMES_ICONS)
    .map(name => name.toLowerCase()
        .replace(' ', '-')
        .replace("home", ''));


interface DrawerProps {
    mobileState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    container: any,
    theme: Theme,
}

export function CustomDrawer(props: DrawerProps) {

    var { mobileState: [mobileOpen, setMobileOpen], container, theme } = props
    var classes = useStyles();

    var drawer = (
        <div>
            <div className={classes.toolbar} />
            <List onClick={() => { setMobileOpen(false) }} >
                {Object.keys(NAMES_ICONS).map((name, index) => (
                    <ListItem button key={name} component={NavLink} to={"/".concat(NAV_LINKS[index])}>
                        <ListItemIcon className={classes.icon}>{NAMES_ICONS[name]}</ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    var handleDrawerToggle = () => { setMobileOpen(!mobileOpen); };
    return (
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
        </nav>)
}

export default CustomDrawer;