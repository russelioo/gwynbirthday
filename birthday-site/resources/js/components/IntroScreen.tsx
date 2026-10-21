import React, { useState } from 'react';
import { Penguin } from './Penguin';
import { Number22 } from './Number22';
import { siteConfig } from '../config/content';
import { sound } from '../lib/sound';

interface IntroScreenProps {
    onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const [penguinState, setPenguinState] = useState<'idle' | 'waddling' | 'waving'>('waving');
    const [footprintCount, setFootprintCount] = useState<number>(0);

    const handleEnter = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setPenguinState('waddling');

        // Unlock audio context and start the ambient Penguin Wonderland music
        sound.unlockAudio();
        sound.playClickChime();
        sound.start(siteConfig.audio.customAudioUrl || undefined);

        // Animate footprints as penguin walks across
        const interval = setInterval(() => {
            sound.playFootprint();
            setFootprintCount((prev) => prev + 1);
        }, 220);

        // Complete transition after cinematic sequence
        setTimeout(() => {
            clearInterval(interval);
            onEnter();
        }, 1800);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 overflow-hidden transition-all duration-1000 ${
                isTransitioning ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
            }`}
        >
            {/* Background Ambient Violet Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c071d] via-[#16092c] to-[#0a0518] -z-20" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-purple-800/20 via-pink-600/15 to-transparent blur-[120px] pointer-events-none -z-10" />

            {/* Subtle Angled Broadcast Light Beams */}
            <div className="absolute -inset-x-20 top-1/4 h-28 -skew-y-3 bg-gradient-to-r from-transparent via-purple-500/10 via-pink-400/15 to-transparent border-y border-pink-400/10 pointer-events-none -z-10 light-sweep-effect" />

            {/* Top Minimal Branding */}
            <header className="w-full max-w-5xl flex justify-between items-center pt-4 z-10">
                <div className="flex items-center gap-2">
                    <span className="text-base select-none">🐧</span>
                    <span className="text-xs uppercase tracking-[0.25em] text-purple-200/90 font-sans font-medium">
                        Penguin Wonderland
                    </span>
                </div>
                <Number22 variant="badge" />
            </header>

            {/* Centerpiece: CHAPTER 22 Title & Animated Penguin */}
            <main className="relative flex flex-col items-center justify-center my-auto z-10 max-w-xl text-center">
                {/* Subtle Chapter Marker */}
                <div className="mb-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-purple-400/20 text-xs font-medium text-pink-200/90 tracking-widest uppercase">
                    <span className="text-pink-400">✧</span>
                    <span>An Interactive Journey</span>
                    <span className="text-pink-400">✧</span>
                </div>

                {/* Main Monumental Title: "CHAPTER 22" */}
                <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-br from-white via-pink-100 to-purple-200 bg-clip-text text-transparent filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    {siteConfig.recipient.chapterTitle}
                </h1>

                {/* Subtitle Placeholder from config */}
                {siteConfig.recipient.subtitle && (
                    <p className="mt-3 text-sm sm:text-base text-purple-200/75 max-w-md font-sans">
                        {siteConfig.recipient.subtitle}
                    </p>
                )}

                {/* Center Animated Penguin on Snowy Drift */}
                <div className="relative mt-8 mb-6 flex flex-col items-center">
                    {/* Snowy pedestal drift */}
                    <div className="relative flex items-center justify-center">
                        {/* Waving / Waddling Penguin */}
                        <div
                            className={`transition-transform duration-1000 ${
                                isTransitioning ? 'translate-x-48 scale-95' : 'translate-x-0'
                            }`}
                        >
                            <Penguin
                                variant="main"
                                state={penguinState}
                                scale={1.1}
                                showHearts={isTransitioning}
                            />
                        </div>
                    </div>

                    {/* Snowy Drift base */}
                    <div className="relative -mt-3 w-56 h-8 rounded-full bg-gradient-to-r from-purple-200/10 via-pink-200/25 to-purple-200/10 blur-sm border-t border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.3)]" />

                    {/* Step Footprints during transition */}
                    {isTransitioning && (
                        <div className="absolute bottom-1 left-24 flex gap-4 pointer-events-none">
                            {Array.from({ length: footprintCount }).map((_, idx) => (
                                <span
                                    key={idx}
                                    className="w-2.5 h-1.5 rounded-full bg-indigo-200/50 transform rotate-12 animate-pulse"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Interactive "Enter the Penguin World" Button */}
                <div className="relative mt-2">
                    <button
                        onClick={handleEnter}
                        disabled={isTransitioning}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass-panel-elevated cursor-pointer border border-pink-400/40 text-white font-medium tracking-wide shadow-[0_15px_35px_rgba(236,72,153,0.25)] transition-all duration-300 hover:border-pink-300 hover:scale-105 hover:shadow-[0_20px_45px_rgba(244,114,182,0.4)] focus:outline-none focus:ring-2 focus:ring-pink-400/70 active:scale-95"
                    >
                        {/* Button Shimmer sweep */}
                        <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                        </span>

                        <span className="font-serif italic text-lg sm:text-xl text-pink-100 group-hover:text-white">
                            Enter the Penguin World
                        </span>

                        <svg
                            className="w-5 h-5 text-pink-300 group-hover:translate-x-1 transition-transform duration-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </main>

            {/* Bottom Subtle Note */}
            <footer className="w-full text-center pb-4 z-10">
                <span className="text-[11px] tracking-wider text-purple-300/60 font-sans">
                    Click to begin • Best experienced with sound
                </span>
            </footer>
        </div>
    );
};

