import { create } from "zustand";
import { ILocation } from "@/app/_components/header/manual-location";
import { v4 as uuidv4 } from "uuid";

type Coords = {
    lat: number;
    lng: number;
}

interface ILocationState {
    geocode?: Coords;
    locality?: ILocation;
    setLocality: (loc: ILocation) => void;
    setGeocode: (g?: Coords) => void;
    sessionToken: string;
    generateSessionToken: () => void;
}

const useLocation = create<ILocationState>(set => ({
    sessionToken: "",
    geocode: undefined,
    locality: undefined,
    setLocality: (loc) => set(prev => ({ ...prev, locality: loc })),
    setGeocode: (g) => set(prev => ({ ...prev, geocode: g })),
    generateSessionToken: () => set(prev => ({ ...prev, sessionToken: uuidv4() })),
}));

export default useLocation;
