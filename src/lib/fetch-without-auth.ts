import axios from "axios";

export async function fetchWithOutAuth(path: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path.startsWith("/") ? path : "/" + path}`);
}
