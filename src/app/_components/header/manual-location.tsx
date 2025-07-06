'use client';

import React, { startTransition, useEffect, useState } from 'react';
import useManualLocation from '@/hooks/use-manual-location';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getCitySuggestions } from '@/app/actions/getCitySuggestions';
import useLocation from '@/hooks/use-location';
import { toast } from 'sonner';

export interface ISuggestion {
    structuredFormat: {
        mainText: { text: string };
        secondaryText: { text: string };
    };
    placeId: string;
};

export interface IPrediction { placePrediction: ISuggestion };

interface IPredictionResult {
    data?: {
        suggestions?: IPrediction[];
        error?: {
            status: string;
            code: number;
        };
    };
    error?: string;
};

const ManualLocation = () => {
    const show = useManualLocation(state => state.show);
    const setShow = useManualLocation(state => state.setShow);
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<IPrediction[]>([]);
    const setLocality = useLocation(state => state.setLocality);

    useEffect(() => {
        if (!input.trim()) {
            setSuggestions([]);
            return;
        }

        const delay = setTimeout(() => {
            startTransition(async () => {
                const { data, error }: IPredictionResult = await getCitySuggestions(input);
                console.error("prediction error:", error);
                if (data) {
                    if (data.error) {
                        console.error("error fetching suggestions:", data.error);
                        toast.error("Oops! Can't find your place!");
                    } else {
                        setSuggestions(data.suggestions ?? []);
                    }
                } else {
                    console.error("something wrong in fetching suggestions", error);
                    toast.error("Oops! Something wrong looking up!");
                }
            });
        }, 500); //debounce

        return () => clearTimeout(delay);
    }, [input]);

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
                                    suggestions.map(({ placePrediction }, i) => {
                                        const { structuredFormat: { mainText, secondaryText } } = placePrediction;
                                        if (!mainText?.text) return null;
                                        return (
                                            <p key={`${i}_${mainText.text.split(" ").join("")}`}
                                                className='hover:bg-neutral-200 hover:cursor-pointer py-1 px-3 space-x-2'
                                                onClick={() => { setLocality(placePrediction); setShow(false); }}
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
