"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { getTableData } from "@/lib/supabase-service";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface DBEquipmentItem {
    id?: number | string;
    title_ar?: string;
    title_en?: string;
    description_ar?: string;
    description_en?: string;
    image_url?: string | null;
}

interface EquipmentCardProps {
    title: string;
    imageUrl: string;
    index: number;
}

function EquipmentCard({ title, imageUrl, index }: EquipmentCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="w-full group"
        >
            <div className="flex flex-col items-center w-full">
                {/* Image on top, sharp corners, gold border */}
                <div className="relative w-full aspect-square overflow-hidden border border-gold-500/80 bg-navy-950 shadow-lg group-hover:border-gold-400 group-hover:shadow-[0_0_20px_rgba(197,160,101,0.25)] transition-all duration-500 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
                
                {/* Title below, centered */}
                <h3 className="text-lg md:text-xl font-bold text-white text-center group-hover:text-gold-500 transition-colors duration-300 px-2">
                    {title}
                </h3>
            </div>
        </motion.div>
    );
}

export function Equipment() {
    const { language } = useLanguage();
    const [equipment, setEquipment] = useState<DBEquipmentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEquipment = async () => {
            const data = await getTableData("equipment") as DBEquipmentItem[];
            if (data && data.length > 0) {
                setEquipment(data);
            } else {
                // Fallback static data if Supabase table is empty or query fails
                setEquipment([
                    {
                        title_ar: "حواجز تشريفات",
                        title_en: "VIP Barriers",
                        image_url: "https://images.unsplash.com/photo-1563841930-56645c55731b?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title_ar: "حواجز متحركة",
                        title_en: "Mobile Barriers",
                        image_url: "https://images.unsplash.com/photo-1596701062351-df1efb3798ad?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title_ar: "حواجز CCB",
                        title_en: "CCB Barriers",
                        image_url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title_ar: "أقماع",
                        title_en: "Traffic Cones",
                        image_url: "https://images.unsplash.com/photo-1578313939593-dfd92634d0b2?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title_ar: "أجهزة تواصل لاسلكي قصيرة المدى",
                        title_en: "Short-Range Walkie-Talkies",
                        image_url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title_ar: "أجهزة تواصل لاسلكي بعيدة المدى",
                        title_en: "Long-Range Walkie-Talkies",
                        image_url: "https://images.unsplash.com/photo-1533035353720-f1c6a77cd8ae?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title_ar: "مجسات تفتيش",
                        title_en: "Handheld Metal Detectors",
                        image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title_ar: "بوابات أمنية",
                        title_en: "Security Gates",
                        image_url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title_ar: "إشارات ضوئية",
                        title_en: "Light Wands",
                        image_url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600"
                    }
                ]);
            }
            setIsLoading(false);
        };

        fetchEquipment();
    }, [language]);

    return (
        <section id="equipment" className="py-24 bg-navy-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-gold-500 font-bold uppercase tracking-widest text-sm">
                        {language === "ar" ? "المعدات والتجهيزات" : "EQUIPMENT & GEAR"}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4">
                        {language === "ar" ? "تجهيزات أمنية ولوجستية متكاملة لنجاح فعاليتك" : "Integrated Security & Logistics Equipment For Your Event"}
                    </h2>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-gold-500" size={48} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
                        {equipment.map((item, index) => (
                            <EquipmentCard
                                key={item.id || index}
                                title={(language === "ar" ? item.title_ar : item.title_en) || ""}
                                imageUrl={item.image_url || "https://images.unsplash.com/photo-1578313939593-dfd92634d0b2?auto=format&fit=crop&q=80&w=600"}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
