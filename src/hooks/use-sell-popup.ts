import { create } from "zustand";

export const useSellPopup = create<{ show: boolean; setShow: (b: boolean) => void; }>(set => ({
    show: false,
    setShow: (b) => set({ show: b }),
}));
