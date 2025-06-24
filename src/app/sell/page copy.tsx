import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';

const Sell = () => {
    return (
        <div className='pt-40 sm:pt-24 md:pt-30'>
            {/* First section with image */}
            <div className='relative'>
                <div className='pb-16 bg-gradient-to-r from-[#c8dffa] from-10% via-[#cee3fb] via-20% to-white to-80%'>
                    <div className='w-full max-w-4xl mx-auto'>
                        <Image 
                            src={"/images/sell_your_car.png"} 
                            height={0} 
                            width={0} 
                            sizes='100vw' 
                            className='w-full h-auto' 
                            alt="sell your car at pest price" 
                        />
                    </div>
                </div>
                {/* Gradient overlay at bottom of image section to blend with form */}
                <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent'></div>
            </div>

            {/* Form section with smooth transition */}
            <section className='relative -mt-8 z-10 w-full'>
                <div className='w-full max-w-3xl mx-auto bg-white rounded-xl [box-shadow:0_0_10px_rgba(0,0,0,0.3)] py-8 px-32'>
                    <h2 className='text-3xl font-bold mb-6'>Enter your car registration number</h2>
                    {/* Your form components here */}
                    <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4 items-center max-w-xl'>
                        <Input id='reg-no' className='w-full !text-lg font-semibold py-6'/>
                        <button className='max-w-48 w-full bg-sky-600 text-white py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors'>
                            Sell My Car
                        </button>
                    </div>
                </div>
            </section>

            {/* Transition to next section */}
            <div className='relative mt-20 max-w-4xl'>
                {/* <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white via-sky-100 to-transparent'></div> */}
                <Image 
                    src={"/images/how.png"} 
                    height={0} 
                    width={0} 
                    sizes='100vw'
                    className='w-full h-auto' 
                    alt="how motog works" 
                />
            </div>

            {/* <Image 
                src={"/images/why_motog.png"} 
                height={500} 
                width={500} 
                className='w-full h-auto mt-20' 
                alt="why to sell on motog" 
            /> */}
        </div>
    )
}

export default Sell;