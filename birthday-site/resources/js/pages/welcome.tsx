import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { siteConfig } from '../config/content';
import { Atmosphere } from '../components/Atmosphere';
import { AudioPlayer } from '../components/AudioPlayer';
import { IntroScreen } from '../components/IntroScreen';
import { Number22 } from '../components/Number22';
import { BroadcastPanel } from '../components/BroadcastPanel';
import { JourneyNav, DestinationId } from '../components/JourneyNav';
import { MemoryCove } from '../components/MemoryCove';
import { CozyIgloo } from '../components/CozyIgloo';
import { KeepsakesGift } from '../components/KeepsakesGift';
import { FinalSnowfall } from '../components/FinalSnowfall';
import { PenguinPair } from '../components/Penguin';

export default function Welcome() {
    const [hasEntered, setHasEntered] = useState<boolean>(false);
    const [activeDestination, setActiveDestination] = useState<DestinationId>('cove');

    // Handle smooth scrolling when selecting a destination from the nav dock
    const handleSelectDestination = (id: DestinationId) => {
        setActiveDestination(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Track scroll position to update active destination tab in nav dock
    useEffect(() => {
        if (!hasEntered) return;

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0,
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id as DestinationId;
                    if (id) setActiveDestination(id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ['cove', 'igloo', 'keepsakes', 'final']
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        sections.forEach((s) => observer.observe(s));

        return () => observer.disconnect();
    }, [hasEntered]);

    const handleReplayAll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            setHasEntered(false);
        }, 300);
    };

    return (
        <div className="relative min-h-screen text-slate-100 selection:bg-pink-500/30 font-sans overflow-x-hidden">
            <Head>
                <title>{`${siteConfig.recipient.chapterTitle} — Penguin Wonderland`}</title>
                <meta name="description" content="A meaningful interactive birthday website." />
            </Head>

            {/* Persistent Atmospheric Ambient Lights, Aurora & Snow */}
            <Atmosphere />

            {/* Floating Sound & Ambient Music Control */}
            <AudioPlayer />

            {/* Full-Screen Cinematic Opening Experience */}
            {!hasEntered && <IntroScreen onEnter={() => setHasEntered(true)} />}

            {/* Main Interactive Wonderland Experience */}
            {hasEntered && (
                <div className="relative z-10 flex flex-col items-center w-full animate-fadeIn pb-32">
                    {/* Top Hero Section */}
                    <header className="relative w-full max-w-5xl mx-auto px-4 pt-16 pb-12 flex flex-col items-center text-center">
                        {/* Milestone Badge */}
                        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1 rounded-full glass-card border border-pink-400/30 text-xs font-semibold uppercase tracking-[0.2em] text-pink-200">
                            <span>✨</span>
                            <span>{siteConfig.recipient.birthDate}</span>
                            <span>✨</span>
                        </div>

                        {/* Recipient Name Header Placeholder */}
                        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
                            {siteConfig.recipient.name}
                        </h1>

                        <p className="mt-3 text-base sm:text-lg text-purple-200/80 font-sans max-w-md">
                            {siteConfig.recipient.subtitle || 'Welcome to your Penguin Wonderland.'}
                        </p>

                        {/* Monumental 22 Motif with Companions */}
                        <div className="relative mt-10 mb-8 flex flex-col items-center">
                            <Number22 variant="hero" />
                            <div className="relative -mt-6">
                                <PenguinPair scale={0.9} />
                            </div>
                        </div>

                        {/* Quick scroll invitation */}
                        <div className="mt-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-300/60">
                            <span>Explore the 4 Destinations Below</span>
                            <svg className="w-4 h-4 animate-bounce text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M19 12l-7 7-7-7" />
                            </svg>
                        </div>
                    </header>

                    {/* Broadcast Sleek Angled Divider (YouTube Short motif) */}
                    <BroadcastPanel variant="divider" angle="left" />

                    {/* Destination 1: Memory Cove (Gallery & Full-screen Lightbox) */}
                    <MemoryCove />

                    {/* Broadcast Sleek Angled Divider */}
                    <BroadcastPanel variant="divider" angle="right" />

                    {/* Destination 2: The Cozy Igloo (Personal Letter) */}
                    <CozyIgloo />

                    {/* Broadcast Sleek Angled Divider */}
                    <BroadcastPanel variant="divider" angle="left" />

                    {/* Destination 3: Little Keepsakes (Interactive Gift Box) */}
                    <KeepsakesGift />

                    {/* Broadcast Sleek Angled Divider */}
                    <BroadcastPanel variant="divider" angle="right" />

                    {/* Destination 4: The Final Snowfall (Twilight Auroras & Glowing 22) */}
                    <FinalSnowfall onReplayAll={handleReplayAll} />

                    {/* Bottom Navigation Dock */}
                    <JourneyNav
                        activeDestination={activeDestination}
                        onSelectDestination={handleSelectDestination}
                    />

                    {/* Editorial Footer */}
                    <footer className="mt-20 text-center text-xs text-purple-300/50 max-w-md px-4">
                        <p className="font-serif italic text-sm text-purple-200/70 mb-1">
                            Chapter 22 • Penguin Wonderland
                        </p>
                    </footer>
                </div>
            )}
        </div>
    );
}
