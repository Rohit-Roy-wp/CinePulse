export interface Festival {
  id: string;
  name: string;
  startDate: string; // "MM-DD"
  endDate: string;   // "MM-DD"
  year?: number;     // Optional specific year restriction (e.g. 2026)
  icon: string;
  greetingTitle: string;
  greetingText: string;
  theme: {
    borderClass: string;
    textClass: string;
    glowClass: string;
  };
}

export const FESTIVALS_CALENDAR: Festival[] = [
  // 1. Diwali Season (Active right now in Nov 2026)
  {
    id: "diwali-2026",
    name: "Diwali",
    startDate: "11-06",
    endDate: "11-13",
    year: 2026,
    icon: "🪔",
    greetingTitle: "Happy Diwali from The Cineverse!",
    greetingText: "May your festive season be illuminated with joy, warmth & blockbuster cinema.",
    theme: {
      borderClass: "border-amber-500/20",
      textClass: "text-amber-300",
      glowClass: "via-amber-500/10",
    },
  },
  // 2. Christmas
  {
    id: "christmas",
    name: "Christmas",
    startDate: "12-23",
    endDate: "12-26",
    icon: "🎄",
    greetingTitle: "Merry Christmas from The Cineverse!",
    greetingText: "Wishing you a magical holiday season filled with warmth, love & classic cinema nights.",
    theme: {
      borderClass: "border-red-500/20",
      textClass: "text-red-400",
      glowClass: "via-red-500/10",
    },
  },
  // 3. New Year Celebration (Crosses Year boundary Dec 30 -> Jan 02)
  {
    id: "new-year",
    name: "New Year",
    startDate: "12-30",
    endDate: "01-02",
    icon: "✨",
    greetingTitle: "Happy New Year from The Cineverse!",
    greetingText: "Here's to 365 days of extraordinary stories, big-screen blockbusters & great health.",
    theme: {
      borderClass: "border-amber-400/20",
      textClass: "text-amber-300",
      glowClass: "via-amber-400/10",
    },
  },
  // 4. Republic Day
  {
    id: "republic-day",
    name: "Republic Day",
    startDate: "01-25",
    endDate: "01-27",
    icon: "🇮🇳",
    greetingTitle: "Happy Republic Day! 🇮🇳",
    greetingText: "Celebrating the vibrant spirit, unity, and 100+ years of timeless Indian cinema.",
    theme: {
      borderClass: "border-orange-500/20",
      textClass: "text-orange-400",
      glowClass: "via-orange-500/10",
    },
  },
  // 5. Holi
  {
    id: "holi-2026",
    name: "Holi",
    startDate: "03-02",
    endDate: "03-05",
    year: 2026,
    icon: "🎨",
    greetingTitle: "Happy Holi from The Cineverse!",
    greetingText: "May your life be painted in the vibrant colours of joy, music & cinematic wonder.",
    theme: {
      borderClass: "border-pink-500/20",
      textClass: "text-pink-400",
      glowClass: "via-pink-500/10",
    },
  },
  // 6. Eid al-Fitr
  {
    id: "eid-2026",
    name: "Eid Mubarak",
    startDate: "03-19",
    endDate: "03-22",
    year: 2026,
    icon: "🌙",
    greetingTitle: "Eid Mubarak from The Cineverse!",
    greetingText: "Wishing immense peace, blessings, prosperity, and joyous celebrations to all.",
    theme: {
      borderClass: "border-emerald-500/20",
      textClass: "text-emerald-400",
      glowClass: "via-emerald-500/10",
    },
  },
  // 7. Independence Day
  {
    id: "independence-day",
    name: "Independence Day",
    startDate: "08-14",
    endDate: "08-16",
    icon: "🇮🇳",
    greetingTitle: "Happy Independence Day! 🇮🇳",
    greetingText: "Honouring freedom, courage, and more than a century of timeless Indian storytelling.",
    theme: {
      borderClass: "border-orange-500/20",
      textClass: "text-orange-400",
      glowClass: "via-orange-500/10",
    },
  },
];

export function isFestivalActive(festival: Festival, date: Date = new Date()): boolean {
  const currentYear = date.getFullYear();

  if (festival.year !== undefined && festival.year !== currentYear) {
    return false;
  }

  const pad = (n: number) => n.toString().padStart(2, "0");
  const currentMMDD = `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

  if (festival.startDate <= festival.endDate) {
    return currentMMDD >= festival.startDate && currentMMDD <= festival.endDate;
  }

  return currentMMDD >= festival.startDate || currentMMDD <= festival.endDate;
}

export function getActiveFestival(date: Date = new Date()): Festival | null {
  for (const festival of FESTIVALS_CALENDAR) {
    if (isFestivalActive(festival, date)) {
      return festival;
    }
  }
  return null;
}
