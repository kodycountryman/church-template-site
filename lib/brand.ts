export const brand = {
  name: "Kindred",
  longName: "Kindred Church",
  tagline: "A place to belong before you believe.",
  description:
    "Kindred is a community in the city — gathering Sundays, growing through the week, sent to love our neighbors.",
  address: {
    line1: "412 Carver Street",
    line2: "Greenville, SC 29601",
    city: "Greenville",
    region: "SC",
    postal: "29601",
    country: "US",
  },
  services: [
    { day: "Sunday", time: "9:00 AM" },
    { day: "Sunday", time: "11:00 AM" },
  ],
  contact: {
    email: "hello@kindred.church",
    phone: "(864) 555-0142",
  },
  socials: {
    instagram: "https://instagram.com/kindredchurch",
    youtube: "https://youtube.com/@kindredchurch",
    spotify: "https://open.spotify.com/show/kindredchurch",
  },
  // Easy rebrand surface — change these and the entire palette + type updates.
  colors: {
    bg: "#FFFFFF",
    ink: "#0A0A0A",
    accent: "#2563EB",
    muted: "#6B7280",
  },
} as const;

export type Brand = typeof brand;
