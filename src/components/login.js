import React, { useContext, useState } from 'react';
import { Box, Button, Paper, TextField } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import { makeStyles } from '@material-ui/styles';
import { AtrContext } from '../context/atrContext';
import auth from '../helpers/auth';

const useStyles = makeStyles({
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
	},
	loginContainer: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		padding: 30,
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 20,
		width: 250,
	},
	fullScreen: {
		flex: 1,
	},
});

export default function Login(props) {
	const [usuario, setUsuario] = useState();
	const [password, setPassword] = useState();
	const classes = useStyles();

	async function handleSubmit(event) {
		event.preventDefault();
		auth.login(usuario, password, props);
	}

	return (
		<Paper elevation={6} className={classes.loginContainer}>
			<form className={classes.form}>
				<TextField
					id='standard-basic1'
					label='Usuario'
					onChange={(e) => setUsuario(e.target.value)}
				/>
				<TextField
					id='standard-basic2'
					label='Password'
					onChange={(e) => setPassword(e.target.value)}
				/>
			</form>

			<Button
				variant='contained'
				color='primary'
				className={classes.root}
				onClick={(e) => handleSubmit(e)}
			>
				Acceder
			</Button>
		</Paper>
	);
}
