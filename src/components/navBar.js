import React, { useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { AtrContext } from '../context/atrContext';
import { Button } from '@material-ui/core';
import Auth from '../helpers/auth';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	botones: {
		marginRight: 30,
	},
}));

function NavBar(props) {
	const usuario = JSON.parse(localStorage.getItem('usuario'));
	const classes = useStyles();
	console.log();
	function renderToogleWindows() {
		return (
			<>
				{usuario.admin === true && (
					<div className={classes.sectionDesktop}>
						<Button
							size='small'
							variant='contained'
							onClick={() => props.history.push('/dashboard')}
							className={classes.botones}
						>
							Carga Datos
						</Button>
						<Button
							className={classes.botones}
							size='small'
							variant='contained'
							onClick={() => props.history.push('/admin')}
						>
							Administrar Todo
						</Button>
					</div>
				)}
				<Typography>{usuario.nombre}</Typography>
				<IconButton
					size='large'
					style={{ color: '#e6e6e6' }}
					aria-label='upload picture'
					component='span'
				>
					<AccountCircle />
				</IconButton>
			</>
		);
	}

	return (
		<div className={classes.grow}>
			<AppBar position='static' style={{ backgroundColor: '#9e248c' }}>
				<Toolbar>
					<Typography className={classes.title} variant='h6' noWrap>
						ATR App
					</Typography>
					<div className={classes.grow} />
					{props.history.location.pathname !== '/' && renderToogleWindows()}
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default withRouter(NavBar);
