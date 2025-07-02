"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MapPin, Menu, Search, User, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LoginBtn from "./login-btn";
import useManualLocation from "@/hooks/use-manual-location";
import useLocation from "@/hooks/use-location";

const BrandLine = ({ isMenuOpen, setIsMenuOpen }) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const setShow = useManualLocation(state => state.setShow);
    const locality = useLocation(state => state.locality);
    return (
        <div className="border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-3 md:py-4">

                    <Link href={"/"} className='w-4/12 md:w-2/12 max-w-40'>
                        <Image alt='brand logo' width={500} height={175} src={"/images/brand_logo.svg"} className='overflow-hidden' />
                    </Link>

                    {/* Desktop Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <div className="relative w-full group">
                            <div className={cn(
                                "flex items-center border rounded-full transition-all duration-200",
                                isSearchFocused ? "border-gray-500 shadow-lg" : "border-gray-300"
                            )}>
                                <Search className="ml-4 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search cars, brands, models..."
                                    className="flex-1 px-4 py-3 outline-none rounded-full"
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Desktop Login Button */}
                    <div className="hidden md:block">
                        <LoginBtn />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Search Bar */}
                <div className="flex md:hidden pb-3">
                    <div className="relative w-full">
                        <div className="flex items-center border border-gray-300 focus-within:border-gray-500 rounded-full">
                            <Search className="ml-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search cars..."
                                className="flex-1 px-3 py-2.5 outline-none rounded-full text-sm"
                            />
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="flex md:hidden items-center gap-2 justify-start md:justify-center"
                        onClick={() => setShow(true)}>
                        <MapPin className="h-4 w-4" />
                        <span className=''>{locality?.structuredFormat.mainText.text ?? 'Select Location'}</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BrandLine;