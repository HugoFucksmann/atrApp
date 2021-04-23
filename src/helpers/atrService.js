import axios from 'axios';

function headers() {
	return {
		headers: {
			'x-token': localStorage.getItem('token') || '',
		},
	};
}

export function miUsuarioLocal() {
	return JSON.parse(localStorage.getItem('usuario'));
}

export async function getMyUser() {
	let miUsuario = await axios
		.get(`${process.env.REACT_APP_URL}/usu`, headers())
		.then((res) => res.data.miUsuario)
		.catch((e) => {
			console.log(e);
			return {};
		});
	return miUsuario;
}

export async function getUsersAtr() {
	let urlSearch = `${process.env.REACT_APP_URL}/atr/usersatr`;
	let resp = await axios.get(urlSearch).then(({ data }) => data.usuario);

	return resp;
}

export async function eliminarUserAtr(id) {
	let urlSearch = `${process.env.REACT_APP_URL}/atr/usersatr/${id}`;
	let resp = await axios.delete(urlSearch).then(({ data }) => data);
	if (resp.ok) return true;
	else return false;
}

export async function editarUserAtr(personaEdit) {
	let urlSearch = `${process.env.REACT_APP_URL}/atr/usersatr`;
	let resp = await axios.put(urlSearch, personaEdit).then(({ data }) => data);

	if (resp.ok) return resp.persona;
	else return false;
}

async function actualizarArchivo(file, userAtrId) {
	try {
		const token = localStorage.getItem('token') || '';
		let localUri = file.uri;
		let filename = localUri.split('/').pop();

		let match = /\.(\w+)$/.exec(filename);
		let type = match ? `image/${match[1]}` : `image`;

		const url = `https://mascotass.herokuapp.com/api/upload/${userAtrId}`;
		let formData = new FormData();

		formData.append('atrdni', { uri: localUri, name: filename, type });

		const resp = await fetch(url, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				token: token,
			},
			body: formData,
		}).catch((e) => console.log(e));

		const data = await resp.json();

		if (data.ok) {
			return data.mascota;
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
		return false;
	}
}

export function buscarTodo(usersAtr, parametro, value) {
	let result = usersAtr.filter((user) => {
		return user[parametro] === value;
	});
	return result;
}

export async function crearUserAtr(formData, file) {
	const url = `${process.env.REACT_APP_URL}/atr/usersAtr`;
	let userAtr = await axios.post(url, formData).then(async ({ data }) => {
		if (data.ok) {
			//let result = await actualizarArchivo(file, data.userAtr._id);
			//return result;
			return data.userAtr;
		} else return false;
	});

	return userAtr;
}
