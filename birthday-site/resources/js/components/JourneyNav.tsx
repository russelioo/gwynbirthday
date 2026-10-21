import React from 'react';
import { sound } from '../lib/sound';

export type DestinationId = 'cove' | 'igloo' | 'keepsakes' | 'final';

interface JourneyNavProps {
    activeDestination: DestinationId;
    onSelectDestination: (id: DestinationId) => void;
}

interface NavItem {
    id: DestinationId;
    label: string;
    icon: string;
    sublabel: string;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'cove', label: 'Memory Cove', icon: '❄️', sublabel: 'Gallery' },
    { id: 'igloo', label: 'The Cozy Igloo', icon: '🏠', sublabel: 'Letter' },
    { id: 'keepsakes', label: 'Little Keepsakes', icon: '🎁', sublabel: 'Gift Box' },
    { id: 'final', label: 'The Final Snowfall', icon: '🌌', sublabel: 'Twilight 22' },
];

export const JourneyNav: React.FC<JourneyNavProps> = ({
    activeDestination,
    onSelectDestination,
}) => {
    const handleSelect = (id: DestinationId) => {
        sound.playClickChime();
        onSelectDestination(id);
    };

    return (
        <nav
            aria-label="Penguin World Destinations"
            className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
        >
            <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full glass-panel-elevated border border-purple-400/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeDestination === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-pink-400/50 ${
                                isActive
                                    ? 'bg-gradient-to-r from-purple-600/80 to-pink-500/80 text-white shadow-[0_4px_16px_rgba(244,114,182,0.35)]'
                                    : 'text-purple-200/70 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <span className="text-sm sm:text-base">{item.icon}</span>
                            <span className="text-xs sm:text-sm font-medium tracking-wide hidden md:inline">
                                {item.label}
                            </span>
                            <span className="text-xs font-medium tracking-wide inline md:hidden">
                                {item.sublabel}
                            </span>

                            {/* Active Tiny Glowing Indicator */}
                            {isActive && (
                                <span className="absolute -top-1 right-2 h-1.5 w-1.5 rounded-full bg-pink-300 shadow-[0_0_6px_#fff]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

