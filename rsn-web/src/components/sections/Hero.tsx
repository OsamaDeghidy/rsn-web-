"use client";

import { Canvas } from "@react-three/fiber";
import { HeroScene } from "@/components/3d/HeroScene";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getTableData } from "@/lib/supabase-service";

export function Hero() {
    const { language } = useLanguage();
    const [heroData, setHeroData] = useState<any>(null);

    useEffect(() => {
        const fetchHero = async () => {
            const data = await getTableData("hero");
            if (data && data.length > 0) {
                setHeroData(data[0]);
            }
        };
        fetchHero();
    }, []);

    const content = {
        since: heroData?.since || (language === "ar" ? "٢٠١٨" : "2018"),
        title: language === "ar" ? heroData?.title_ar || "جميع الأنظار عليك" : heroData?.title_en || "All Eyes On You",
        subtitle: language === "ar"
            ? heroData?.subtitle_ar || "الشركة الرائدة في خدمات إدارة الحشود وحلول الأمن في المملكة العربية السعودية."
            : heroData?.subtitle_en || "Leading Crowd Management & Security Services in Saudi Arabia.",
        cta1: language === "ar" ? heroData?.cta1_ar || "خدماتنا" : heroData?.cta1_en || "Our Services",
        cta2: language === "ar" ? heroData?.cta2_ar || "تواصل معنا" : heroData?.cta2_en || "Contact Us",
    };

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden bg-navy-950">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 2] }}>
                    <HeroScene />
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl pointer-events-auto"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-0.5 w-12 bg-gold-500 rounded-full" />
                        <span className="text-gold-500 font-bold tracking-widest uppercase">
                            {language === "ar" ? `منذ ${content.since}` : `SINCE ${content.since}`}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-tight">
                        {content.title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                        {content.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#services"
                            className="bg-gold-500 text-navy-950 px-8 py-3.5 rounded-full font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
                        >
                            {content.cta1}
                        </a>
                        <a
                            href="#contact"
                            className="border border-gold-500/30 text-white px-8 py-3.5 rounded-full font-bold hover:bg-gold-500/10 transition-colors backdrop-blur-sm"
                        >
                            {content.cta2}
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="w-6 h-10 border-2 border-gold-500/30 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 bg-gold-500 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
