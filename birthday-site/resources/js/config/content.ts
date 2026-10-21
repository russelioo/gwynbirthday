/**
 * ==============================================================================
 * PENGUIN WONDERLAND (CHAPTER 22) - PERSONALIZATION CONFIGURATION
 * ==============================================================================
 * 
 * Instructions:
 * 1. Replace the bracketed placeholders below (e.g. "[Her Name]") with your
 *    actual personal details when you are ready.
 * 2. Leave any field as-is if you wish to fill it in later.
 * 3. Photo placeholders can be replaced with URLs or local asset paths in /public.
 * 
 * NOTE: No personal letters, romantic messages, or couple memories have been
 * pre-generated here per your explicit instructions.
 * ==============================================================================
 */

export interface MemoryItem {
    id: string;
    title: string;
    date: string;
    caption: string;
    imageUrl?: string; // Optional custom photo URL. If omitted, a snowglobe art placeholder is rendered.
    category?: string;
}

export interface SiteConfig {
    recipient: {
        name: string;
        nickname: string;
        turningAge: number;
        birthDate: string;
        chapterTitle: string;
        subtitle: string;
    };
    audio: {
        title: string;
        subtitle: string;
        birthdayTitle: string;
        birthdaySubtitle: string;
        customAudioUrl?: string; // Optional URL to an MP3. If omitted, built-in ambient Web Audio synth plays.
        happyBirthdayUrl?: string; // Optional custom Happy Birthday MP3 path (e.g. '/audio/happy-birthday.mp3'). If not found, uses built-in romantic Web Audio melody.
        defaultVolume: number;
    };
    destinations: {
        memoryCove: {
            title: string;
            subtitle: string;
            badge: string;
            description: string;
            memories: MemoryItem[];
        };
        cozyIgloo: {
            title: string;
            subtitle: string;
            badge: string;
            sealLabel: string;
            letterTitle: string;
            letterContent: string;
            letterDatePlaceholder: string;
            letterSignoff: string;
        };
        littleKeepsakes: {
            title: string;
            subtitle: string;
            badge: string;
            giftPrompt: string;
            surpriseTitle: string;
            surpriseSubtitle: string;
            surpriseMessage: string;
            surpriseKeepsakeType: string;
        };
        finalSnowfall: {
            title: string;
            subtitle: string;
            badge: string;
            finalMessage: string;
            closingSignoff: string;
        };
    };
    effects: {
        snowflakeCount: number;
        enableAuroras: boolean;
        enableFootprints: boolean;
    };
}

