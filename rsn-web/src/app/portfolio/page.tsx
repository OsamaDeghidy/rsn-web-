"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getTableData } from "@/lib/supabase-service";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PortfolioGalleryPage() {
    const { language } = useLanguage();
    const [projects, setProjects] = useState<any[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getTableData("portfolio");
            if (data && data.length > 0) {
                setProjects(data);
                setFilteredProjects(data);
            }
            setIsLoading(false);
        };
        fetchProjects();
    }, []);

    const categories = [
        { key: "all", label_en: "All Projects", label_ar: "جميع الأعمال" },
        { key: "Sports", label_en: "Sports", label_ar: "رياضة" },
        { key: "Music", label_en: "Music", label_ar: "موسيقى" },
        { key: "Entertainment", label_en: "Entertainment", label_ar: "ترفيه" },
        { key: "Culture", label_en: "Culture", label_ar: "ثقافة" },
        { key: "Equestrian", label_en: "Equestrian", label_ar: "فروسية" },
    ];

    const handleFilter = (categoryKey: string) => {
        setActiveCategory(categoryKey);
        if (categoryKey === "all") {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(
                projects.filter((project) => project.category_en === categoryKey)
            );
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-navy-950 flex justify-center items-center">
                <Loader2 className="animate-spin text-gold-500" size={48} />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-navy-950 text-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold-500 font-bold uppercase tracking-widest text-sm">
                        {language === "ar" ? "معرض أعمالنا" : "OUR PORTFOLIO"}
                    </span>
                    <h1 className="text-5xl md:text-6xl font-heading font-bold mt-4 mb-6">
                        {language === "ar" ? "جميع مشاريعنا" : "All Our Projects"}
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {language === "ar"
                            ? "استكشف مجموعة متنوعة من المشاريع والفعاليات الكبرى التي نفذناها بنجاح"
                            : "Explore our diverse collection of successfully executed major projects and events"}
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    {categories.map((category) => (
                        <button
                            key={category.key}
                            onClick={() => handleFilter(category.key)}
                            className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 ${activeCategory === category.key
                                    ? "bg-gold-500 text-navy-950 shadow-lg shadow-gold-500/30"
                                    : "bg-navy-900 text-gray-400 hover:bg-navy-800 hover:text-white border border-gold-500/10"
                                }`}
                        >
                            {language === "ar" ? category.label_ar : category.label_en}
                            {activeCategory === category.key && (
                                <span className="ml-2">
                                    ({category.key === "all" ? projects.length : projects.filter(p => p.category_en === category.key).length})
                                </span>
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Link
                                href={`/portfolio/${project.id}`}
                                className="group block relative h-[400px] rounded-2xl overflow-hidden"
                            >
                                {/* Background Image */}
                                {project.image_url ? (
                                    <img
                                        src={project.image_url}
                                        alt={language === "ar" ? project.name_ar : project.name_en}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900" />
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                    {/* Category Badge */}
                                    <div className="self-start">
                                        <span className="inline-block bg-gold-500/90 text-navy-950 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {language === "ar" ? project.category_ar : project.category_en}
                                        </span>
                                    </div>

                                    {/* Title and Description */}
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-gold-500 transition-colors">
                                            {language === "ar" ? project.name_ar : project.name_en}
                                        </h3>
                                        <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {language === "ar" ? project.description_ar : project.description_en}
                                        </p>
                                        <div className="flex items-center text-gold-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="mr-2">
                                                {language === "ar" ? "عرض التفاصيل" : "View Details"}
                                            </span>
                                            <ArrowRight size={16} className={language === "ar" ? "rotate-180" : ""} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-gray-400 text-xl">
                            {language === "ar"
                                ? "لا توجد أعمال في هذه الفئة"
                                : "No projects in this category"}
                        </p>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
