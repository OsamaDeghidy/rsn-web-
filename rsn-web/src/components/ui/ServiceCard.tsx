"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    index: number;
    id?: number | string;
}

import Link from "next/link";

export function ServiceCard({ title, description, icon: Icon, index, id }: ServiceCardProps) {
    const { dir } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative h-full w-full rounded-xl bg-navy-900/40 border border-gold-500/10 group cursor-pointer"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 grid place-content-center rounded-xl bg-navy-950/80 shadow-lg p-6"
            >
                <div
                    className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center mb-4 text-gold-500 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors duration-300"
                    style={{ transform: "translateZ(50px)" }}
                >
                    <Icon size={24} />
                </div>

                <h3
                    className="text-xl font-bold text-white mb-2 group-hover:text-gold-500 transition-colors"
                    style={{ transform: "translateZ(50px)" }}
                >
                    {title}
                </h3>

                <p
                    className="text-sm text-gray-400 leading-relaxed mb-4"
                    style={{ transform: "translateZ(50px)" }}
                >
                    {description}
                </p>

                <Link
                    href={`/services/${id || index + 1}`}
                    className="flex items-center text-gold-500 text-xs font-bold uppercase tracking-wider mt-auto hover:text-white transition-colors"
                    style={{ transform: "translateZ(50px)" }}
                >
                    <span>Read More</span>
                    <ArrowRight size={14} className={`mx-2 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </Link>
            </div>
        </motion.div>
    );
}
