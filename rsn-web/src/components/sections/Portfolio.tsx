"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getTableData } from "@/lib/supabase-service";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

function ClientLogo({ client }: { client: any }) {
    const [hasError, setHasError] = useState(false);

    if (client.logo_url && !hasError) {
        return (
            <img
                src={client.logo_url}
                alt={client.name}
                onError={() => setHasError(true)}
                className="h-16 md:h-20 w-auto object-contain max-w-[180px]"
            />
        );
    }

    return (
        <span className="text-2xl md:text-3xl font-heading font-bold text-navy-800">
            {client.name}
        </span>
    );
}

export function Portfolio() {
    const { language } = useLanguage();
    const [events, setEvents] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            const eventsData = await getTableData("portfolio");
            const clientsData = await getTableData("clients");

            if (eventsData && eventsData.length > 0) {
                setEvents(eventsData);
            } else {
                setEvents([
                    { id: 1, name: "LIV Golf", category: "Sports" },
                    { id: 2, name: "Riyadh Jazz Fest", category: "Music" },
                    { id: 3, name: "Formula 1", category: "Sports" },
                    { id: 4, name: "MDLBEAST", category: "Entertainment" },
                    { id: 5, name: "Saudi Cup", category: "Equestrian" },
                    { id: 6, name: "Red Sea Film Fest", category: "Culture" },
                ]);
            }

            if (clientsData && clientsData.length > 0) {
                setClients(clientsData);
            } else {
                setClients([
                    { name: "Ministry of Sports" }, { name: "Aramco" }, { name: "PIF" }, { name: "Riyadh Bank" }, { name: "Newcastle United" },
                    { name: "Ministry of Culture" }, { name: "GEA" }, { name: "Royal Commission" }, { name: "NEOM" }, { name: "Red Sea Global" }
                ]);
            }
            setIsLoading(false);
        };

        fetchPortfolio();
    }, []);

    if (isLoading) {
        return (
            <div className="py-24 bg-navy-950 flex justify-center items-center">
                <Loader2 className="animate-spin text-gold-500" size={48} />
            </div>
        );
    }

    return (
        <section id="portfolio" className="py-24 bg-navy-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="text-gold-500 font-bold uppercase tracking-widest text-sm">
                            {language === "ar" ? "أعمالنا" : "OUR PORTFOLIO"}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4">
                            {language === "ar" ? "نصنع لحظات لا تُنسى" : "Creating Unforgettable Moments"}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Events Slider */}
            <div className="flex space-x-8 overflow-hidden group mb-24">
                <motion.div
                    animate={{
                        x: [0, -100 * events.length],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                    className="flex space-x-8 whitespace-nowrap"
                >
                    {[...events, ...events].map((event, index) => (
                        <Link
                            key={index}
                            href={`/portfolio/${event.id}`}
                            className="relative w-[400px] h-[500px] rounded-2xl overflow-hidden group shrink-0 block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent z-10" />

                            {/* Background Image from Supabase or Placeholder */}
                            {event.image_url ? (
                                <img
                                    src={event.image_url}
                                    alt={language === "ar" ? event.name_ar || event.name : event.name_en || event.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-navy-800 opacity-50 group-hover:scale-110 transition-transform duration-700" />
                            )}

                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                <span className="text-gold-500 text-xs font-bold uppercase tracking-wider mb-2 block">
                                    {language === "ar" ? event.category_ar || event.category : event.category_en || event.category}
                                </span>
                                <h3 className="text-2xl font-bold text-white group-hover:text-gold-500 transition-colors mb-2">
                                    {language === "ar" ? event.name_ar || event.name : event.name_en || event.name}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-normal">
                                    {language === "ar" ? event.description_ar : event.description_en}
                                </p>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>

            {/* View More Button */}
            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-24">
                <Link
                    href="/portfolio"
                    className="group relative inline-flex items-center gap-3 bg-gold-500 text-navy-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-105"
                >
                    <span>{language === "ar" ? "عرض جميع الأعمال" : "View All Projects"}</span>
                    <svg
                        className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${language === "ar" ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>

                <a
                    href="/RSN%20company%20profil.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 bg-navy-800 text-white border border-gold-500/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-navy-700 hover:border-gold-500 transition-all duration-300 shadow-lg hover:shadow-gold-500/20 hover:scale-105"
                >
                    <span>{language === "ar" ? "تحميل الملف التعريفي" : "Download Profile"}</span>
                    <svg
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </a>
            </div>

            {/* Clients Slider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h3 className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-2">
                            {language === "ar" ? "عملائنا" : "OUR CLIENTS"}
                        </h3>
                        <h2 className="text-3xl font-heading font-bold text-white">
                            {language === "ar" ? "نفتخر بثقة كبار العملاء" : "Proud to be Trusted by"}
                        </h2>
                    </div>
                    <Link
                        href="/clients"
                        className="text-gray-400 hover:text-gold-500 transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                    >
                        {language === "ar" ? "عرض جميع العملاء" : "View All Clients"}
                        <ArrowRight size={16} className={language === "ar" ? "rotate-180" : ""} />
                    </Link>
                </div>

                <div className="flex overflow-hidden relative group">
                    <motion.div
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            duration: 40,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                        className="flex items-center gap-24 whitespace-nowrap py-10"
                    >
                        {[...clients, ...clients].map((client: any, index) => (
                            <div key={index} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
                                <ClientLogo client={client} />
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradient Overlays for smooth fading */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-navy-950 to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-navy-950 to-transparent z-10" />
                </div>
            </div>
        </section>
    );
}
