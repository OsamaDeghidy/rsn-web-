"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    iconName?: string | null;
    index: number;
    id?: number | string;
    image_url?: string | null;
}

import Link from "next/link";

const SERVICE_IMAGE_MAP: Record<string, string> = {
    Users: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600", // Crowd Management / Field Ushers
    Shield: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=600", // Security Services
    Car: "https://images.unsplash.com/photo-1501700490688-6161b247f677?auto=format&fit=crop&q=80&w=600", // Logistics / Valet
    ClipboardCheck: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600", // Registration Management
    HeartPulse: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600", // Health & Safety
    TrafficCone: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&q=80&w=600", // Traffic Control
    ConciergeBell: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600", // Protocol & Reception
    Compass: "https://images.unsplash.com/photo-1615840287214-7fe58a8b668f?auto=format&fit=crop&q=80&w=600", // Field Guidance
    ShieldCheck: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=600", // Security Guards
    Scroll: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600", // Crowd Management Planning
    Route: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&q=80&w=600", // Traffic Management Planning
    FileLock: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=600", // Security Planning
};

export function ServiceCard({ title, index, id, image_url, iconName }: ServiceCardProps) {
    // Default fallback image if none is provided in DB and icon maps to nothing
    const fallbackImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600";
    const imageUrl = image_url || (iconName ? SERVICE_IMAGE_MAP[iconName] : null) || fallbackImage;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="w-full"
        >
            <Link href={`/services/${id || index + 1}`} className="group block w-full">
                <div className="flex flex-col items-center w-full">
                    {/* Service title on top, centered */}
                    <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-4 group-hover:text-gold-500 transition-colors duration-300">
                        {title}
                    </h3>
                    
                    {/* Service image with sharp corners and gold border */}
                    <div className="relative w-full aspect-square overflow-hidden border border-gold-500/80 bg-navy-950 shadow-lg group-hover:border-gold-400 group-hover:shadow-[0_0_20px_rgba(197,160,101,0.25)] transition-all duration-500">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
