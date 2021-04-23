import axios from 'axios';
import Swal from 'sweetalert2';

class Auth {
	get token() {
		return localStorage.getItem('token') || '';
	}
	get headers() {
		return {
			headers: {
				'x-token': this.token,
			},
		};
	}

	async login(email, password, props) {
		try {
			await axios
				.post(`${process.env.REACT_APP_URL}/login`, {
					email,
					password,
				})
				.then((resp) => {
					localStorage.setItem('token', resp.data.token);
					localStorage.setItem('usuario', JSON.stringify(resp.data.usuario));

					props.history.push('/dashboard');
					return Swal.fire('Login correcto!', '', 'success');
				})
				.catch((err) => {
					console.log(err);
					Swal.fire('error al loguearse', '', 'error');
				});
		} catch (e) {
			console.log(e);
		}
	}

	logout(props) {
		//this.authenticated = false;
		props.history.push('/');
		localStorage.removeItem('token');
	}

	validarToken() {
		return axios
			.get(`${process.env.REACT_APP_URL}/login/renew`, this.headers)
			.then((resp) => console.log(resp));
	}

	async crearUsuario(email, password, nombre, props) {
		await axios
			.post(`${process.env.REACT_APP_URL}/usu`, {
				email,
				password,
				nombre,
			})
			.then((resp) => {
				console.log(resp);
				localStorage.setItem('token', resp.data.token);
				localStorage.setItem('usuario', JSON.stringify(resp.data.usuario));

				props.history.push('/dashboard');
				return Swal.fire('Login correcto!', '', 'success');
			});
	}

	/* isAuthenticated() {
    console.log(this.authenticated);
    return this.authenticated
  } */
}

export default new Auth();
