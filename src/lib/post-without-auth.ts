import axios from "axios";

export async function postWithoutAuth(path: string, data: any) {
    return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path.startsWith("/") ? path : "/" + path}`, data);
}
