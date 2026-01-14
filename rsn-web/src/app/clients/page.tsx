"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getTableData } from "@/lib/supabase-service";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ClientsPage() {
    const { language } = useLanguage();
    const [clients, setClients] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            const data = await getTableData("clients");
            if (data && data.length > 0) {
                setClients(data);
            }
            setIsLoading(false);
        };
        fetchClients();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-navy-950 flex justify-center items-center">
                <Loader2 className="animate-spin text-gold-500" size={48} />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-navy-950 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold-500 font-bold uppercase tracking-widest text-sm">
                        {language === "ar" ? "شركاء النجاح" : "OUR CLIENTS"}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">
                        {language === "ar" ? "نعتز بثقتهم" : "Proud of Their Trust"}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {language === "ar"
                            ? "نفخر في رسن العربية بالعمل مع نخبة من الجهات الحكومية والشركات الكبرى"
                            : "At RSN Alarabiya, we are proud to work with elite government entities and major corporations"}
                    </p>
                </motion.div>

                {/* Clients Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {clients.map((client, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="bg-navy-900/50 border border-gold-500/10 rounded-xl p-8 flex items-center justify-center hover:bg-navy-800 transition-colors group aspect-square"
                        >
                            {client.logo_url ? (
                                <img
                                    src={client.logo_url}
                                    alt={client.name}
                                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                                />
                            ) : (
                                <span className="text-xl font-bold text-gray-400 group-hover:text-white transition-colors text-center">
                                    {client.name}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
