"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Timeline } from "../ui/Timeline";
import { Quote, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getTableData } from "@/lib/supabase-service";

export function About() {
    const { language } = useLanguage();
    const [aboutData, setAboutData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            const data = await getTableData("about");
            if (data && data.length > 0) {
                setAboutData(data[0]);
            }
            setIsLoading(false);
        };
        fetchAbout();
    }, []);

    const content = {
        storyTitle: language === "ar" ? aboutData?.story_title_ar || "نبذة عن الشركة" : aboutData?.story_title_en || "ABOUT US",
        title: language === "ar" ? aboutData?.title_ar || "رسن العربية" : aboutData?.title_en || "RSN Alarabiya",
        description: language === "ar"
            ? aboutData?.description_ar || "شركة سعودية تأسست عام 2018، متخصصة في إدارة الحشود، العمليات التشغيلية للفعاليات، وخدمات التنفيذ الشاملة من البداية للنهاية. قدمت الشركة حلولاً عالية الجودة وممتثلة للمعايير للجهات الحكومية والمنظمات الرائدة في المملكة. تعتمد الشركة على فريق مدرب ومحترف ميدانياً لضمان فعاليات آمنة وسلسة وذات كفاءة عالية."
            : aboutData?.description_en || "A Saudi company established in 2018, specializing in crowd management, event operations, and end-to-end execution services. The company has delivered high-quality, compliant solutions to government entities and leading organizations in the Kingdom, relying on a trained and professional field team to ensure safe, seamless, and highly efficient events.",
        ceoMessageTitle: language === "ar" ? aboutData?.ceo_msg_title_ar || "كلمة الرئيس التنفيذي" : aboutData?.ceo_msg_title_en || "Message from the CEO",
        ceoMessage: language === "ar"
            ? aboutData?.ceo_msg_ar || "\"تؤكد الشركة أن قوتها تكمن في العمل مع كوادر سعودية مؤهلة، وتقديم المشاريع بتميز ودقة واحترافية.\""
            : aboutData?.ceo_msg_en || "\"The company confirms that its strength lies in working with qualified Saudi cadres and delivering projects with excellence, precision, and professionalism.\"",
        ceoName: language === "ar" ? aboutData?.ceo_name_ar || "أحمد مرعي القرني" : aboutData?.ceo_name_en || "Ahmed Marai Al-Garni",
        ceoTitle: language === "ar" ? aboutData?.ceo_title_ar || "الرئيس التنفيذي" : aboutData?.ceo_title_en || "CEO",
    };

    if (isLoading) {
        return (
            <div className="py-24 bg-navy-950 flex justify-center items-center">
                <Loader2 className="animate-spin text-gold-500" size={48} />
            </div>
        );
    }

    return (
        <section id="about" className="py-24 bg-navy-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-gold-500 font-bold uppercase tracking-widest text-sm">
                        {content.storyTitle}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">
                        {content.title}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {content.description}
                    </p>
                </div>

                {/* CEO Message */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-navy-900 to-navy-950 border border-gold-500/20 p-8 md:p-12 rounded-2xl mb-24 relative"
                >
                    <Quote className="text-gold-500/20 absolute top-8 left-8" size={64} />

                    <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                        {/* CEO Image Placeholder */}
                        <div className="w-full md:w-1/3 aspect-[3/4] bg-navy-800 rounded-xl overflow-hidden border border-gold-500/10 shadow-2xl relative">
                            {aboutData?.ceo_image_url ? (
                                <img
                                    src={aboutData.ceo_image_url}
                                    alt={content.ceoName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                                    <span className="text-sm">CEO Photo</span>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-2/3">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {content.ceoMessageTitle}
                            </h3>
                            <div className="h-1 w-20 bg-gold-500 mb-6" />

                            <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                                {content.ceoMessage}
                            </p>

                            <div>
                                <p className="text-white font-bold text-xl">
                                    {content.ceoName}
                                </p>
                                <p className="text-gold-500">
                                    {content.ceoTitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-center text-white mb-12">
                        {language === "ar" ? "مراحل التطوّر" : "Stages of Evolution"}
                    </h3>
                    <Timeline />
                </div>
            </div>
        </section>
    );
}
