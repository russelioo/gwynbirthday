import React from 'react';

interface Number22Props {
    variant?: 'monumental' | 'hero' | 'badge' | 'watermark';
    className?: string;
    showStars?: boolean;
}

export const Number22: React.FC<Number22Props> = ({
    variant = 'hero',
    className = '',
    showStars = true,
}) => {
    if (variant === 'watermark') {
        return (
            <div className={`pointer-events-none select-none font-serif font-black tracking-tighter opacity-5 ${className}`}>
                <span className="text-[14rem] md:text-[22rem] leading-none bg-gradient-to-b from-white via-pink-400 to-transparent bg-clip-text text-transparent">
                    22
                </span>
            </div>
        );
    }

    if (variant === 'badge') {
        return (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-pink-400/30 text-xs font-semibold tracking-wider text-pink-200 ${className}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-ping" />
                <span className="font-serif italic text-sm">22</span>
                <span className="text-[10px] uppercase tracking-widest text-purple-300">Years</span>
            </div>
        );
    }

    // Hero or Monumental
    const isMonumental = variant === 'monumental';
    const textSize = isMonumental
        ? 'text-8xl sm:text-9xl md:text-[13rem]'
        : 'text-7xl sm:text-8xl md:text-9xl';

    return (
        <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
            {/* Ambient Radial Color Bloom Behind 22 */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-purple-600/30 via-pink-500/25 to-indigo-400/20 blur-3xl -z-10 animate-glow-pulse pointer-events-none" />

            {/* Orbiting Shimmer Stars */}
            {showStars && (
                <>
                    <div className="absolute -top-3 -right-4 animate-bounce pointer-events-none">
                        <svg className="w-6 h-6 text-pink-300 filter drop-shadow-[0_0_8px_#f472b6]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                        </svg>
                    </div>
                    <div className="absolute -bottom-2 -left-3 animate-pulse pointer-events-none">
                        <svg className="w-5 h-5 text-purple-300 filter drop-shadow-[0_0_8px_#c084fc]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                        </svg>
                    </div>
                    <div className="absolute top-1/2 -left-6 animate-pulse pointer-events-none">
                        <span className="block h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_8px_#67e8f9]" />
                    </div>
                    <div className="absolute top-1/4 -right-6 animate-pulse pointer-events-none">
                        <span className="block h-2 w-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
                    </div>
                </>
            )}

            {/* Glossy Gradient 22 Typography */}
            <div className="relative light-sweep-effect rounded-3xl px-6 py-2">
                <span
                    className={`font-serif font-bold tracking-tight leading-none bg-gradient-to-br from-white via-pink-200 via-purple-200 to-indigo-300 bg-clip-text text-transparent filter drop-shadow-[0_12px_28px_rgba(168,85,247,0.45)] ${textSize}`}
                    style={{
                        WebkitTextStroke: '1px rgba(255, 255, 255, 0.45)',
                    }}
                >
                    22
                </span>

                {/* Subtle Frosted Frost/Ice Reflection Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-3xl pointer-events-none mix-blend-overlay" />
            </div>

            {/* Subtle Chapter / Milestone Label */}
            <div className="mt-2 flex items-center gap-3">
                <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
                <span className="text-[11px] font-medium tracking-[0.35em] uppercase text-purple-200/90 font-sans">
                    Golden Milestone
                </span>
                <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            </div>
        </div>
    );
};

