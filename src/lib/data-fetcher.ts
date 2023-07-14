import axios from "axios";
const url: string =process.env.NODE_ENV ==="production"? "https://abc.xyz":"http://localhost:3000"
export const myAxios = axios.create({baseURL:`${url}/api/`})