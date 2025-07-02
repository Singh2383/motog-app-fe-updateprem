"use client";

import React, { useState } from 'react';
import { Search, Menu, X, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Navbar from './navbar';
import BrandLine from './brand-line';
import ManualLocation from './manual-location';
import Login from '../login';
import Register from '../register';

const popularSearches = ["All Popular Cars", "Toyota Hilux", "Tata Harrier", "Mahindra Bolero"];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50">
            <BrandLine isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Navbar isMenuOpen={isMenuOpen} />
            <ManualLocation />
            <Login />
            <Register />
        </header>
    );
};

export default Header;