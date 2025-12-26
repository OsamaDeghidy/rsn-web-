"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useEffect, useState } from 'react';
import { getTableData } from "@/lib/supabase-service";

function MapPoints() {
    // Generate points on a 2D plane to simulate a flat map
    const points = useMemo(() => {
        const p = new Float32Array(3000);
        for (let i = 0; i < 3000; i += 3) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 6;
            const z = 0;
            p[i] = x;
            p[i + 1] = y;
            p[i + 2] = z;
        }
        return p;
    }, []);

    return (
        <group rotation={[0.4, 0.2, 0]}>
            <Points positions={points} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#C5A065"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

export function Coverage() {
    const { language } = useLanguage();
    const [coverageData, setCoverageData] = useState<any>(null);

    useEffect(() => {
        const fetchCoverage = async () => {
            const data = await getTableData("coverage");
            if (data && data.length > 0) {
                setCoverageData(data[0]);
            }
        };
        fetchCoverage();
    }, []);

    const content = {
        title: language === "ar" ? coverageData?.title_ar || "تغطية شاملة لكل المملكة" : coverageData?.title_en || "Coverage Across the Kingdom",
        subtitle: language === "ar"
            ? coverageData?.subtitle_ar || "أينما كانت وجهة الفعالية، تكون رسن حاضرة لإدارتها بمهارة. فريقنا المحترف جاهز للتنفيذ في أي موقع."
            : coverageData?.subtitle_en || "Wherever the event destination is, RSN is present to manage it skillfully. Our professional team is ready to execute at any location.",
        regions: coverageData?.regions || "13+",
        events: coverageData?.events || "500+",
    };

    return (
        <section id="coverage" className="h-[80vh] bg-navy-950 relative overflow-hidden flex items-center">
            {/* Map Background */}
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <MapPoints />
                </Canvas>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pointer-events-none">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                        {content.title}
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                        {content.subtitle}
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <span className="text-4xl font-bold text-gold-500 block mb-2">{content.regions}</span>
                            <span className="text-sm text-gray-400 uppercase tracking-widest">{language === "ar" ? "منطقة" : "Regions"}</span>
                        </div>
                        <div>
                            <span className="text-4xl font-bold text-gold-500 block mb-2">{content.events}</span>
                            <span className="text-sm text-gray-400 uppercase tracking-widest">{language === "ar" ? "فعالية ناجحة" : "Events Managed"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
