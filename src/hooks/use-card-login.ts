'use client'

import { create } from "zustand";

interface CardLoginStore {
    show: boolean,
    setShow: (b: boolean) => void;
}

export const useCardLogin = create<CardLoginStore>(set => ({
    show: false,
    setShow: (b) => set({ show: b }),
}));
