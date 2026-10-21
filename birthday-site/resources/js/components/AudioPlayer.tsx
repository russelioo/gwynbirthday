import React, { useEffect, useState } from 'react';
import { sound, TrackInfo } from '../lib/sound';
import { siteConfig } from '../config/content';

export const AudioPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(sound.getIsPlaying());
    const [isMuted, setIsMuted] = useState<boolean>(sound.getIsMuted());
    const [track, setTrack] = useState<TrackInfo>(sound.getCurrentTrack());

    useEffect(() => {
        const unsubscribe = sound.subscribe((playing, currentTrack) => {
            setIsPlaying(playing);
            setIsMuted(sound.getIsMuted());
            if (currentTrack) setTrack(currentTrack);
        });
        return unsubscribe;
    }, []);

    const togglePlay = () => {
        sound.toggle(siteConfig.audio.customAudioUrl || undefined);
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        sound.toggleMute();
        setIsMuted(sound.getIsMuted());
    };

    return (
        <div className="fixed top-5 right-5 z-50">
            <div
                onClick={togglePlay}
                role="button"
                tabIndex={0}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        togglePlay();
                    }
                }}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-full glass-panel-elevated cursor-pointer select-none transition-all duration-300 hover:border-pink-400/50 hover:shadow-[0_0_20px_rgba(244,114,182,0.3)] focus:outline-none focus:ring-2 focus:ring-pink-400/50"
            >
                {/* Soundwave equalizer or Play Icon */}
                <div className="flex items-center gap-0.5 h-4 w-5 justify-center">
                    {isPlaying && !isMuted ? (
                        <>
                            <span className="w-1 bg-pink-400 rounded-full animate-bounce h-3.5" style={{ animationDelay: '0ms' }} />
                            <span className="w-1 bg-purple-400 rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }} />
                            <span className="w-1 bg-pink-300 rounded-full animate-bounce h-2.5" style={{ animationDelay: '300ms' }} />
                            <span className="w-1 bg-indigo-300 rounded-full animate-bounce h-3" style={{ animationDelay: '75ms' }} />
                        </>
                    ) : (
                        <svg className="w-4 h-4 text-purple-300 group-hover:text-pink-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </div>

                {/* Track info text */}
                <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-medium text-purple-100 group-hover:text-white transition-colors">
                        {isPlaying ? track.title : 'Play Music'}
                    </span>
                    <span className="text-[10px] text-purple-300/80">
                        {track.subtitle}
                    </span>
                </div>

                {/* Mute button (only visible if playing) */}
                {isPlaying && (
                    <button
                        onClick={toggleMute}
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                        className="ml-1 p-1 rounded-full text-purple-300 hover:text-pink-300 transition-colors hover:bg-white/10"
                    >
                        {isMuted ? (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="1" y1="1" x2="23" y2="23" />
                                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};
