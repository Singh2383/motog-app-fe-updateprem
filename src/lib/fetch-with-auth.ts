import { useAuthStore } from "@/app/stores/auth-store";
import axios, { AxiosResponse } from "axios";

export async function fetchWithAuth(path: string) {
    const token = useAuthStore(state=>state.token);

    return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path.startsWith("/") ? path : "/" + path}`, {
        headers: {
            Authorization: `Bearer ${token?.access_token}`,
            'Content-Type': 'application/json',
        },
    });
}
