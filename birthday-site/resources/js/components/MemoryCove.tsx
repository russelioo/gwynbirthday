import React, { useState, useEffect, useCallback } from 'react';
import { siteConfig, MemoryItem } from '../config/content';
import { sound } from '../lib/sound';

export const MemoryCove: React.FC = () => {
    const { memoryCove } = siteConfig.destinations;
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        sound.playClickChime();
        setSelectedItemIndex(index);
    };

    const closeLightbox = useCallback(() => {
        setSelectedItemIndex(null);
    }, []);

    const nextItem = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedItemIndex((prev) => (prev !== null ? (prev + 1) % memoryCove.memories.length : 0));
    }, [memoryCove.memories.length]);

    const prevItem = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedItemIndex((prev) =>
            prev !== null ? (prev - 1 + memoryCove.memories.length) % memoryCove.memories.length : 0
        );
    }, [memoryCove.memories.length]);

    // Keyboard navigation in lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedItemIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextItem();
            if (e.key === 'ArrowLeft') prevItem();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItemIndex, closeLightbox, nextItem, prevItem]);

    const selectedItem: MemoryItem | null =
        selectedItemIndex !== null ? memoryCove.memories[selectedItemIndex] : null;

    return (
        <section id="cove" className="relative w-full max-w-6xl mx-auto px-4 pt-20 pb-36">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-pink-400/30 text-xs font-semibold tracking-widest uppercase text-pink-200 mb-3">
                    <span>❄️</span>
                    <span>{memoryCove.badge}</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
                    {memoryCove.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-purple-200/80 font-sans">
                    {memoryCove.subtitle}
                </p>
                <p className="mt-1 text-xs text-purple-300/60 italic">
                    {memoryCove.description}
                </p>
            </div>

            {/* Editorial Snow-Globe / Polaroid Grid (6 items in 2 rows of 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {memoryCove.memories.map((item, index) => (
                    <article
                        key={item.id}
                        onClick={() => openLightbox(index)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open photo viewer for ${item.title}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openLightbox(index);
                            }
                        }}
                        className="group relative cursor-pointer rounded-3xl glass-card overflow-hidden p-4 border border-purple-400/20 hover:border-pink-400/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(236,72,153,0.2)] focus:outline-none focus:ring-2 focus:ring-pink-400/60"
                    >
                        {/* Snow-globe Frame Area */}
                        <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#1f103d] to-[#120824] flex flex-col items-center justify-center border border-white/10 group-hover:border-pink-300/30 transition-all">
                            {item.imageUrl ? (
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            ) : (
                                /* Artistic Snow-Globe Placeholder */
                                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                                    {/* Snow-globe glass circle with reflection */}
                                    <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-purple-800/40 via-pink-500/20 to-cyan-300/10 border border-white/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-500">
                                        {/* Camera / Photo icon */}
                                        <svg
                                            className="w-10 h-10 text-purple-200/80 group-hover:text-pink-200 transition-colors"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                            <circle cx="12" cy="13" r="4" />
                                        </svg>

                                        {/* Snow sparkles inside globe */}
                                        <div className="absolute top-3 right-4 h-1 w-1 rounded-full bg-white animate-ping" />
                                        <div className="absolute bottom-4 left-5 h-1 w-1 rounded-full bg-pink-300 animate-pulse" />
                                    </div>

                                    {/* Helpful editable badge */}
                                    <span className="mt-3 text-[11px] font-medium tracking-wider text-pink-300/90 uppercase">
                                        [Insert Photo Here]
                                    </span>
                                </div>
                            )}

                            {/* Frost reflection sweep */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e061c]/80 via-transparent to-white/5 pointer-events-none" />

                            {/* Category Tag */}
                            {item.category && (
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-panel text-[10px] uppercase tracking-wider text-purple-200 font-medium">
                                    {item.category}
                                </div>
                            )}

                            {/* View Fullscreen pill on hover */}
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-medium text-white flex items-center gap-1">
                                <span>Zoom</span>
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Card Metadata / Captions */}
                        <div className="pt-4 px-2 pb-1 flex flex-col justify-between flex-grow">
                            <div className="flex justify-between items-baseline mb-1.5">
                                <h3 className="font-serif text-lg font-semibold text-white group-hover:text-pink-200 transition-colors">
                                    {item.title}
                                </h3>
                                <span className="text-[11px] text-purple-300/70 font-sans shrink-0 ml-2">
                                    {item.date}
                                </span>
                            </div>
                            <p className="text-xs text-purple-200/80 line-clamp-3 leading-relaxed font-sans">
                                {item.caption}
                            </p>
                        </div>
                    </article>
                ))}
            </div>

            {/* Cinematic Full-screen Photo Viewer (Lightbox) */}
            {selectedItem && (
                <div
                    onClick={closeLightbox}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo Lightbox"
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        aria-label="Close Lightbox"
                        className="absolute top-6 right-6 p-3 rounded-full glass-panel hover:bg-white/20 text-white transition-all z-20 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Left arrow */}
                    <button
                        onClick={prevItem}
                        aria-label="Previous photo"
                        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass-panel hover:bg-white/20 text-white transition-all z-20 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    {/* Right arrow */}
                    <button
                        onClick={nextItem}
                        aria-label="Next photo"
                        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass-panel hover:bg-white/20 text-white transition-all z-20 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>

                    {/* Lightbox Main Card */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-4xl w-full max-h-[92vh] rounded-3xl glass-panel-elevated overflow-hidden flex flex-col border border-pink-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
                    >
                        {/* Image or Illustration Display */}
                        <div className="relative w-full max-h-[58vh] overflow-hidden flex items-center justify-center bg-black/40">
                            {selectedItem.imageUrl ? (
                                <img
                                    src={selectedItem.imageUrl}
                                    alt={selectedItem.title}
                                    className="max-h-[56vh] w-auto object-contain mx-auto"
                                />
                            ) : (
                                <div className="py-24 px-8 text-center flex flex-col items-center justify-center">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-700/50 via-pink-500/30 to-cyan-300/20 border border-white/30 flex items-center justify-center mb-4 shadow-[0_0_35px_rgba(244,114,182,0.3)]">
                                        <svg className="w-12 h-12 text-pink-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                            <circle cx="12" cy="13" r="4" />
                                        </svg>
                                    </div>
                                    <h4 className="font-serif text-2xl text-white font-semibold mb-2">
                                        {selectedItem.title}
                                    </h4>
                                    <p className="text-xs text-pink-300/90 uppercase tracking-widest">
                                        [Insert your photo in src/config/content.ts]
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Lightbox Details Bar */}
                        <div className="p-6 sm:p-7 bg-gradient-to-r from-[#170a2c] via-[#1f0d3a] to-[#170a2c] border-t border-white/10 flex flex-col sm:flex-row justify-between items-start gap-4 max-h-[34vh] overflow-y-auto">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                                        {selectedItem.title}
                                    </h3>
                                    {selectedItem.category && (
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30">
                                            {selectedItem.category}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed font-sans max-w-2xl">
                                    {selectedItem.caption}
                                </p>
                            </div>
                            <div className="text-xs text-purple-300/70 font-mono tracking-wider shrink-0 bg-white/5 px-3 py-1.5 rounded-full">
                                {selectedItem.date}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

