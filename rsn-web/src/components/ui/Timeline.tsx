"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export function Timeline() {
    const { language } = useLanguage();

    const history = [
        {
            year: "2018",
            title: language === "ar" ? "التأسيس" : "Foundation",
            description: language === "ar"
                ? "تأسيس مؤسسة أحمد علي مرعي القرني لتنظيم المعارض والمؤتمرات"
                : "Establishment of Ahmed Ali Marai Al-Qarni Foundation for Exhibitions and Conferences"
        },
        {
            year: "2019",
            title: language === "ar" ? "إعادة التأسيس" : "Re-establishment",
            description: language === "ar"
                ? "إعادة الافتتاح باسم مؤسسة رسن العربية"
                : "Re-opening as RSN Alarabiya Foundation"
        },
        {
            year: "2024",
            title: language === "ar" ? "التحول" : "Transformation",
            description: language === "ar"
                ? "التحول إلى شركة رسن العربية المحدودة"
                : "Transformation into RSN Alarabiya Company"
        }
    ];

    return (
        <div className="py-12">
            <div className="relative">
                {/* Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gold-500/20 -translate-y-1/2 hidden md:block" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {history.map((item, index) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative p-6 bg-navy-900/50 backdrop-blur-sm border border-gold-500/10 rounded-xl group hover:border-gold-500/30 transition-colors"
                        >
                            {/* Dot */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-navy-950 border-2 border-gold-500 hidden md:block group-hover:bg-gold-500 transition-colors" />

                            <span className="text-4xl font-heading font-bold text-gold-500/10 absolute top-4 right-4 group-hover:text-gold-500/20 transition-colors">
                                {item.year}
                            </span>

                            <div className="relative z-10 pt-4">
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
