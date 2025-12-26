"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { addContactSubmission } from "@/lib/supabase-service";

export function Contact() {
    const { language } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            message: formData.get("message") as string,
        };

        const result = await addContactSubmission(data);

        if (result.success) {
            setIsSubmitted(true);
            (e.target as HTMLFormElement).reset();
        } else {
            setError(language === "ar" ? "حدث خطأ ما، يرجى المحاولة لاحقاً." : "Something went wrong, please try again later.");
        }
        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="py-24 bg-navy-900 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <span className="text-gold-500 font-bold uppercase tracking-widest text-sm">
                            {language === "ar" ? "تواصل معنا" : "GET IN TOUCH"}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4 mb-8">
                            {language === "ar" ? "لنبدأ التخطيط لفعاليتك القادمة" : "Let's Plan Your Next Event"}
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-md">
                            {language === "ar"
                                ? "فريقنا جاهز للإجابة على استفساراتكم وتقديم الاستشارات اللازمة لنجاح مناسباتكم."
                                : "Our team is ready to answer your inquiries and provide necessary consultations for the success of your events."}
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500 shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-2">{language === "ar" ? "موقعنا" : "Our Location"}</h4>
                                    <p className="text-gray-400">
                                        {language === "ar" ? "حي الياسمين، الرياض" : "Alyasmin District, Riyadh"}
                                    </p>
                                    <p className="text-gray-400">
                                        {language === "ar" ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500 shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-2">{language === "ar" ? "اتصل بنا" : "Call Us"}</h4>
                                    <p className="text-gray-400" dir="ltr">+966 55 062 2197</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500 shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-2">{language === "ar" ? "البريد الإلكتروني" : "Email Us"}</h4>
                                    <p className="text-gray-400">Ahmed@rsnalarabiya.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-navy-950 p-8 md:p-12 rounded-2xl border border-gold-500/10">
                        {isSubmitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                                <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">
                                    {language === "ar" ? "تم الإرسال بنجاح!" : "Sent Successfully!"}
                                </h3>
                                <p className="text-gray-400">
                                    {language === "ar"
                                        ? "شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن."
                                        : "Thank you for reaching out. We will get back to you as soon as possible."}
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-gold-500 font-bold hover:underline mt-4"
                                >
                                    {language === "ar" ? "إرسال رسالة أخرى" : "Send another message"}
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                                            {language === "ar" ? "الاسم" : "Name"}
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full bg-navy-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                                            {language === "ar" ? "الجوال" : "Phone"}
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            className="w-full bg-navy-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                        {language === "ar" ? "البريد الإلكتروني" : "Email"}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-navy-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                                        {language === "ar" ? "الرسالة" : "Message"}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full bg-navy-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                    ></textarea>
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gold-500 text-navy-950 font-bold py-4 rounded-lg hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            <span>{language === "ar" ? "إرسال الرسالة" : "Send Message"}</span>
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
