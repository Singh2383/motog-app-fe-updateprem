'use client';

import React, { startTransition, useEffect, useState } from 'react';
import useManualLocation from '@/hooks/use-manual-location';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useLocation from '@/hooks/use-location';
import { toast } from 'sonner';
import { postWithoutAuth } from '@/lib/post-without-auth';

export interface ILocation {
    mainText: string;
    secondaryText: string;
    placeId?: string;
    country?: string;
};

interface ISuggestion {
    suggestions: ILocation[];
}

type GetSuggestionParam = {
    addrStr: string;
    sessionToken: string;
    latLng: string; //"28.5079920,77.2025578"
}

const ManualLocation = () => {
    const show = useManualLocation(state => state.show);
    const setShow = useManualLocation(state => state.setShow);
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<ILocation[]>([]);
    const setLocality = useLocation(state => state.setLocality);

    const { sessionToken, geocode } = useLocation();

    useEffect(() => {
        if (!input.trim()) {
            setSuggestions([]);
            return;
        }

        const delay = setTimeout(() => {
            startTransition(async () => {
                try {
                    const { data } = await postWithoutAuth<GetSuggestionParam, ISuggestion>("loc-autocomplete",
                        { addrStr: input, latLng: `${geocode?.lat},${geocode?.lng}`, sessionToken });
                    console.log("autocomplete suggestions", data);
                    setSuggestions(data.suggestions ?? []);
                } catch (err) {
                    console.error("something wrong in fetching suggestions", err);
                    toast.error("Oops! Something wrong looking up!");
                }
            });
        }, 300); //debounce

        return () => clearTimeout(delay);
    }, [input, geocode, sessionToken]);

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent className='p-10' aria-describedby={'manual local entry dialog'}>
                <DialogHeader>
                    <DialogTitle className='p-4'>We need your city to customize your experience</DialogTitle>
                    <div className='group relative pb-6'>
                        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type your city, e.g. Jaipur, New Delhi' className='' />
                        {input && suggestions?.length > 0 && (
                            <div className='absolute py-2 shadow-2xl shadow-black rounded-xl w-full bg-white overflow-hidden'>
                                {
                                    suggestions.map(({ mainText, secondaryText, country }, i) => {
                                        return (
                                            <p key={`${i}_${mainText.split(" ").join("")}`}
                                                className='hover:bg-neutral-200 hover:cursor-pointer py-1 px-3 space-x-2'
                                                onClick={() => { setLocality({ mainText, secondaryText, country }); setShow(false); }}
                                            >
                                                <span>{mainText}</span>
                                                {secondaryText && <span>({secondaryText.split(",")[0]})</span>}
                                            </p>
                                        );
                                    })
                                }
                            </div>
                        )}
                    </div>
                </DialogHeader>
                <DialogDescription className='hidden'>This is a hidden description for manual location input dialog.</DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default ManualLocation;
