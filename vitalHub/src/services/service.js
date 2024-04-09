import axios from "axios";

//declarar a porta da api
const portaApi = "4466";

//declarar o ip da maquina
const ip = "192.168.21.51";

//definir a url da api
const apiUrlLocal = `http://${ip}:${portaApi}/api`;

//trazer a configuracao do axios
const api = axios.create({ baseURL: apiUrlLocal });

export default api;
