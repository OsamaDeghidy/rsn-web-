
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getTableData } from "@/lib/supabase-service";
import { Loader2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function ClientLogo({ client }: { client: any }) {
    const [hasError, setHasError] = useState(false);

    if (client.logo_url && !hasError) {
        return (
            <Image
                src={client.logo_url}
                alt={client.name}
                width={180}
                height={80}
                onError={() => setHasError(true)}
                className="h-16 md:h-20 w-auto object-contain max-w-[180px]"
            />
        );
    }

    return (
        <span className="text-xl md:text-2xl font-heading font-bold text-gold-500/40 hover:text-gold-500 transition-colors uppercase tracking-widest px-4">
            {client.name}
        </span>
    );
}

export function Portfolio() {
    const { language } = useLanguage();
    const [events, setEvents] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [eventIndex, setEventIndex] = useState(0);
    const [clientIndex, setClientIndex] = useState(0);

    useEffect(() => {
        const fetchPortfolio = async () => {
            const [eventsData, clientsData] = await Promise.all([
                getTableData("portfolio"),
                getTableData("clients")
            ]);

            if (eventsData && eventsData.length > 0) {
                setEvents(eventsData);
            } else {
                setEvents([
                    {
                        id: 1,
                        name: "LIV Golf Riyadh 2025",
                        category: "Sports",
                        description: "Global golf tournament organization and crowd management.",
                        name_ar: "ليف جولف الرياض 2025",
                        category_ar: "فعاليات رياضية",
                        description_ar: "تنظيم بطولة الجولف العالمية وإدارة الحشود."
                    },
                    {
                        id: 2,
                        name: "AlUla SC Fan Zones",
                        category: "Sports",
                        description: "Fan zone activation and management for AlUla Sports Club.",
                        name_ar: "مناطق المشجعين لنادي العلا",
                        category_ar: "فعاليات رياضية",
                        description_ar: "تفعيل وإدارة مناطق المشجعين لنادي العلا."
                    },
                    {
                        id: 3,
                        name: "MDLBEAST",
                        category: "Entertainment",
                        description: "Crowd management for major music festivals.",
                        name_ar: "مدل بيست",
                        category_ar: "ترفيه وموسيقى",
                        description_ar: "إدارة الحشود للمهرجانات الموسيقية الكبرى."
                    },
                    {
                        id: 4,
                        name: "Saudi Cup",
                        category: "Equestrian",
                        description: "Premium security and protocol services for the world's richest race.",
                        name_ar: "كأس السعودية",
                        category_ar: "فروسية",
                        description_ar: "خدمات الأمن والبروتوكول لأغلى سباق في العالم."
                    },
                    {
                        id: 5,
                        name: "Red Sea Film Fest",
                        category: "Culture",
                        description: "Red carpet security and crowd control.",
                        name_ar: "مهرجان البحر الأحمر السينمائي",
                        category_ar: "ثقافة وفنون",
                        description_ar: "أمن السجادة الحمراء وإدارة الحشود."
                    },
                    {
                        id: 6,
                        name: "Cityscape Global",
                        category: "Exhibition",
                        description: "Managing massive crowds for the global real estate event.",
                        name_ar: "سيتي سكيب الرقمي",
                        category_ar: "معارض",
                        description_ar: "إدارة الحشود الضخمة للمعرض العقاري العالمي."
                    },
                ]);
            }

            if (clientsData && clientsData.length > 0) {
                setClients(clientsData);
            } else {
                setClients([
                    { name: "Ministry of Sports", logo_url: null },
                    { name: "Ministry of Culture", logo_url: null },
                    { name: "Ministry of Tourism", logo_url: null },
                    { name: "Ministry of Justice", logo_url: null },
                    { name: "Ministry of Health", logo_url: null },
                    { name: "PIF", logo_url: null },
                    { name: "Aramco", logo_url: null },
                    { name: "Riyadh Bank", logo_url: null },
                    { name: "NEOM", logo_url: null },
                    { name: "Red Sea Global", logo_url: null },
                    { name: "Royal Commission for Riyadh City", logo_url: null },
                    { name: "KAEC", logo_url: null },
                    { name: "Qiddiya", logo_url: null },
                    { name: "GEA", logo_url: null },
                    { name: "AlUla SC", logo_url: null }
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

            {/* Events Slider with Controls */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="flex items-center justify-between gap-8">
                    <button
                        onClick={() => setEventIndex(prev => Math.max(0, prev - 1))}
                        disabled={eventIndex === 0}
                        className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-navy-950 transition-all disabled:opacity-20"
                    >
                        <ChevronRight size={24} className={language === "ar" ? "" : "rotate-180"} />
                    </button>

                    <div className="flex-1 overflow-hidden">
                        <motion.div
                            animate={{ x: language === "ar" ? `${eventIndex * 100}%` : `-${eventIndex * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex"
                        >
                            {events.map((event, index) => (
                                <div key={index} className="w-full shrink-0 px-4">
                                    <Link
                                        href={`/portfolio/${event.id}`}
                                        className="relative block aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent z-10" />
                                        {event.image_url ? (
                                            <Image
                                                src={event.image_url}
                                                alt={language === "ar" ? event.name_ar || event.name : event.name_en || event.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-navy-900" />
                                        )}
                                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-20">
                                            <span className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-2 block">
                                                {language === "ar" ? event.category_ar || event.category : event.category_en || event.category}
                                            </span>
                                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-gold-500 transition-colors">
                                                {language === "ar" ? event.name_ar || event.name : event.name_en || event.name}
                                            </h3>
                                            <p className="text-gray-300 max-w-2xl line-clamp-2">
                                                {language === "ar" ? event.description_ar : event.description_en}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <button
                        onClick={() => setEventIndex(prev => Math.min(events.length - 1, prev + 1))}
                        disabled={eventIndex === events.length - 1}
                        className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-navy-950 transition-all disabled:opacity-20"
                    >
                        <ChevronLeft size={24} className={language === "ar" ? "" : "rotate-180"} />
                    </button>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {events.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setEventIndex(i)}
                            className={`h-1.5 rounded-full transition-all ${eventIndex === i ? "w-8 bg-gold-500" : "w-2 bg-gold-500/20"}`}
                        />
                    ))}
                </div>
            </div>

            {/* View More Button */}
            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-24">
                <Link
                    href="/portfolio"
                    className="group relative inline-flex items-center gap-3 bg-gold-500 text-navy-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-105"
                >
                    <span>{language === "ar" ? "عرض بعض الأعمال" : "View All Projects"}</span>
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
                    href="/Copy%20of%20RSN%20COMPANY%20PROFILE%202026.pdf"
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
            <div id="client" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                <div className="relative">
                    <div className="overflow-hidden px-12">
                        <motion.div
                            animate={{ x: language === "ar" ? `${clientIndex * (100 / 3)}%` : `-${clientIndex * (100 / 3)}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex items-center"
                        >
                            {clients.map((client: any, index) => (
                                <div key={index} className="w-1/2 md:w-1/3 lg:w-1/5 shrink-0 px-8 flex justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
                                    <ClientLogo client={client} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <button
                        onClick={() => setClientIndex(prev => Math.max(0, prev - 1))}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-900 border border-gold-500/20 flex items-center justify-center text-gold-500 z-20"
                    >
                        <ChevronRight size={20} className={language === "ar" ? "" : "rotate-180"} />
                    </button>
                    <button
                        onClick={() => setClientIndex(prev => Math.min(clients.length - 3, prev + 1))}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-900 border border-gold-500/20 flex items-center justify-center text-gold-500 z-20"
                    >
                        <ChevronLeft size={20} className={language === "ar" ? "" : "rotate-180"} />
                    </button>
                </div>
            </div>
        </section>
    );
}
