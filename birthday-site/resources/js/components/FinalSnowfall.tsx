import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../config/content';
import { Number22 } from './Number22';
import { PenguinPair } from './Penguin';
import { sound } from '../lib/sound';

interface FinalSnowfallProps {
    onReplayAll: () => void;
}

export const FinalSnowfall: React.FC<FinalSnowfallProps> = ({ onReplayAll }) => {
    const { finalSnowfall } = siteConfig.destinations;
    const dedicationCardRef = useRef<HTMLDivElement | null>(null);
    const hasTriggeredRef = useRef<boolean>(false);

    const [isPlayingBirthday, setIsPlayingBirthday] = useState<boolean>(false);

    // Subscribe to sound engine state
    useEffect(() => {
        const unsubscribe = sound.subscribe((playing) => {
            if (!playing && isPlayingBirthday) {
                setIsPlayingBirthday(false);
            }
        });
        return unsubscribe;
    }, [isPlayingBirthday]);

    // Automatically trigger Happy Birthday music when scrolling to the "Final Personal Dedication" card
    useEffect(() => {
        const target = dedicationCardRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting && !hasTriggeredRef.current) {
                    hasTriggeredRef.current = true;
                    observer.disconnect();

                    // Automatically start Happy Birthday music (no click required)
                    sound.playHappyBirthday({
                        customUrl: siteConfig.audio.happyBirthdayUrl,
                        onStarted: () => {
                            setIsPlayingBirthday(true);
                        },
                    });
                }
            },
            {
                root: null,
                rootMargin: '0px 0px 50px 0px',
                threshold: 0.05,
            }
        );

        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleReplay = () => {
        sound.stop();
        sound.playClickChime();
        hasTriggeredRef.current = false;
        setIsPlayingBirthday(false);
        onReplayAll();
    };

    return (
        <section id="final" className="relative w-full max-w-5xl mx-auto px-4 py-28 text-center">
            {/* Ambient Aurora Curtain behind the final scene */}
            <div className="absolute inset-x-0 -top-12 h-96 bg-gradient-to-r from-purple-600/20 via-pink-500/25 via-indigo-500/20 to-purple-600/20 blur-[90px] pointer-events-none -z-10" />

            {/* Destination Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-purple-400/30 text-xs font-semibold tracking-widest uppercase text-purple-200 mb-6">
                <span>🌌</span>
                <span>{finalSnowfall.badge}</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent mb-3">
                {finalSnowfall.title}
            </h2>
            <p className="text-sm sm:text-base text-purple-200/80 max-w-lg mx-auto font-sans mb-12">
                {finalSnowfall.subtitle}
            </p>

            {/* Cinematic Centerpiece: Two Penguins beneath the Monumental Glowing 22 */}
            <div className="relative flex flex-col items-center justify-center my-8">
                {/* Glowing 22 */}
                <Number22 variant="monumental" />

                {/* Snowdrift hill with Two Penguins standing together */}
                <div className="relative -mt-6 sm:-mt-8 z-10 flex flex-col items-center">
                    <PenguinPair scale={1.15} showHearts={true} />

                    {/* Snowy twilight hill base */}
                    <div className="relative -mt-2 w-72 sm:w-96 h-10 rounded-full bg-gradient-to-r from-purple-200/20 via-white/40 to-pink-200/20 blur-sm border-t border-white/40 shadow-[0_15px_30px_rgba(0,0,0,0.5)]" />
                </div>
            </div>

            {/* Customizable Final Message / Dedication Card */}
            <div
                ref={dedicationCardRef}
                className="mt-12 max-w-xl mx-auto rounded-3xl glass-panel-elevated p-8 sm:p-10 border border-purple-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
                <div className="flex flex-col items-center mb-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-pink-300 font-sans block mb-2">
                        Final Personal Dedication
                    </span>

                    {/* Animated Music Indicator when playing automatically */}
                    {isPlayingBirthday && (
                        <div
                            role="status"
                            aria-live="polite"
                            className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-2 rounded-full bg-purple-950/70 border border-pink-400/30 text-pink-200 text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(244,114,182,0.25)] select-none transition-all duration-500 animate-fadeIn"
                        >
                            <span className="flex items-center gap-0.5 h-3">
                                <span className="w-0.5 h-2.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-0.5 h-3.5 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-0.5 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </span>
                            <span className="font-sans font-medium">
                                {siteConfig.audio.birthdayTitle || 'Happy Birthday, Daba!'} ♡
                            </span>
                        </div>
                    )}
                </div>

                {/* Final Personal Message */}
                <div className="p-6 rounded-2xl bg-white/5 border border-purple-300/20 mb-6 text-left">
                    <p className="font-serif italic text-lg sm:text-xl text-purple-50 leading-relaxed whitespace-pre-line">
                        {finalSnowfall.finalMessage}
                    </p>
                </div>

                <div className="font-serif italic text-lg sm:text-xl text-pink-200 mb-8">
                    {finalSnowfall.closingSignoff}
                </div>

                {/* Replay Experience Button */}
                <button
                    onClick={handleReplay}
                    className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(236,72,153,0.35)] transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 4v6h6M23 20v-6h-6" />
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                    </svg>
                    <span>Replay Experience</span>
                </button>
            </div>
        </section>
    );
};
