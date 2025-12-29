"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Shield, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { getSiteSettings } from "@/lib/supabase-service";

export function Footer() {
    const { language } = useLanguage();
    const [settings, setSettings] = useState<any>({
        phone: '055 062 2197',
        email: 'info@rsnalarabiya.com',
        address_ar: 'حي الياسمين، الرياض، المملكة العربية السعودية',
        address_en: 'Alyasmin District, Riyadh, Kingdom of Saudi Arabia',
        maps_url: 'https://maps.app.goo.gl/pKF93DTgUKrvA3x38?g_st=ic',
        twitter_url: 'https://x.com/rsnalarabiya?s=21&t=pOWXrXMoBe0dbSwz_3LJaw',
        instagram_url: 'https://www.instagram.com/rsnalarabiya?igsh=cW5lZ2h1c2E1ZGl5',
        linkedin_url: 'https://www.linkedin.com/in/rsn-alarabiya-1b600230b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
    });

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await getSiteSettings();
            if (Object.keys(data).length > 0) {
                setSettings(data);
            }
        };
        fetchSettings();
    }, []);

    const socialLinks = [
        { icon: Twitter, href: settings.twitter_url || "#", key: "twitter" },
        { icon: Instagram, href: settings.instagram_url || "#", key: "instagram" },
        { icon: Linkedin, href: settings.linkedin_url || "#", key: "linkedin" },
    ];

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
                            {socialLinks.map((social) => (
                                <a
                                    key={social.key}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gold-500 transition-colors"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
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
                                <a
                                    href={settings.maps_url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    {language === "ar"
                                        ? settings.address_ar || "حي الياسمين، الرياض، المملكة العربية السعودية"
                                        : settings.address_en || "Alyasmin District, Riyadh, Kingdom of Saudi Arabia"}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <Phone className="text-gold-500 shrink-0" size={18} />
                                <a href={`tel:${settings.phone}`} className="hover:text-gold-500 transition-colors" dir="ltr">
                                    {settings.phone || "+966 55 062 2197"}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <Mail className="text-gold-500 shrink-0" size={18} />
                                <a href={`mailto:${settings.email}`} className="hover:text-gold-500 transition-colors">
                                    {settings.email || "info@rsnalarabiya.com"}
                                </a>
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
