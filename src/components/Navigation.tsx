'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { href: '/universities', label: 'مدیریت دانشگاه‌ها' },
        { href: '/selection', label: 'انتخاب رشته' },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <nav className="bg-secondary border-b border-border shadow-sm font-display">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-2 space-x-reverse">
                        <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">
                            سامانه انتخاب رشته
                        </Link>
                    </div>
                    <div className="hidden sm:flex space-x-4 space-x-reverse items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-3 py-2 text-base sm:text-lg font-semibold transition-colors ${
                                    isActive(item.href)
                                        ? 'border-b-2 border-primary text-primary'
                                        : 'border-b-2 border-transparent text-muted hover:text-text'
                                }`}
                                aria-current={isActive(item.href) ? 'page' : undefined}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="sm:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-muted hover:text-primary focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`sm:hidden overflow-hidden transition-all duration-700 ease-in-out ${
                    mobileMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-2 rounded-md text-base font-medium transition-colors ${
                                isActive(item.href)
                                    ? 'bg-primary-light text-primary'
                                    : 'text-muted hover:bg-secondary hover:text-text'
                            }`}
                            aria-current={isActive(item.href) ? 'page' : undefined}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
