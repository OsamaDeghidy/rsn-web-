"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPortfolioItem } from "@/lib/supabase-service";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Calendar, MapPin, Tag, Play } from "lucide-react";
import Link from "next/link";

export default function PortfolioDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { language } = useLanguage();
    const [project, setProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            const data = await getPortfolioItem(id as string);
            if (data) {
                setProject(data);
            }
            setIsLoading(false);
        };
        fetchProject();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-navy-950 flex justify-center items-center">
                <Loader2 className="animate-spin text-gold-500" size={48} />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center text-white">
                <h1 className="text-2xl mb-4">Project not found</h1>
                <Link href="/#portfolio" className="text-gold-500 hover:underline">
                    Back to Portfolio
                </Link>
            </div>
        );
    }

    const name = language === "ar" ? project.name_ar : project.name_en;
    const category = language === "ar" ? project.category_ar : project.category_en;
    const shortDesc = language === "ar" ? project.description_ar : project.description_en;
    const longDesc = language === "ar" ? project.long_description_ar : project.long_description_en;

    return (
        <main className="min-h-screen bg-navy-950 text-white pb-24">
            {/* Project Hero */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                {project.video_url ? (
                    <video
                        src={project.video_url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <img
                        src={project.image_url}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <button
                            onClick={() => router.back()}
                            className="flex items-center text-gold-500 mb-8 hover:gap-2 transition-all group"
                        >
                            <ArrowLeft size={20} className={language === "ar" ? "rotate-180" : ""} />
                            <span className="ml-2 group-hover:underline">
                                {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
                            </span>
                        </button>

                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-gold-500 text-navy-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {category}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
                            {name}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                            {shortDesc}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-8 text-gold-500">
                                {language === "ar" ? "عن المشروع" : "About the Project"}
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 text-lg leading-loose space-y-6">
                                {longDesc ? (
                                    longDesc.split('\n').map((para: string, i: number) => (
                                        <p key={i}>{para}</p>
                                    ))
                                ) : (
                                    <p>{shortDesc}</p>
                                )}
                            </div>
                        </motion.div>

                        {/* Gallery */}
                        {project.gallery_urls && project.gallery_urls.length > 0 && (
                            <div className="mt-24">
                                <h3 className="text-3xl font-bold mb-12">
                                    {language === "ar" ? "معرض الصور" : "Project Gallery"}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {project.gallery_urls.map((url: string, index: number) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="rounded-xl overflow-hidden aspect-video bg-navy-900 group"
                                        >
                                            <img
                                                src={url}
                                                alt={`${name} gallery ${index}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Info */}
                    <aside className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-navy-900/50 border border-gold-500/10 p-8 rounded-2xl sticky top-8"
                        >
                            <h4 className="text-xl font-bold mb-8 border-b border-gold-500/10 pb-4">
                                {language === "ar" ? "معلومات المشروع" : "Project Information"}
                            </h4>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <Tag className="text-gold-500 shrink-0" size={20} />
                                    <div>
                                        <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
                                            {language === "ar" ? "الفئة" : "Category"}
                                        </span>
                                        <span className="font-bold">{category}</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <MapPin className="text-gold-500 shrink-0" size={20} />
                                    <div>
                                        <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
                                            {language === "ar" ? "الموقع" : "Location"}
                                        </span>
                                        <span className="font-bold">
                                            {language === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia"}
                                        </span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Calendar className="text-gold-500 shrink-0" size={20} />
                                    <div>
                                        <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
                                            {language === "ar" ? "السنة" : "Year"}
                                        </span>
                                        <span className="font-bold">2023 - 2024</span>
                                    </div>
                                </li>
                            </ul>

                            <button className="w-full mt-12 bg-gold-500 text-navy-950 font-bold py-4 rounded-xl hover:bg-gold-400 transition-colors">
                                {language === "ar" ? "طلب خدمة مشابهة" : "Request Similar Service"}
                            </button>
                        </motion.div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
