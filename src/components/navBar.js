import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { AtrContext } from '../context/atrContext';

const NavBar = (props) => {
	const { usuario } = useContext(AtrContext);
	return (
		<AppBar position='static' variant="outlined">
			<Toolbar>
			
				<Typography variant='h6'>
					ATR App
				</Typography>
				<Typography  align='right'>
					{usuario.nombre ? `logeado como: ${usuario.nombre}` : ''}
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
