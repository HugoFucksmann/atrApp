import axios from "axios";



export async function searchByTaller(taller){
    let urlSearch = `${process.env.REACT_APP_URL}/talleres/taller/${taller}`;
    let resp = await axios.get(urlSearch).then(({ data }) => data);
    return resp
}   

export async function buscarTodo(value, parametro) {
    let urlSearch2 = `${process.env.REACT_APP_URL}/talleres/busqueda/${parametro}/${value}`;
    let resp = await axios.get(urlSearch2).then(({ data }) => data);
    if(resp.ok){
        return resp;
    }
    
}
