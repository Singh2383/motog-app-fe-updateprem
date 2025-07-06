import { useAuthStore } from "@/app/stores/auth-store";
import axios from "axios";

export async function postWithAuth(path: string, data: any) {
    const token = useAuthStore(state => state.token);

    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path.startsWith("/") ? path : "/" + path}`, data, {
        headers: {
            Authorization: `Bearer ${token?.access_token}`,
            'Content-Type': 'application/json',
        },
    });
}
