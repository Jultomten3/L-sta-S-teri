import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/inridning', label: 'Inridning' },
        { path: '/traningar', label: 'Träning' },
        { path: '/forsaljning', label: 'Försäljning' },
        { path: '/vara-hastar', label: 'Våra hästar' },
        { path: '/tavlingar', label: 'Tävlingar' },
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800 font-sans">
            {/* Header */}
            <header className="bg-dark-green shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3">
                            <img src="/logo.png" alt="Låsta Säteri Logo" className="h-12 w-auto" />
                            <span className="text-2xl font-bold text-khaki tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                                Låsta Säteri
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        "text-sm font-medium transition-colors duration-200 hover:text-amber-700",
                                        isActive(link.path)
                                            ? "text-khaki border-b-2 border-khaki"
                                            : "text-stone-300 hover:text-khaki"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-stone-600 hover:text-stone-900 focus:outline-none"
                            >
                                {isMenuOpen ? <X size={24} className="text-khaki" /> : <Menu size={24} className="text-khaki" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-stone-100">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={cn(
                                        "block px-3 py-2 rounded-md text-base font-medium",
                                        isActive(link.path)
                                            ? "bg-amber-50 text-amber-900"
                                            : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-cafe-noir text-stone-300 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-white text-lg font-serif font-bold mb-4">Låsta Säteri</h3>
                            <p className="text-sm leading-relaxed max-w-xs">
                                En plats för utveckling, gemenskap och kärlek till hästen. Vi erbjuder inridning, träning och försäljning av högkvalitativa hästar.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-serif font-bold mb-4">Kontakt</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center space-x-2">
                                    <Mail size={16} className="text-khaki" />
                                    <a href="mailto:info@lastasateri.se" className="hover:text-white transition-colors">info@lastasateri.se</a>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <Phone size={16} className="text-khaki" />
                                    <a href="tel:+46700000000" className="hover:text-white transition-colors">070-000 00 00</a>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <MapPin size={16} className="text-khaki" />
                                    <span>Låsta Säteri, Strängnäs</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-serif font-bold mb-4">Följ oss</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-stone-400 hover:text-khaki transition-colors">
                                    <Instagram size={24} />
                                </a>
                                <a href="#" className="text-stone-400 hover:text-khaki transition-colors">
                                    <Facebook size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
                        &copy; {new Date().getFullYear()} Låsta Säteri. Alla rättigheter förbehållna.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
