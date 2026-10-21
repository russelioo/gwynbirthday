import React from 'react';

interface BroadcastPanelProps {
    children?: React.ReactNode;
    className?: string;
    variant?: 'divider' | 'card' | 'banner';
    angle?: 'left' | 'right';
}

export const BroadcastPanel: React.FC<BroadcastPanelProps> = ({
    children,
    className = '',
    variant = 'divider',
    angle = 'left',
}) => {
    const skewClass = angle === 'left' ? '-skew-y-2' : 'skew-y-2';
    const unskewClass = angle === 'left' ? 'skew-y-2' : '-skew-y-2';

    if (variant === 'divider') {
        return (
            <div className={`relative w-full py-12 my-8 overflow-hidden pointer-events-none select-none ${className}`}>
                {/* Angled glossy violet beam */}
                <div className={`relative h-20 w-[120%] -left-[10%] ${skewClass} bg-gradient-to-r from-purple-900/0 via-purple-900/30 via-pink-900/20 to-purple-900/0 border-y border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.15)] light-sweep-effect`}>
                    {/* Metallic silver neon hairline */}
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-60" />
                    <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-40" />

                    {/* Lens flare spot */}
                    <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-48 h-12 bg-pink-400/20 blur-xl rounded-full" />
                </div>
            </div>
        );
    }

    if (variant === 'banner') {
        return (
            <div className={`relative w-full overflow-hidden ${className}`}>
                <div className={`relative py-8 px-6 ${skewClass} bg-gradient-to-r from-purple-950/60 via-[#1e0e3a]/90 to-purple-950/60 border-y border-pink-400/20 shadow-2xl light-sweep-effect`}>
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-pink-400/80 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
                    <div className={`${unskewClass} relative z-10`}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    // Card variant
    return (
        <div className={`relative rounded-3xl p-8 overflow-hidden bg-gradient-to-br from-[#1c1033]/90 via-[#130926]/90 to-[#0e071c]/90 border border-purple-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] light-sweep-effect ${className}`}>
            {/* Glossy top edge highlight */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-pink-300/60 to-transparent" />
            {/* Ambient corner flares */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </div>
    );
};

