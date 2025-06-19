'use client';

import React, { startTransition, useEffect, useState } from 'react';
import useManualLocation from '@/hooks/use-manual-location';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
    error?: string;
};

const ManualLocation = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    const show = useManualLocation(state => state.show);
    const setShow = useManualLocation(state => state.setShow);
    const [input, setInput] = useState("");
    const [selected, setSelected] = useState<ISuggestion>();
    const [suggestions, setSuggestions] = useState<IPrediction[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!input.trim()) {
            setSuggestions([]);
            return;
        }

        const delay = setTimeout(() => {
            startTransition(async () => {
                const result: IPredictionResult = await getCitySuggestions(input);
                if (result?.data) {
                    console.log("success fetching suggestions: ", result?.data);
                    setSuggestions(result?.data.suggestions);
                } else {
                    console.log("error fetching suggestions", result?.error);
                    setError(result?.error ?? "");
                }
            });
        }, 500); //debounce

        return () => clearTimeout(delay);
    }, [input, apiKey, error]);

    console.log("selected location", selected);

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
                                                className='hover:bg-neutral-200 hover:cursor-pointer py-1 px-3 space-x-2'
                                                onClick={() => setSelected(placePrediction)}
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
