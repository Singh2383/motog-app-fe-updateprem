import { useAuthStore } from "@/components/stores/auth-store";
import axios from "axios";

export async function postWithAuth<TPayload = unknown>(path: string, data: TPayload) {
    const token = useAuthStore.getState().token;

    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path.startsWith("/") ? path : "/" + path}`, data, {
        headers: {
            Authorization: `Bearer ${token?.access_token}`,
            'Content-Type': 'application/json',
        },
    });
}
