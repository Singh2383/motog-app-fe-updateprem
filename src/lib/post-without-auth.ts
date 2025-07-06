import axios from "axios";

export async function postWithoutAuth<TPayload = unknown>(path: string, data: TPayload) {
    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path.startsWith("/") ? path : "/" + path}`, data);
}
