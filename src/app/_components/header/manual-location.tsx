'use client';

import React, { startTransition, useEffect, useState } from 'react';
import useManualLocation from '@/hooks/use-manual-location';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getCitySuggestions } from '@/app/actions/getCitySuggestions';

interface ISuggestion {
    structuredFormat: {
        mainText: { text: string };
        secondaryText: { text: string };
    };
    placeId: string;
};

interface IPrediction { placePrediction: ISuggestion };

interface IPredictionResult {
    data?: {
        suggestions: IPrediction[];
    };
    error?: any;
};

const ManualLocation = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    const show = useManualLocation(state => state.show);
    const setShow = useManualLocation(state => state.setShow);
    const [input, setInput] = useState("");
    const [selected, setSelected] = useState<ISuggestion>();
    const [suggestions, setSuggestions] = useState<IPrediction[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!input.trim()) {
            setSuggestions([]);
            return;
        }

        const delay = setTimeout(() => {
            startTransition(async () => {
                const { data, error }: IPredictionResult = await getCitySuggestions(input);
                if (data) {
                    console.log("success fetching suggestions: ", data);
                    setSuggestions(data.suggestions);
                } else {
                    console.log("error fetching suggestions", error);
                    //setError(error);
                }
            });
        }, 500); //debounce

        return () => clearTimeout(delay);
    }, [input, apiKey]);

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent className='p-10'>
                <DialogHeader>
                    <DialogTitle className='p-4'>We need your city to customize your experience</DialogTitle>
                    <div className='group relative pb-6'>
                        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type your city, e.g. Jaipur, New Delhi' className='' />
                        {input && suggestions?.length > 0 && (
                            <div className='hidden group-focus-within:block absolute py-2 shadow-2xl shadow-black rounded-xl w-full bg-white overflow-hidden'>
                                {
                                    suggestions.map(({ placePrediction }, i) => {
                                        const { structuredFormat: { mainText, secondaryText } } = placePrediction;
                                        if (!mainText?.text) return null;
                                        return (
                                            <p key={`${i}_${mainText.text.split(" ").join("")}`}
                                                className='hover:bg-neutral-200 py-1 px-3 space-x-2'
                                            >
                                                <span>{mainText.text}</span>
                                                {secondaryText?.text && <span>({secondaryText.text.split(",")[0]})</span>}
                                            </p>
                                        );
                                    })
                                }
                            </div>
                        )}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ManualLocation;
