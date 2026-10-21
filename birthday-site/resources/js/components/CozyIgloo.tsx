import React, { useState } from 'react';
import { siteConfig } from '../config/content';
import { sound } from '../lib/sound';
import { PenguinPair } from './Penguin';

export const CozyIgloo: React.FC = () => {
    const { cozyIgloo } = siteConfig.destinations;
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleOpenLetter = () => {
        sound.playEnvelopeOpen();
        setIsEnvelopeOpen(true);
    };

    const handleCloseLetter = () => {
        sound.playClickChime();
        setIsEnvelopeOpen(false);
    };

    return (
        <section id="igloo" className="relative w-full max-w-5xl mx-auto px-4 py-24">
            {/* Section Badge & Title */}
            <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-purple-400/30 text-xs font-semibold tracking-widest uppercase text-purple-200 mb-3">
                    <span>🏠</span>
                    <span>{cozyIgloo.badge}</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
                    {cozyIgloo.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-purple-200/80 font-sans">
                    {cozyIgloo.subtitle}
                </p>
            </div>

            {/* Cozy Igloo & Interactive Envelope Landscape */}
            <div className="relative rounded-3xl glass-panel-elevated p-8 sm:p-12 overflow-hidden border border-purple-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                {/* Background Amber Glow from within Igloo */}
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-500/15 blur-[100px] pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Illustrated Igloo with penguins */}
                    <div className="relative flex flex-col items-center select-none">
                        {/* Igloo SVG Dome */}
                        <svg
                            className="w-72 sm:w-88 h-auto overflow-visible filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                            viewBox="0 0 320 220"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient id="iglooIce" x1="160" y1="20" x2="160" y2="200" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#EDE9FE" />
                                    <stop offset="60%" stopColor="#DDD6FE" />
                                    <stop offset="100%" stopColor="#C4B5FD" />
                                </linearGradient>
                                <radialGradient id="iglooWarmth" cx="160" cy="165" r="50" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
                                    <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
                                </radialGradient>
                            </defs>

                            {/* Igloo Main Dome */}
                            <path
                                d="M30 190 C30 80, 290 80, 290 190 Z"
                                fill="url(#iglooIce)"
                                opacity="0.9"
                            />

                            {/* Ice Brick Lines */}
                            <path d="M50 160 Q160 140 270 160" stroke="#A78BFA" strokeWidth="2" strokeDasharray="18 4" opacity="0.6" />
                            <path d="M70 130 Q160 110 250 130" stroke="#A78BFA" strokeWidth="2" strokeDasharray="16 4" opacity="0.5" />
                            <path d="M100 105 Q160 90 220 105" stroke="#A78BFA" strokeWidth="2" strokeDasharray="14 4" opacity="0.4" />

                            {/* Cozy Entrance Archway */}
                            <path
                                d="M125 195 C125 135, 195 135, 195 195 Z"
                                fill="#2A1406"
                            />
                            {/* Inner Golden Hearth Glow */}
                            <path
                                d="M128 195 C128 138, 192 138, 192 195 Z"
                                fill="url(#iglooWarmth)"
                            />

                            {/* Snow Crest resting directly on Igloo Dome */}
                            <path
                                d="M110 92 C135 78 185 78 210 92 C185 102 135 102 110 92 Z"
                                fill="#FFFFFF"
                                opacity="0.95"
                            />

                            {/* Ground Snowdrift */}
                            <ellipse cx="160" cy="198" rx="150" ry="16" fill="#F1F5F9" opacity="0.95" />
                        </svg>

                        {/* Two Penguins Standing Together near Entrance */}
                        <div className="relative -mt-16 z-10">
                            <PenguinPair scale={0.85} showHearts={isHovered} />
                        </div>
                    </div>

                    {/* Interactive Wax-Sealed Letter / Envelope Station */}
                    <div className="flex-1 flex flex-col items-center text-center max-w-md">
                        <div className="mb-4">
                            <span className="text-xs font-serif italic text-pink-300">
                                Penned for your 22nd Birthday
                            </span>
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                                A Letter Waiting to Unfold
                            </h3>
                            <p className="mt-2 text-xs sm:text-sm text-purple-200/75 leading-relaxed">
                                Step up to the igloo threshold and tap the sealed envelope to read the personal letter from Russelioo.
                            </p>
                        </div>

                        {/* Interactive Envelope Object */}
                        <div
                            onClick={handleOpenLetter}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            role="button"
                            tabIndex={0}
                            aria-label="Open personal letter envelope"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleOpenLetter();
                                }
                            }}
                            className="group relative cursor-pointer mt-4 p-6 rounded-3xl glass-card border border-purple-400/40 hover:border-pink-400/60 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_45px_rgba(244,114,182,0.3)] focus:outline-none focus:ring-2 focus:ring-pink-400"
                        >
                            {/* Realistic Envelope SVG */}
                            <svg
                                className="w-56 sm:w-64 h-36 overflow-visible filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
                                viewBox="0 0 240 150"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient id="envelopeGrad" x1="120" y1="0" x2="120" y2="150" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#F5F3FF" />
                                        <stop offset="100%" stopColor="#DDD6FE" />
                                    </linearGradient>
                                    <linearGradient id="waxGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#F472B6" />
                                        <stop offset="100%" stopColor="#BE185D" />
                                    </linearGradient>
                                </defs>

                                {/* Envelope Body */}
                                <rect x="10" y="15" width="220" height="130" rx="8" fill="url(#envelopeGrad)" stroke="#C4B5FD" strokeWidth="1.5" />

                                {/* Fold Lines */}
                                <path d="M10 145 L100 80 M230 145 L140 80" stroke="#A78BFA" strokeWidth="1.5" opacity="0.6" />
                                <path d="M10 15 L120 95 L230 15" fill="#E0E7FF" stroke="#C4B5FD" strokeWidth="1.5" />

                                {/* Wax Seal with Heart / 22 */}
                                <g className="transform group-hover:scale-110 transition-transform origin-center">
                                    <circle cx="120" cy="85" r="20" fill="url(#waxGrad)" filter="drop-shadow(0 4px 8px rgba(190, 24, 93, 0.5))" />
                                    <path
                                        d="M120 92 C115 87 112 84 112 80 C112 77 114 75 117 75 C118.5 75 120 76 120 77 C120 76 121.5 75 123 75 C126 75 128 77 128 80 C128 84 125 87 120 92 Z"
                                        fill="#FFFFFF"
                                        opacity="0.9"
                                    />
                                </g>
                            </svg>

                            {/* Label button */}
                            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600/80 to-pink-500/80 text-white text-xs font-medium tracking-wider uppercase shadow-md group-hover:shadow-[0_0_15px_#f472b6]">
                                <span>✉️</span>
                                <span>{cozyIgloo.sealLabel}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Unfolded Letter Reader Modal (Spacious, Journal / Paper aesthetic) */}
            {isEnvelopeOpen && (
                <div
                    onClick={handleCloseLetter}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Personal Letter Reader"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-2xl w-full max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FAF7F2] text-[#1E1B2E] p-8 sm:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.85)] border-8 border-[#EDE7DF] animate-scaleUp"
                        style={{
                            backgroundImage: 'radial-gradient(#1E1B2E 0.5px, transparent 0.5px)',
                            backgroundSize: '24px 24px',
                            backgroundPosition: '0 0',
                        }}
                    >
                        {/* Close / Fold Button */}
                        <button
                            onClick={handleCloseLetter}
                            aria-label="Close and fold letter"
                            className="absolute top-5 right-5 p-2 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Letter Header */}
                        <div className="border-b border-stone-300/80 pb-6 mb-8 text-center">
                            <span className="text-xs uppercase tracking-[0.3em] text-pink-700 font-sans font-semibold">
                                {cozyIgloo.letterDatePlaceholder}
                            </span>
                            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
                                {cozyIgloo.letterTitle}
                            </h3>
                        </div>

                        {/* Letter Body - Clean, Authentic Digital Parchment */}
                        <div className="font-serif text-stone-800 text-base sm:text-lg leading-relaxed space-y-4 px-2 sm:px-4 text-left">
                            <p className="whitespace-pre-line leading-relaxed">
                                {cozyIgloo.letterContent}
                            </p>
                        </div>

                        {/* Letter Signoff */}
                        <div className="mt-10 pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                            <div className="text-left">
                                <span className="block text-xs uppercase tracking-wider text-stone-500 font-sans font-medium">
                                    Penned with all my love,
                                </span>
                                <span className="font-serif italic text-2xl sm:text-3xl text-purple-950 font-bold mt-1 block">
                                    {cozyIgloo.letterSignoff}
                                </span>
                            </div>

                            <button
                                onClick={handleCloseLetter}
                                className="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-sans font-medium tracking-wider uppercase transition-colors shadow-md"
                            >
                                Fold Letter Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

