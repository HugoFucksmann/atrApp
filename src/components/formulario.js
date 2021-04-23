import React, { useContext, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Button, Input, TextField, Typography } from '@material-ui/core';
import imgDefault from '../assets/default_plus.png';
import { AtrContext } from '../context/atrContext';
import { crearUserAtr, miUsuarioLocal } from '../helpers/atrService';
import Swal from 'sweetalert2';

const personaModel = {
	nombre: '',
	apellido: '',
	edad: '',
	dni: '',
	cuil: '',
	fechaNacimiento: '',
	calle: '',
	numeroCalle: '',
	barrio: '',
	ciudad: '',
	cp: '',
	telefono: '',
	mail: '',
	tematica: '',
	proyecto: '',
};
const keys = Object.keys(personaModel);

const useStyles = makeStyles({
	imagen: {
		objectFit: 'cover',
		height: 250,
	},
	input: {
		margin: 20,
	},
	buttonUpload: {
		width: '80%',
		height: 250,
		padding: 0,
	},
	buttonCargar: {
		width: '80%',
		marginTop: 40,
		height: 80,
	},
});

const Formulario = () => {
	const classes = useStyles();
	const { handlerAtr, usuario } = useContext(AtrContext);
	const [formData, setFormData] = useState({
		usuarioCarga: miUsuarioLocal().uid,
	});
	const [image, setImage] = useState(null);
	const [filee, setFile] = useState(null);

	async function handlerCrearUserAtr() {
		let result = await crearUserAtr(formData, filee);
		if (result) {
			handlerAtr('crear', result);
		} else return Swal.fire('Error al crear persona :(', 'error');
	}

	function mostrarImagen(file) {
		setFile(file);
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = (e) => {
			setImage(reader.result);
		};
	}

	return (
		<Grid container>
			<Grid item xs={8}>
				{keys.map((key, index) => {
					if (key === 'fechaNacimiento')
						return (
							<TextField
								key={key}
								onChange={(e) =>
									setFormData({ ...formData, [key]: e.target.value })
								}
								id='date'
								label='fecha Nacimiento'
								className={classes.input}
								type='date'
								defaultValue='aaaa-mm-dd'
								InputLabelProps={{
									shrink: true,
								}}
							/>
						);
					return (
						<TextField
							onChange={(e) =>
								setFormData({ ...formData, [key]: e.target.value })
							}
							key={key}
							size='small'
							id={index}
							label={key}
							className={classes.input}
						/>
					);
				})}
			</Grid>
			<Grid item xs={4}>
				<Typography variant='subtitle1'>
					Carga foto DNI (Todavia no anda)
				</Typography>
				<Button
					variant='contained'
					component='label'
					className={classes.buttonUpload}
				>
					<Input
						hidden
						type='file'
						onChange={(e) => mostrarImagen(e.target.files[0])}
					/>
					{image ? (
						<img className={classes.imagen} src={image} alt='imk1' />
					) : (
						<img className={classes.imagen} src={imgDefault} alt='imk2' />
					)}
				</Button>
				<Button
					onClick={() => handlerCrearUserAtr()}
					className={classes.buttonCargar}
					variant='contained'
					color='secondary'
				>
					Cargar !
				</Button>
			</Grid>
		</Grid>
	);
};

export default Formulario;
