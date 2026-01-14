"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
    const { language, setLanguage, t, dir } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === "ar" ? "en" : "ar");
    };

    const menuItems = [
        { name: language === "ar" ? "الرئيسية" : "Home", href: "#hero" },
        { name: language === "ar" ? "عن الشركة" : "About", href: "#about" },
        { name: language === "ar" ? "خدماتنا" : "Services", href: "#services" },
        { name: language === "ar" ? "المعرض" : "Portfolio", href: "#portfolio" },
        { name: language === "ar" ? "العملاء" : "Clients", href: "#clients" },
        { name: language === "ar" ? "تواصل معنا" : "Contact", href: "#contact" },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-navy-950/80 border-b border-gold-500/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
                        <div className="relative h-24 w-auto">
                            <img
                                src="/RSN%20Logo.jpg"
                                alt="RSN Alarabiya Logo"
                                className="h-full w-auto object-contain"
                            />
                        </div>
                        <span className="text-2xl font-heading font-bold text-white group-hover:text-gold-500 transition-colors">
                            RSN <span className="text-gold-500">Alarabiya</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-gold-500 transition-colors text-sm uppercase tracking-wider font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 text-gold-500 hover:text-white transition-colors border border-gold-500/30 px-3 py-1.5 rounded-full text-xs font-bold"
                        >
                            <Globe size={14} />
                            <span>{language === "ar" ? "English" : "عربي"}</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gold-500 hover:text-white transition-colors"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-navy-950 border-t border-gold-500/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-gold-500 hover:bg-gold-500/5 rounded-md transition-colors text-center"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={toggleLanguage}
                                    className="flex items-center gap-2 text-gold-500 border border-gold-500/30 px-6 py-2 rounded-full font-bold"
                                >
                                    <Globe size={16} />
                                    <span>{language === "ar" ? "Switch to English" : "تغيير للعربية"}</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
