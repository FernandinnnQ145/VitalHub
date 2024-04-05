import axios from "axios";

//declarar a porta da api
const portaApi = "4466";

//declarar o ip da maquina
const ip = "172.16.39.94";

//definir a url da api
const apiUrlLocal = `http://${ip}:${portaApi}/api`;

//trazer a configuracao do axios
const api = axios.create({ baseURL: apiUrlLocal });

export default api;
