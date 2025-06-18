'use client'

import { create } from "zustand";

interface CardRegisterStore {
    show: boolean;
    setShow: (b: boolean) => void;
}

export const useCardRegister = create<CardRegisterStore>(set => ({
    show: false,
    setShow: (b) => set({ show: b }),
}));
