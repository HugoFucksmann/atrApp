import  axios from "axios";
import Swal from "sweetalert2";

class Auth {
  get token() {
    return localStorage.getItem("token") || "";
  }
  get headers() {
    return {
      headers: {
        "x-token": this.token,
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
          localStorage.setItem("token", resp.data.token);
          //this.authenticated = true;
          props.history.push("/dashboard");
          Swal.fire("Login correcto!", "", "success");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("error al loguearse", "", "error");
        });
    } catch (e) {
      console.log(e);
    }
  }

  logout(props) {
    this.authenticated = false;
    props.history.push("/");
    localStorage.removeItem("token");
  }

  validarToken() {
    return axios.get(`${process.env.REACT_APP_URL}/login/renew`,this.headers)
    .then( resp => console.log(resp));
  }

  /* isAuthenticated() {
    console.log(this.authenticated);
    return this.authenticated
  } */
}



export default new Auth();