export const siteConfig: SiteConfig = {
    recipient: {
        name: 'Angela Gwyn Mansanero',
        nickname: 'Angela Gwyn',
        turningAge: 22,
        birthDate: 'October 22, 2004',
        chapterTitle: 'CHAPTER 22',
        subtitle: 'A Little World Made Just for You',
    },
    audio: {
        title: 'Penguin Lullaby',
        subtitle: 'Winter Music Box & Ambient Chimes',
        birthdayTitle: 'Happy Birthday, Daba!',
        birthdaySubtitle: 'Playing just for you ♡',
        customAudioUrl: '', // Provide a custom mp3 path here if desired
        happyBirthdayUrl: '', // Set to '/audio/happy-birthday.mp3' if you place an MP3 in /public/audio/
        defaultVolume: 0.45,
    },
    destinations: {
        memoryCove: {
            title: 'Memory Cove',
            subtitle: 'Snow-Globe Frames & Treasured Moments',
            badge: 'Destination I',
            description: 'A curated winter cove where frozen moments shine inside frosted glass globes and modern editorial frames.',
            memories: [
                {
                    id: 'mem-1',
                    title: 'Sweet Beginnings',
                    date: 'Early Years',
                    caption: 'Every beautiful story starts somewhere. Your childhood memories are a reminder of the love that helped shape the wonderful person you are today. 🥹',
                    imageUrl: `${import.meta.env.BASE_URL}images/angela-baby-gift.webp`,
                    category: 'First Chapters',
                },
                {
                    id: 'mem-2',
                    title: 'Pure Joy',
                    date: 'Childhood Days',
                    caption: "There's something so precious about seeing you happy. I wish I could have been there for every little moment that made you smile, but I'm grateful to be part of your story now. 💗",
                    imageUrl: `${import.meta.env.BASE_URL}images/angela-baby-smile.webp`,
                    category: 'Precious Smiles',
                },
                {
                    id: 'mem-3',
                    title: 'The Graduate',
                    date: 'Bicol University',
                    caption: "You worked hard to get where you are, and you deserve every bit of this achievement. No matter how challenging the journey gets, I'll always be proud of you and your determination. 🎓",
                    imageUrl: `${import.meta.env.BASE_URL}images/angela-grad-portrait.webp`,
                    category: 'Achievement',
                },
                {
                    id: 'mem-4',
                    title: 'A Proud Chapter',
                    date: 'Graduation Ceremony',
                    caption: "Even with your family far away in New Zealand, you're continuing to build your own journey here in the Philippines. I hope I can make you feel supported, loved, and never alone as you chase your dreams. You deserve to be celebrated, today and always. 💜",
                    imageUrl: `${import.meta.env.BASE_URL}images/angela-grad-ceremony.webp`,
                    category: 'Milestones',
                },
                {
                    id: 'mem-5',
                    title: 'Blooms of Success',
                    date: 'Special Celebration',
                    caption: "Seeing you reach your dreams makes me so proud of you. I hope you never forget how capable and amazing you are. I’ll always be here, cheering for you. 💜",
                    imageUrl: `${import.meta.env.BASE_URL}images/angela-grad-flowers.webp`,
                    category: 'Celebration',
                },
                {
                    id: 'mem-6',
                    title: 'Warmest Smiles',
                    date: 'Cherished Moments',
                    caption: "My favorite moments are the simple ones with you—your laughter, your smile, and even our little moments with our furry companion. You make ordinary days feel special. ❤️",
                    imageUrl: `${import.meta.env.BASE_URL}images/angela-couple-dog.webp`,
                    category: 'Precious Moments',
                },
            ],
        },
        cozyIgloo: {
            title: 'The Cozy Igloo',
            subtitle: 'A Personal Birthday Letter for Angela',
            badge: 'Destination II',
            sealLabel: 'Tap to Open Letter',
            letterTitle: 'Happy 22nd Birthday, My Love! 💗🎂',
            letterContent: `Welcome to Chapter 22 of your life! Now that we have both graduated, we are entering a new chapter filled with opportunities, challenges, and dreams that we hope to achieve. I know that we may not have everything figured out yet, and we cannot predict what the coming years will bring, but one thing I want you to be certain of is that I will continue to support you, no matter what happens.

Dai ta man aram kung ano an kapalaran ta sa mga maabot na taon, pero I believe that with strong faith, sincere prayers and determination, we will find our way. I pray that God will continue to guide us, give us strength during difficult times and lead us toward the future He has prepared for us.

As you continue searching for a job, I sincerely wish for you to find a stable opportunity that will allow you to grow, discover your potential and build the future you dream of. I hope you find a workplace where you feel comfortable, valued and appreciated—one that challenges you to become better without taking away your peace of mind. I know how much effort you are putting into this new chapter and I hope that all your hard work will soon lead you to the opportunity you deserve.

I also hope that this little gift will bring a smile to your face and make you feel extra special today. I may not always be able to give you everything you wish for, but I hope that through the things I do, you will always feel how much I care about you. I want you to have something that reminds you that you are loved, appreciated, and celebrated, not only on your birthday but also on the ordinary days when you need a little reminder of how wonderful you are.

And of course, we cannot forget our little Ewi, hehe. 🐶❤️ Our little baby is part of our story, too! I look forward to more moments with you and Elli, from our silly little adventures to the simple days when we are just spending time together. Maybe Elli does not understand how lucky we are to have each other, but I hope we can give our little fur baby a home filled with love, care, and happiness. I pray that we get to create more beautiful memories as our little family grows. You, me, and Ewi—our own little family, hehe. 🥹💗

As you turn 22, I hope you give yourself the same patience and kindness that you give to other people. You do not have to figure everything out immediately. Take your time, celebrate your little victories, learn from your mistake, challenges, and never be too hard on yourself when things do not go according to plan. I will always be proud of you, not only for the things you achieve but also for the person you are becoming.

May all your prayers be answered according to God's will. May He bless you with good health, peace of mind, happiness, wisdom and countless opportunities. May He protect you and your family, especially while you are far apart, and may He always remind you that distance can never lessen the love that binds your family together.

And as we continue this journey together, I pray that we will grow not only in our careers and dreams but also in our faith, understanding, patience, and love for one another. We may encounter uncertainties along the way, but I hope we will continue to encourage each other, celebrate each other's successes, and remain strong through life's challenges.

Happy birthday once again, my love! I hope Chapter 22 brings you closer to the life you have always prayed for. Never forget that I believe in you, I am proud of you, and I will always be rooting for you.

Enjoy your special day, love. You deserve all the beautiful things life has to offer. Thank you for being part of my life and for letting me be part of yours. I look forward to more birthdays, more adventures, more laughter, more dreams to achieve, and more memories with you and our little Ewi.

I love you so much, my love! 😘💗`,
            letterDatePlaceholder: 'October 22, 2026',
            letterSignoff: 'Your Boy Friend, Russelioo',
        },
        littleKeepsakes: {
            title: 'Little Keepsakes',
            subtitle: 'An Interactive Keepsake & Birthday Gift',
            badge: 'Destination III',
            giftPrompt: 'Tap the gift to unwrap your little birthday surprise 🎁',
            surpriseTitle: 'A Little Birthday Date 🤭💗',
            surpriseSubtitle: 'A little birthday surprise for the girl I\'ll always make time for. ❤️',
            surpriseMessage: 'I may have work to finish today, but that won\'t stop me from spending time with you on your special day. ❤️ I might have a few things to take care of, but I\'ll still be there to accompany you, make you smile, and create little memories together.\n\nYou don\'t need a grand celebration for me to be happy; just being able to spend time with you is already special.\n\nSo, birthday girl, get ready! Your date still has work to do, but he also has someone very special to accompany today. 🤭💗',
            surpriseKeepsakeType: 'From Your Boy Friend 💌',
        },
        finalSnowfall: {
            title: 'The Final Snowfall',
            subtitle: 'Beneath The Purple Auroras',
            badge: 'Destination IV',
            finalMessage: 'My love, no matter how busy life gets, I hope you always remember that you have a special place in my heart. I may not always have all the time in the world, but I\'ll keep finding ways to make you feel loved, appreciated, and special.\n\nToday, I may have work to finish, but that doesn\'t mean I don\'t want to be there for you. I want to celebrate you in my own little way, make you smile, and create another memory that we\'ll look back on someday.\n\nThank you for being my favorite person, my happiness, and someone I look forward to sharing life\'s little adventures with. Here\'s to more birthdays, more dates, more kulit moments, and more beautiful memories with you and our little Ewi.\n\nI love you, always. ❤️',
            closingSignoff: 'Forever & Always, Russelioo',
        },
    },
    effects: {
        snowflakeCount: 36,
        enableAuroras: true,
        enableFootprints: true,
    },
};
