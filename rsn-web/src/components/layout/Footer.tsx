"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Shield, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    const { language } = useLanguage();

    return (
        <footer className="bg-navy-950 border-t border-gold-500/10 pt-16 pb-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
                            <div className="bg-gold-500 text-navy-950 p-1.5 rounded-lg">
                                <Shield size={24} strokeWidth={2.5} />
                            </div>
                            <span className="text-2xl font-heading font-bold text-white">
                                RSN <span className="text-gold-500">Alarabiya</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {language === "ar"
                                ? "الشركة الرائدة في مجال إدارة الحشود والخدمات الأمنية في المملكة العربية السعودية. نلتزم بأعلى معايير السلامة والاحترافية."
                                : "The leading company in crowd management and security services in Saudi Arabia. Committed to the highest standards of safety and professionalism."}
                        </p>
                        <div className="flex space-x-4 rtl:space-x-reverse">
                            <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">{language === "ar" ? "روابط سريعة" : "Quick Links"}</h3>
                        <ul className="space-y-3">
                            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-gold-500 transition-colors text-sm">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">{language === "ar" ? "خدماتنا" : "Our Services"}</h3>
                        <ul className="space-y-3">
                            {['Crowd Management', 'Security Services', 'Logistics', 'Protocol'].map((item) => (
                                <li key={item}>
                                    <a href="#services" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">{language === "ar" ? "تواصل معنا" : "Contact Us"}</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-gray-400">
                                <MapPin className="text-gold-500 shrink-0" size={18} />
                                <span>
                                    {language === "ar" ? "حي الياسمين، الرياض، المملكة العربية السعودية" : "Alyasmin District, Riyadh, Kingdom of Saudi Arabia"}
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <Phone className="text-gold-500 shrink-0" size={18} />
                                <span dir="ltr">+966 55 062 2197</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <Mail className="text-gold-500 shrink-0" size={18} />
                                <span>Ahmed@rsnalarabiya.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        © 2024 RSN Alarabiya. {language === "ar" ? "جميع الحقوق محفوظة." : "All Rights Reserved."}
                    </p>
                    <p className="text-gray-600 text-xs">
                        Designed with <span className="text-gold-500">Luxury</span> standard
                    </p>
                </div>
            </div>
        </footer>
    );
}
