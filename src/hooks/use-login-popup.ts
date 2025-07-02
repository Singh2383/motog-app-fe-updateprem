'use client'

import { create } from "zustand";

interface LoginPopupStore {
    show: boolean,
    setShow: (b: boolean) => void;
}

export const useLoginPopup = create<LoginPopupStore>(set => ({
    show: false,
    setShow: (b) => set({ show: b }),
}));
