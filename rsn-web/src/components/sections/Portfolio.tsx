"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getTableData } from "@/lib/supabase-service";
import { Loader2 } from "lucide-react";
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

            {/* Clients Slider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h3 className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                        {language === "ar" ? "نفتخر بثقة كبار العملاء" : "PROUD TO BE TRUSTED BY"}
                    </h3>
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
