'use client'

import { create } from "zustand";

interface RegisterPopupStore {
    show: boolean;
    setShow: (b: boolean) => void;
}

export const useRegisterPopup = create<RegisterPopupStore>(set => ({
    show: false,
    setShow: (b) => set({ show: b }),
}));
