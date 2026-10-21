import React, { useState } from 'react';
import { siteConfig } from '../config/content';
import { sound } from '../lib/sound';
import { PenguinPair } from './Penguin';

interface BurstParticle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
}

export const KeepsakesGift: React.FC = () => {
    const { littleKeepsakes } = siteConfig.destinations;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [particles, setParticles] = useState<BurstParticle[]>([]);

    const handleOpenGift = () => {
        if (isOpen) return;

        sound.playGiftBurst();
        setIsOpen(true);

        // Generate glowing burst particles
        const colors = ['#F472B6', '#C084FC', '#FFFFFF', '#67E8F9', '#FDE047'];
        const newParticles: BurstParticle[] = Array.from({ length: 18 }, (_, idx) => {
            const angle = (idx / 18) * Math.PI * 2;
            const distance = Math.random() * 90 + 50;
            return {
                id: idx,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance - 20,
                size: Math.random() * 6 + 3,
                color: colors[idx % colors.length],
                delay: Math.random() * 150,
            };
        });
        setParticles(newParticles);
    };

    const handleReplay = (e: React.MouseEvent) => {
        e.stopPropagation();
        sound.playClickChime();
        setIsOpen(false);
        setParticles([]);
    };

    return (
        <section id="keepsakes" className="relative w-full max-w-5xl mx-auto px-4 py-24">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-pink-400/30 text-xs font-semibold tracking-widest uppercase text-pink-200 mb-3">
                    <span>🎁</span>
                    <span>{littleKeepsakes.badge}</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
                    {littleKeepsakes.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-purple-200/80 font-sans">
                    {littleKeepsakes.subtitle}
                </p>
                {!isOpen && (
                    <p className="mt-1 text-xs text-pink-300/80 italic animate-pulse">
                        {littleKeepsakes.giftPrompt}
                    </p>
                )}
            </div>

            {/* Main Interactive Stage */}
            <div className="relative rounded-3xl glass-panel-elevated p-8 sm:p-12 overflow-hidden border border-pink-400/30 shadow-[0_25px_60px_rgba(236,72,153,0.15)] flex flex-col items-center">
                {/* Celebrating Penguins */}
                <div className="mb-6 z-10 transition-transform duration-500">
                    <PenguinPair
                        state={isOpen ? 'happy' : 'idle'}
                        scale={0.95}
                        showHearts={isOpen}
                    />
                </div>

                {/* 3D Gift Box Object */}
                <div className="relative flex flex-col items-center">
                    {/* Burst Particles Container */}
                    {isOpen && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
                            {particles.map((p) => (
                                <span
                                    key={p.id}
                                    className="absolute rounded-full animate-ping"
                                    style={{
                                        width: `${p.size}px`,
                                        height: `${p.size}px`,
                                        backgroundColor: p.color,
                                        transform: `translate(${p.x}px, ${p.y}px)`,
                                        boxShadow: `0 0 10px ${p.color}`,
                                        animationDuration: '1.2s',
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Gift Box SVG with Openable Lid */}
                    <div
                        onClick={handleOpenGift}
                        role="button"
                        tabIndex={0}
                        aria-label="Interactive gift box"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleOpenGift();
                            }
                        }}
                        className={`group relative cursor-pointer select-none transition-transform duration-500 focus:outline-none ${
                            !isOpen ? 'hover:scale-105 active:scale-95' : ''
                        }`}
                    >
                        <svg
                            className="w-56 sm:w-64 h-56 overflow-visible filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                            viewBox="0 0 200 200"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient id="boxGrad" x1="100" y1="80" x2="100" y2="180" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#4C1D95" />
                                    <stop offset="50%" stopColor="#3B0764" />
                                    <stop offset="100%" stopColor="#2E1065" />
                                </linearGradient>
                                <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#F472B6" />
                                    <stop offset="100%" stopColor="#DB2777" />
                                </linearGradient>
                                <linearGradient id="lidGrad" x1="100" y1="50" x2="100" y2="85" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#581C87" />
                                    <stop offset="100%" stopColor="#3B0764" />
                                </linearGradient>
                            </defs>

                            {/* Gift Box Base */}
                            <rect x="35" y="80" width="130" height="95" rx="10" fill="url(#boxGrad)" stroke="#A855F7" strokeWidth="2" />

                            {/* Vertical Ribbon on Box Base */}
                            <rect x="88" y="80" width="24" height="95" fill="url(#ribbonGrad)" />
                            {/* Horizontal Ribbon on Box Base */}
                            <rect x="35" y="115" width="130" height="20" fill="url(#ribbonGrad)" />

                            {/* Box Lid (Lifts and rotates when open!) */}
                            <g
                                className={`transition-all duration-700 origin-[100px_40px] ${
                                    isOpen ? '-translate-y-16 -rotate-12 opacity-85' : 'translate-y-0 rotate-0'
                                }`}
                            >
                                {/* Lid Top */}
                                <rect x="25" y="55" width="150" height="28" rx="8" fill="url(#lidGrad)" stroke="#C084FC" strokeWidth="2" />
                                {/* Ribbon on Lid */}
                                <rect x="88" y="55" width="24" height="28" fill="url(#ribbonGrad)" />

                                {/* Ribbon Bow on top of lid */}
                                <g className="transform origin-[100px_50px]">
                                    {/* Left Loop */}
                                    <ellipse cx="78" cy="46" rx="20" ry="12" fill="url(#ribbonGrad)" transform="rotate(-25 78 46)" stroke="#FBCFE8" strokeWidth="1" />
                                    {/* Right Loop */}
                                    <ellipse cx="122" cy="46" rx="20" ry="12" fill="url(#ribbonGrad)" transform="rotate(25 122 46)" stroke="#FBCFE8" strokeWidth="1" />
                                    {/* Center Knot */}
                                    <circle cx="100" cy="50" r="9" fill="#F472B6" stroke="#FFFFFF" strokeWidth="1.5" />
                                </g>
                            </g>

                            {/* Ground Shadow */}
                            <ellipse cx="100" cy="182" rx="75" ry="10" fill="#000000" opacity="0.4" />
                        </svg>

                        {/* Pulsing glow ring around unopened box */}
                        {!isOpen && (
                            <div className="absolute -inset-4 rounded-full border-2 border-pink-400/30 animate-ping pointer-events-none" />
                        )}
                    </div>
                </div>

                {/* Revealed Surprise Panel */}
                {isOpen ? (
                    <div className="mt-10 w-full max-w-xl rounded-2xl glass-panel p-8 text-center border border-pink-400/40 animate-scaleUp shadow-[0_20px_50px_rgba(244,114,182,0.25)]">
                        {/* Keepsake Type Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30 text-xs font-medium uppercase tracking-widest mb-4">
                            <span>💌</span>
                            <span>{littleKeepsakes.surpriseKeepsakeType}</span>
                        </div>

                        {/* Surprise Title */}
                        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
                            {littleKeepsakes.surpriseTitle}
                        </h3>

                        {/* Surprise Subtitle */}
                        <p className="text-sm text-pink-200/90 mb-7 font-sans italic">
                            {littleKeepsakes.surpriseSubtitle}
                        </p>

                        {/* Surprise Message - full styled letter feel */}
                        <div className="p-6 rounded-2xl bg-white/8 border border-purple-300/20 text-left mb-7">
                            <p className="font-sans text-base sm:text-lg text-purple-50 leading-relaxed whitespace-pre-line">
                                {littleKeepsakes.surpriseMessage}
                            </p>
                        </div>

                        {/* Replay Button */}
                        <button
                            onClick={handleReplay}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white text-xs font-semibold uppercase tracking-wider shadow-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 4v6h6M23 20v-6h-6" />
                                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                            </svg>
                            <span>Replay Gift Reveal</span>
                        </button>
                    </div>
                ) : (
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleOpenGift}
                            className="px-6 py-2 rounded-full glass-card border border-pink-400/30 text-xs font-medium tracking-wider uppercase text-pink-200 hover:text-white hover:border-pink-300 transition-all shadow-md"
                        >
                            Open Gift
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

