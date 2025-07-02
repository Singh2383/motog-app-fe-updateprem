import { create } from "zustand";
import { ISuggestion as ILocality } from "@/app/_components/header/manual-location";

interface ILocation {
    geocode?: { lat: number, long: number };
    locality?: ILocality;
}

interface ILocationSetter {
    setGeocode: (geo: { lat: number, long: number }) => void;
    setLocality: (loc: ILocality) => void;
}

type ILocationStore = ILocation & ILocationSetter;

const useLocation = create<ILocationStore>(set => ({
    geocode: undefined,
    locality: undefined,
    setGeocode: (geo) => set(prev => ({ ...prev, geocode: geo })),
    setLocality: (loc) => set(prev => ({ ...prev, locality: loc })),
}));

export default useLocation;
