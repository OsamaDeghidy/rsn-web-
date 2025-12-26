"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ServiceCard } from "../ui/ServiceCard";
import { Users, Shield, Truck, ClipboardList, HeartPulse, TrafficCone, Crown, UserCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getTableData } from "@/lib/supabase-service";

const ICON_MAP: Record<string, any> = {
    Users, Shield, Truck, ClipboardList, HeartPulse, TrafficCone, Crown, UserCheck
};

export function Services() {
    const { language } = useLanguage();
    const [services, setServices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getTableData("services");
            if (data && data.length > 0) {
                // Map the icon string from Supabase to the Lucide icon component
                const mappedData = data.map(item => ({
                    ...item,
                    icon: ICON_MAP[item.icon as string] || Users
                }));
                setServices(mappedData);
            } else {
                // Fallback to static data if table is empty
                setServices([
                    {
                        title: language === "ar" ? "إدارة الحشود" : "Crowd Management",
                        description: language === "ar" ? "تنظيم يصنع السلاسة ويضمن السلامة." : "Organization that creates smoothness and ensures safety.",
                        icon: Users
                    },
                    {
                        title: language === "ar" ? "الخدمات الأمنية" : "Security Services",
                        description: language === "ar" ? "حماية صامتة ومحترفة في كل اتجاه." : "Silent and professional protection in every direction.",
                        icon: Shield
                    },
                    {
                        title: language === "ar" ? "لوجستيات النقل" : "Logistics & Transport",
                        description: language === "ar" ? "نتحرك بدقة لضمان انسيابية الفعالية." : "We move with precision to ensure event smoothness.",
                        icon: Truck
                    },
                    {
                        title: language === "ar" ? "إدارة التسجيل" : "Registration Management",
                        description: language === "ar" ? "حشود منظمة ووصول آمن." : "Organized crowds and secure access.",
                        icon: ClipboardList
                    },
                    {
                        title: language === "ar" ? "الصحة والسلامة" : "Health & Safety",
                        description: language === "ar" ? "ضمان أمن الموقع وسلامة كل فرد." : "Ensuring site security and everyone's safety.",
                        icon: HeartPulse
                    },
                    {
                        title: language === "ar" ? "مراقبة المرور" : "Traffic Control",
                        description: language === "ar" ? "مسارات واضحة وحركة سهلة." : "Clear paths and easy movement.",
                        icon: TrafficCone
                    },
                    {
                        title: language === "ar" ? "الاستقبال والبروتوكول" : "Protocol & Reception",
                        description: language === "ar" ? "تجربة تدار بإتقان ومرحب بها باحترام." : "An experience managed with perfection and welcomed with respect.",
                        icon: Crown
                    },
                    {
                        title: language === "ar" ? "الإرشاد الميداني" : "Field Guidance",
                        description: language === "ar" ? "أول من يستقبل وآخر من يغادر." : "First to welcome and last to leave.",
                        icon: UserCheck
                    }
                ]);
            }
            setIsLoading(false);
        };

        fetchServices();
    }, [language]);

    return (
        <section id="services" className="py-24 bg-navy-900 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-gold-500 font-bold uppercase tracking-widest text-sm">
                        {language === "ar" ? "خدماتنا" : "OUR SERVICES"}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4">
                        {language === "ar" ? "حلول متكاملة تضمن نجاح فعاليتك" : "Integrated Solutions to Ensure Your Event Success"}
                    </h2>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-gold-500" size={48} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
                        {services.map((service, index) => (
                            <div key={index} className="h-[300px]">
                                <ServiceCard
                                    title={language === "ar" ? service.title_ar || service.title : service.title_en || service.title}
                                    description={language === "ar" ? service.description_ar || service.description : service.description_en || service.description}
                                    icon={service.icon}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
