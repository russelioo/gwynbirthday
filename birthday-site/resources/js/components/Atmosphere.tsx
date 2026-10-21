import React, { useEffect, useRef } from 'react';
import { siteConfig } from '../config/content';

interface AtmosphereProps {
    showAuroras?: boolean;
    showSnow?: boolean;
}

export const Atmosphere: React.FC<AtmosphereProps> = ({
    showAuroras = siteConfig.effects.enableAuroras,
    showSnow = true,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!showSnow) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Check reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Snowflake particle definition
        const flakeCount = prefersReducedMotion ? 12 : siteConfig.effects.snowflakeCount;
        interface Flake {
            x: number;
            y: number;
            radius: number;
            speedY: number;
            speedX: number;
            opacity: number;
            swayAngle: number;
            swaySpeed: number;
        }

        const flakes: Flake[] = Array.from({ length: flakeCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.2 + 0.8,
            speedY: Math.random() * 0.7 + 0.35,
            speedX: Math.random() * 0.3 - 0.15,
            opacity: Math.random() * 0.6 + 0.3,
            swayAngle: Math.random() * Math.PI * 2,
            swaySpeed: Math.random() * 0.02 + 0.005,
        }));

        let lastTime = performance.now();

        const render = (currentTime: number) => {
            const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
            lastTime = currentTime;

            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < flakes.length; i++) {
                const f = flakes[i];
                f.swayAngle += f.swaySpeed;
                f.x += f.speedX + Math.sin(f.swayAngle) * 0.4;
                f.y += f.speedY;

                // Wrap around edges
                if (f.y > height + 5) {
                    f.y = -5;
                    f.x = Math.random() * width;
                }
                if (f.x > width + 5) {
                    f.x = -5;
                } else if (f.x < -5) {
                    f.x = width + 5;
                }

                // Draw soft glowing snowflake
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(241, 245, 249, ${f.opacity})`;
                ctx.shadowColor = 'rgba(244, 114, 182, 0.4)';
                ctx.shadowBlur = f.radius * 2;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [showSnow]);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {/* Deep Violet & Midnight Twilight Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b071a] via-[#150a2a] to-[#0d071e]" />

            {/* Ambient Radial Color Glows (Soft Pink & Royal Purple) */}
            <div className="absolute -top-32 left-1/4 h-[550px] w-[550px] rounded-full bg-purple-900/20 blur-[130px]" />
            <div className="absolute top-1/3 -right-24 h-[600px] w-[600px] rounded-full bg-pink-600/15 blur-[150px]" />
            <div className="absolute bottom-10 left-1/3 h-[500px] w-[500px] rounded-full bg-indigo-900/25 blur-[140px]" />

            {/* Aurora Borealis Curtain Effects */}
            {showAuroras && (
                <div className="animate-aurora absolute -top-16 inset-x-0 h-96 opacity-40 mix-blend-screen filter blur-3xl">
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-purple-500/20 via-pink-400/25 via-teal-300/15 to-transparent" />
                </div>
            )}

            {/* Twinkling Ambient Stars */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-[12%] left-[18%] h-1 w-1 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                <div className="absolute top-[28%] left-[82%] h-1.5 w-1.5 rounded-full bg-pink-200 shadow-[0_0_10px_#f472b6]" />
                <div className="absolute top-[45%] left-[10%] h-1 w-1 rounded-full bg-purple-200 shadow-[0_0_6px_#c084fc]" />
                <div className="absolute top-[68%] left-[88%] h-1 w-1 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                <div className="absolute top-[82%] left-[25%] h-1 w-1 rounded-full bg-pink-100 shadow-[0_0_6px_#f472b6]" />
                <div className="absolute top-[18%] left-[65%] h-1.5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_8px_#67e8f9]" />
                <div className="absolute top-[35%] left-[45%] h-0.5 w-0.5 rounded-full bg-white" />
                <div className="absolute top-[75%] left-[55%] h-1 w-1 rounded-full bg-purple-100 shadow-[0_0_8px_#c084fc]" />
            </div>

            {/* Falling Snow Particle Canvas */}
            {showSnow && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />}
        </div>
    );
};

