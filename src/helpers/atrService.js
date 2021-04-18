import axios from 'axios';

export async function getUsersAtr() {
	let urlSearch = `${process.env.REACT_APP_URL}/atr/usersatr`;
	let resp = await axios.get(urlSearch).then(({ data }) => data.usuario);
	console.log(resp.length);
	return resp;
}

export async function eliminarUserAtr(id) {
	let urlSearch = `${process.env.REACT_APP_URL}/atr/usersatr/${id}`;
	let resp = await axios.delete(urlSearch).then(({ data }) => data);
	console.log(resp);
	//return resp;
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
		console.log('aaaaaaaaaaaaaaaaaaa');
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
		console.log('dataaaaa ', data);
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
			console.log('data.userAtr._id ', data.userAtr._id);
			let result = await actualizarArchivo(file, data.userAtr._id);
			console.log('result ', result);
			return result;
		} else return false;
	});

	return userAtr;
}

/* await NoticiasService.crearNoticia(notaDB)
      .then( async (resp) => {
        const id = resp.data.noticias._id;
        actualizarArchivo(filee, 'noticias', id).catch(err => console.log(err))
        if (isFile) {
          await Swal.fire({
            allowOutsideClick: false,
            title: "Archivo de audio video o img",
            input: "file",
            preConfirm: (file) => {
              actualizarArchivo(file, 'files', id)
                .then(() => {
                  Swal.fire("nota cargada con exito", "", "success")
                })
                .catch((err) => console.log(err));
            },
          });
        } else {
          Swal.fire("nota cargada con exito", "", "success");
        }        
        
      })
      .catch((err) => {
        console.log(err.response);
        Swal.fire("error al cargar la nota", "", "error");
      });
  } */
