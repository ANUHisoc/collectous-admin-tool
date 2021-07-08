// TODO class so to keep track of notifications via state

import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { indigo } from '@material-ui/core/colors';
import { DRAWER_WIDTH } from '../app'

const useStyles = makeStyles(theme => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
            background: indigo[600]
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    }
    ,
}));


export function CustomAppBar(props: { onClick: React.MouseEventHandler<HTMLButtonElement>; }) {
    var classes = useStyles();

    return (

        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.onClick}
                    className={classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Collectous
                </Typography>
            </Toolbar>
        </AppBar>);
}

export default CustomAppBar;