import React from 'react';

export type PenguinState = 'idle' | 'waddling' | 'waving' | 'happy';

interface PenguinProps {
    variant?: 'main' | 'companion';
    state?: PenguinState;
    className?: string;
    scale?: number;
    showHearts?: boolean;
    showFootprints?: boolean;
}

export const Penguin: React.FC<PenguinProps> = ({
    variant = 'main',
    state = 'idle',
    className = '',
    scale = 1,
    showHearts = false,
    showFootprints = false,
}) => {
    const isMain = variant === 'main';

    // Main penguin has pastel pink scarf; companion has lavender scarf
    const scarfPrimary = isMain ? '#F472B6' : '#C084FC';
    const scarfSecondary = isMain ? '#DB2777' : '#9333EA';
    const scarfHighlight = isMain ? '#FBCFE8' : '#E9D5FF';

    // Size differences: Companion is slightly smaller and cozier
    const baseWidth = isMain ? 120 : 100;
    const baseHeight = isMain ? 150 : 125;

    // Animation classes based on state
    let motionClass = 'animate-float-slow';
    if (state === 'waddling') {
        motionClass = 'animate-waddle';
    } else if (state === 'happy') {
        motionClass = 'animate-happy-bounce';
    }

    return (
        <div
            className={`relative inline-flex flex-col items-center select-none ${className}`}
            style={{ transform: `scale(${scale})` }}
        >
            {/* Optional Floating Hearts when happy */}
            {(showHearts || state === 'happy') && (
                <div className="absolute -top-6 inset-x-0 flex justify-center items-center pointer-events-none">
                    <svg
                        className="w-5 h-5 text-pink-400 animate-bounce opacity-80 filter drop-shadow-[0_0_6px_#f472b6]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            )}

            {/* Penguin Vector Body */}
            <div className={`relative ${motionClass}`}>
                <svg
                    width={baseWidth}
                    height={baseHeight}
                    viewBox="0 0 120 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="overflow-visible filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                >
                    <defs>
                        {/* Midnight tuxedo body gradient */}
                        <linearGradient id={`penguinBody-${variant}`} x1="60" y1="10" x2="60" y2="140" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#2A1B4E" />
                            <stop offset="60%" stopColor="#18102E" />
                            <stop offset="100%" stopColor="#0F091E" />
                        </linearGradient>

                        {/* Soft white snowy belly gradient */}
                        <linearGradient id={`penguinBelly-${variant}`} x1="60" y1="45" x2="60" y2="128" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="85%" stopColor="#F1F5F9" />
                            <stop offset="100%" stopColor="#E2E8F0" />
                        </linearGradient>

                        {/* Scarf gradient */}
                        <linearGradient id={`scarfGrad-${variant}`} x1="30" y1="65" x2="90" y2="78" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor={scarfPrimary} />
                            <stop offset="100%" stopColor={scarfSecondary} />
                        </linearGradient>

                        {/* Beak gradient */}
                        <linearGradient id={`beakGrad-${variant}`} x1="60" y1="46" x2="60" y2="58" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#FBBF24" />
                            <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>

                        {/* Feet gradient */}
                        <linearGradient id={`feetGrad-${variant}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FBBF24" />
                            <stop offset="100%" stopColor="#EA580C" />
                        </linearGradient>
                    </defs>

                    {/* Left & Right Feet */}
                    <ellipse cx="44" cy="136" rx="14" ry="7" fill={`url(#feetGrad-${variant})`} />
                    <ellipse cx="76" cy="136" rx="14" ry="7" fill={`url(#feetGrad-${variant})`} />

                    {/* Main Tuxedo Body */}
                    <path
                        d="M60 14 C34 14 22 40 22 75 C22 108 30 134 60 134 C90 134 98 108 98 75 C98 40 86 14 60 14 Z"
                        fill={`url(#penguinBody-${variant})`}
                    />

                    {/* Left Flipper */}
                    <path
                        d="M24 64 C12 72 8 92 18 100 C24 94 28 80 26 66 Z"
                        fill="#1C1236"
                    />

                    {/* Right Flipper (Waves if state === 'waving', otherwise cozy idle) */}
                    {state === 'waving' ? (
                        <g className="animate-flipper-wave">
                            <path
                                d="M96 64 C112 56 122 36 114 28 C104 36 96 50 96 64 Z"
                                fill="#2A1B4E"
                            />
                        </g>
                    ) : (
                        <path
                            d="M96 64 C108 72 112 92 102 100 C96 94 92 80 94 66 Z"
                            fill="#1C1236"
                        />
                    )}

                    {/* Snowy White Belly */}
                    <path
                        d="M60 48 C42 48 35 68 35 94 C35 116 45 128 60 128 C75 128 85 116 85 94 C85 68 78 48 60 48 Z"
                        fill={`url(#penguinBelly-${variant})`}
                    />

                    {/* Scarf Neck Wrap */}
                    <rect
                        x="32"
                        y="60"
                        width="56"
                        height="14"
                        rx="7"
                        fill={`url(#scarfGrad-${variant})`}
                    />

                    {/* Scarf Highlight line */}
                    <path
                        d="M38 63 Q60 67 82 63"
                        stroke={scarfHighlight}
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.8"
                    />

                    {/* Scarf Hanging Tail with Cute Fringes */}
                    <path
                        d="M70 66 L78 98 C78 100 71 102 68 100 L64 66 Z"
                        fill={scarfSecondary}
                    />
                    {/* Fringe tassels */}
                    <line x1="69" y1="100" x2="68" y2="105" stroke={scarfHighlight} strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="72" y1="100" x2="72" y2="106" stroke={scarfHighlight} strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="75" y1="99" x2="76" y2="105" stroke={scarfHighlight} strokeWidth="1.5" strokeLinecap="round" />

                    {/* Cheerful Blushing Cheeks */}
                    <ellipse cx="40" cy="46" rx="5" ry="3" fill="#F472B6" opacity="0.35" />
                    <ellipse cx="80" cy="46" rx="5" ry="3" fill="#F472B6" opacity="0.35" />

                    {/* Expressive Eyes with blinking */}
                    <g className="animate-blink">
                        {/* Left Eye */}
                        <circle cx="48" cy="40" r="4.5" fill="#0F091E" />
                        <circle cx="46.5" cy="38.5" r="1.6" fill="#FFFFFF" />
                        <circle cx="49.5" cy="41.5" r="0.8" fill="#FFFFFF" />

                        {/* Right Eye */}
                        <circle cx="72" cy="40" r="4.5" fill="#0F091E" />
                        <circle cx="70.5" cy="38.5" r="1.6" fill="#FFFFFF" />
                        <circle cx="73.5" cy="41.5" r="0.8" fill="#FFFFFF" />
                    </g>

                    {/* Cute Orange Beak */}
                    <path
                        d="M54 44 Q60 52 66 44 Q60 48 54 44 Z"
                        fill={`url(#beakGrad-${variant})`}
                    />
                </svg>
            </div>

            {/* Subtle Snowy Footprints (if enabled) */}
            {showFootprints && (
                <div className="flex gap-3 mt-1 opacity-40">
                    <div className="w-2.5 h-1.5 rounded-full bg-indigo-200/50 transform -rotate-12" />
                    <div className="w-2.5 h-1.5 rounded-full bg-indigo-200/50 transform rotate-12" />
                </div>
            )}
        </div>
    );
};

/**
 * Companion Pair Component:
 * Shows the main penguin and companion penguin together with warmth and companionship!
 */
export const PenguinPair: React.FC<{
    className?: string;
    state?: PenguinState;
    scale?: number;
    showHearts?: boolean;
}> = ({ className = '', state = 'idle', scale = 1, showHearts = true }) => {
    return (
        <div className={`relative inline-flex items-end justify-center gap-2 select-none ${className}`}>
            <Penguin variant="main" state={state} scale={scale} showHearts={showHearts} />
            <Penguin
                variant="companion"
                state={state === 'waving' ? 'idle' : state}
                scale={scale * 0.88}
                className="-ml-3 mb-1"
            />
        </div>
    );
};

