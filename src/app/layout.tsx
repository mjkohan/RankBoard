import './globals.css';
import { Metadata } from 'next';
import Navigation from "@/components/Navigation";
import React from "react";
import { Vazirmatn, Lalezar } from 'next/font/google';

const vazirmatn = Vazirmatn({
    subsets: ['arabic'],
    variable: '--font-vazirmatn',
    display: 'swap',
});

const lalezar = Lalezar({
    subsets: ['arabic'],
    weight: '400',
    variable: '--font-lalezar',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'سامانه انتخاب رشته دانشگاه',
    description: 'سامانه هوشمند انتخاب رشته دانشگاه',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${lalezar.variable}`}>
        <body className="  min-h-screen">
        <Navigation />
        {children}
        </body>
        </html>
    );
}
