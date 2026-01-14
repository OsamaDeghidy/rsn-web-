"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getTableData } from "@/lib/supabase-service";
import { Users, Shield, Truck, ClipboardList, HeartPulse, TrafficCone, Crown, UserCheck, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, any> = {
    Users, Shield, Truck, ClipboardList, HeartPulse, TrafficCone, Crown, UserCheck
};

export default function ServiceDetailPage() {
    const { language } = useLanguage();
    const params = useParams();
    const serviceId = params?.id;

    const [service, setService] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            if (!serviceId) return;

            // Fetch all services and find the matching one
            // Ideally we would fetch single by ID but for now this works with existing service utils
            const data = await getTableData("services");
            if (data && data.length > 0) {
                // Find service by ID (assuming ID is number or string and matches)
                const foundService = data.find((s: any) => s.id.toString() === serviceId.toString());

                if (foundService) {
                    setService({
                        ...foundService,
                        icon: ICON_MAP[foundService.icon as string] || Users
                    });
                }
            }
            setIsLoading(false);
        };

        fetchService();
    }, [serviceId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-navy-950 flex justify-center items-center">
                <Loader2 className="animate-spin text-gold-500" size={48} />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center text-white">
                <h1 className="text-3xl font-bold mb-4">{language === "ar" ? "الخدمة غير موجودة" : "Service Not Found"}</h1>
                <Link href="/#services" className="text-gold-500 hover:underline">
                    {language === "ar" ? "العودة للخدمات" : "Back to Services"}
                </Link>
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <main className="min-h-screen bg-navy-950 text-white pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/#services"
                    className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors mb-12 font-bold"
                >
                    <ArrowRight size={20} className={language === "ar" ? "" : "rotate-180"} />
                    <span>{language === "ar" ? "العودة للخدمات" : "Back to Services"}</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: language === "ar" ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center text-navy-950 shadow-lg shadow-gold-500/20">
                                <Icon size={32} />
                            </div>
                            <span className="text-gold-500 font-bold uppercase tracking-widest text-sm">
                                {language === "ar" ? "تفاصيل الخدمة" : "SERVICE DETAILS"}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 leading-tight">
                            {language === "ar" ? service.title_ar || service.title : service.title_en || service.title}
                        </h1>

                        <div className="prose prose-lg prose-invert text-gray-300">
                            <p className="text-xl leading-relaxed mb-8 text-white font-medium border-l-4 border-gold-500 pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-6">
                                {language === "ar" ? service.description_ar || service.description : service.description_en || service.description}
                            </p>

                            {/* Detailed Description Placeholder - using the same desc if long desc is missing */}
                            <div className="space-y-6 text-gray-400 leading-relaxed">
                                {language === "ar"
                                    ? (service.long_description_ar || (
                                        <p>نحن نقدم خدمات {service.title_ar || service.title} بأعلى معايير الجودة والاحترافية. فريقنا المتخصص يضمن تنفيذ كل جانب من جوانب هذه الخدمة بدقة فائقة لتلبية احتياجاتك وتجاوز توقعاتك.</p>
                                    ))
                                    : (service.long_description_en || (
                                        <p>We provide {service.title_en || service.title} services with the highest standards of quality and professionalism. Our specialized team ensures that every aspect of this service is executed with precision to meet your needs and exceed your expectations.</p>
                                    ))
                                }
                            </div>
                        </div>
                    </motion.div>

                    {/* Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-gold-500/10 bg-navy-900 shadow-2xl relative group">

                            {service.image_url ? (
                                <img
                                    src={service.image_url}
                                    alt={language === "ar" ? service.title_ar : service.title_en}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gold-500/20">
                                    <Icon size={120} strokeWidth={1} />
                                </div>
                            )}

                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl" />
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
