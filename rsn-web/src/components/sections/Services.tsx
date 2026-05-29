"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ServiceCard } from "../ui/ServiceCard";
import {
    Users,
    Shield,
    Truck,
    ClipboardList,
    ClipboardCheck,
    HeartPulse,
    TrafficCone,
    Crown,
    UserCheck,
    Loader2,
    Compass,
    ShieldCheck,
    Scroll,
    Route,
    FileLock,
    Landmark,
    FileCheck,
    Car,
    ConciergeBell
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getTableData } from "@/lib/supabase-service";

interface DBServiceItem {
    id: number | string;
    title_ar?: string;
    title_en?: string;
    description_ar?: string;
    description_en?: string;
    icon?: string | null;
    iconName?: string | null;
    title?: string;
    description?: string;
    image_url?: string | null;
}

interface ServiceDisplayItem {
    id?: number | string;
    title_ar?: string;
    title_en?: string;
    description_ar?: string;
    description_en?: string;
    icon: LucideIcon;
    iconName?: string | null;
    title?: string;
    description?: string;
    image_url?: string | null;
}

const ICON_MAP: Record<string, LucideIcon> = {
    Users,
    Shield,
    Truck,
    ClipboardList,
    ClipboardCheck,
    HeartPulse,
    TrafficCone,
    Crown,
    UserCheck,
    Loader2,
    Compass,
    ShieldCheck,
    Scroll,
    Route,
    FileLock,
    Landmark,
    FileCheck,
    Car,
    ConciergeBell
};

export function Services() {
    const { language } = useLanguage();
    const [services, setServices] = useState<ServiceDisplayItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getTableData("services") as DBServiceItem[];
            if (data && data.length > 0) {
                // Map the icon string from Supabase to the Lucide icon component
                const mappedData: ServiceDisplayItem[] = data.map((item) => ({
                    ...item,
                    iconName: item.icon,
                    icon: ICON_MAP[item.icon as string] || Users
                }));
                setServices(mappedData);
            } else {
                // Fallback to static data if table is empty
                setServices([
                    {
                        title: language === "ar" ? "الاستقبال والتشريفات" : "Reception & Protocol",
                        description: language === "ar" ? "إدارة فن الاستقبال والبروتوكول باحترام واحترافية." : "Managing the art of reception and protocol with respect and professionalism.",
                        icon: ConciergeBell,
                        image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title: language === "ar" ? "إدارة التسجيل" : "Registration Management",
                        description: language === "ar" ? "تنظيم دخول الحشود وتأمين الوصول." : "Organizing crowd entry and securing access.",
                        icon: ClipboardList,
                        image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title: language === "ar" ? "الحراسات والحماية" : "Guards & Bodyguards",
                        description: language === "ar" ? "توفير حراس وحراس شخصيين لضمان الحماية في جميع الاتجاهات." : "Providing guards and bodyguards to ensure protection in all directions.",
                        icon: Shield,
                        image_url: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title: language === "ar" ? "إدارة المرور" : "Traffic Control",
                        description: language === "ar" ? "إدارة حركة السير من البداية إلى النهاية." : "Managing traffic flow from start to finish.",
                        icon: TrafficCone,
                        image_url: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title: language === "ar" ? "المنظمون الميدانيون" : "Field Ushers",
                        description: language === "ar" ? "أول من يستقبل وآخر من يودع." : "The first to welcome and the last to bid farewell.",
                        icon: Users,
                        image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title: language === "ar" ? "الأمن" : "Security",
                        description: language === "ar" ? "توفير مستوى عالٍ من الأمان لضمان الحماية الكاملة للفعالية." : "Providing a high level of security to ensure event protection.",
                        icon: UserCheck,
                        image_url: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title: language === "ar" ? "خدمات ركن السيارات" : "Valet Services",
                        description: language === "ar" ? "توفير سهولة الوصول والتحكم الكامل." : "Providing ease of access and full control.",
                        icon: Car,
                        image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title: language === "ar" ? "التفعيل ومناطق الجماهير" : "Activation & Fan Zones",
                        description: language === "ar" ? "تصميم وبناء وتنفيذ الفعاليات التفاعلية ومناطق المشجعين." : "Designing, building, and executing interactive events and fan zones.",
                        icon: Users,
                        image_url: "https://images.unsplash.com/photo-1508990302941-7a6973533f90?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title: language === "ar" ? "الخدمات اللوجستية للنقل" : "Transport Logistics",
                        description: language === "ar" ? "النقل بدقة من الوصول إلى المغادرة." : "Transport with precision from arrival to departure.",
                        icon: Car,
                        image_url: "https://images.unsplash.com/photo-1501700490688-6161b247f677?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title: language === "ar" ? "إنتاج وتنفيذ الفعاليات" : "Event Production",
                        description: language === "ar" ? "إدارة الإنتاج الشامل والتنفيذ الميداني من الإعداد إلى التفكيك." : "Comprehensive production management and field execution from setup to teardown.",
                        icon: ClipboardList,
                        image_url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        title: language === "ar" ? "الإنتاج المسرحي والتقني" : "Stage & Tech Production",
                        description: language === "ar" ? "إعداد المسرح والإشراف الفني لضمان سلاسة العرض." : "Stage setup and technical supervision to ensure show smoothness.",
                        icon: Loader2,
                        image_url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600"
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                title={(language === "ar" ? service.title_ar || service.title : service.title_en || service.title) || ""}
                                description={(language === "ar" ? service.description_ar || service.description : service.description_en || service.description) || ""}
                                icon={service.icon}
                                iconName={service.iconName}
                                index={index}
                                id={service.id || index + 1}
                                image_url={service.image_url}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
