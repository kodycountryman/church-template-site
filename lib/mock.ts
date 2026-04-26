// Typed mock data — same shape as the eventual Supabase rows.
// Phase 3 will swap these imports for server-side fetches.

export type Sermon = {
  slug: string;
  title: string;
  series: string;
  speaker: string;
  date: string;
  duration: string;
  scripture: string;
  cover: string;
  excerpt: string;
};

export type Series = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  count: number;
};

export type Event = {
  slug: string;
  title: string;
  description: string;
  starts: string;
  location: string;
  cover: string;
  rsvp: boolean;
  category: "Gathering" | "Outreach" | "Class" | "Family";
};

export type Ministry = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  cover: string;
  meets: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  cover: string;
  tag: string;
};

export type Leader = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
};

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const series: Series[] = [
  {
    slug: "the-long-obedience",
    title: "The Long Obedience",
    description: "A six-week study in Hebrews on what it means to keep showing up.",
    cover: u("photo-1490730141103-6cac27aaab94"),
    count: 6,
  },
  {
    slug: "rooted",
    title: "Rooted",
    description: "Foundations of the faith — five conversations for new and returning believers.",
    cover: u("photo-1518770660439-4636190af475"),
    count: 5,
  },
  {
    slug: "neighbor",
    title: "Neighbor",
    description: "A four-week summer series on loving the people next door.",
    cover: u("photo-1529156069898-49953e39b3ac"),
    count: 4,
  },
];

export const sermons: Sermon[] = [
  {
    slug: "on-rest-and-the-arithmetic-of-grace",
    title: "On rest, and the arithmetic of grace",
    series: "The Long Obedience",
    speaker: "James Eldridge",
    date: "Apr 21, 2026",
    duration: "38 min",
    scripture: "Hebrews 4:1–11",
    cover: u("photo-1507692049790-de58290a4334"),
    excerpt:
      "What does it mean to enter rest in a world that measures worth in output? Pastor Mara opens Hebrews 4 to look at the rhythm God built into the world — and the freedom it offers us.",
  },
  {
    slug: "a-better-country",
    title: "A better country",
    series: "The Long Obedience",
    speaker: "Daniel Kim",
    date: "Apr 14, 2026",
    duration: "41 min",
    scripture: "Hebrews 11:13–16",
    cover: u("photo-1438032005730-c779502df39b"),
    excerpt:
      "Hope as a verb — what it looks like to live as people from somewhere else, in love with the world we're in.",
  },
  {
    slug: "the-cloud-of-witnesses",
    title: "The cloud of witnesses",
    series: "The Long Obedience",
    speaker: "James Eldridge",
    date: "Apr 7, 2026",
    duration: "36 min",
    scripture: "Hebrews 12:1–3",
    cover: u("photo-1519834785169-98be25ec3f84"),
    excerpt:
      "We're not the first to walk this road. A look at the strange, beautiful crowd that came before us.",
  },
  {
    slug: "what-faith-actually-is",
    title: "What faith actually is",
    series: "Rooted",
    speaker: "Daniel Kim",
    date: "Mar 31, 2026",
    duration: "33 min",
    scripture: "Hebrews 11:1–6",
    cover: u("photo-1485808191679-5f86510681a2"),
    excerpt: "It's not certainty. It's not optimism. So what is it?",
  },
  {
    slug: "what-jesus-said-about-money",
    title: "What Jesus said about money",
    series: "Rooted",
    speaker: "James Eldridge",
    date: "Mar 24, 2026",
    duration: "39 min",
    scripture: "Matthew 6:19–24",
    cover: u("photo-1554224155-6726b3ff858f"),
    excerpt: "More than you might think. And more freeing than you might fear.",
  },
  {
    slug: "your-actual-neighbors",
    title: "Your actual neighbors",
    series: "Neighbor",
    speaker: "Priya Anand",
    date: "Mar 17, 2026",
    duration: "31 min",
    scripture: "Luke 10:25–37",
    cover: u("photo-1488521787991-ed7bbaae773c"),
    excerpt: "The parable hits different when we slow down to ask who's actually within reach.",
  },
];

export const events: Event[] = [
  {
    slug: "easter-sunday",
    title: "Easter Sunday",
    description:
      "Two combined services — 9 AM and 11 AM. Brunch on the lawn between services. Bring a friend; bring a chair.",
    starts: "2026-05-03T09:00:00",
    location: "412 Carver Street",
    cover: u("photo-1519491050282-80b3a0a1c7e5"),
    rsvp: false,
    category: "Gathering",
  },
  {
    slug: "neighborhood-block-party",
    title: "Neighborhood Block Party",
    description:
      "Free food, live music, kids' games, and a thousand new friends. Help us shut down the street and welcome the neighborhood.",
    starts: "2026-05-17T16:00:00",
    location: "Carver Street",
    cover: u("photo-1496024840928-4c417adf211d"),
    rsvp: true,
    category: "Outreach",
  },
  {
    slug: "membership-class",
    title: "Membership Class",
    description:
      "A two-hour intro to Kindred — what we believe, how we operate, and what membership means.",
    starts: "2026-05-24T13:00:00",
    location: "Fellowship Hall",
    cover: u("photo-1524178232363-1fb2b075b655"),
    rsvp: true,
    category: "Class",
  },
  {
    slug: "kids-summer-camp",
    title: "Kids Summer Camp",
    description:
      "Five days of games, outdoor adventures, and stories from Scripture for kids entering K–6th grade.",
    starts: "2026-06-22T09:00:00",
    location: "Camp Greenville",
    cover: u("photo-1503454537195-1dcabb73ffb9"),
    rsvp: true,
    category: "Family",
  },
  {
    slug: "midweek-prayer",
    title: "Midweek Prayer",
    description: "Quiet, candle-lit prayer service. 30 minutes. Walk in, walk out.",
    starts: "2026-05-07T19:00:00",
    location: "Sanctuary",
    cover: u("photo-1501594907352-04cda38ebc29"),
    rsvp: false,
    category: "Gathering",
  },
];

export const ministries: Ministry[] = [
  {
    slug: "small-groups",
    title: "Small Groups",
    summary: "Mid-week communities of 8–12 meeting in homes across the city.",
    description:
      "Small groups are the front porch of Kindred. They meet weekly, share meals, walk through Scripture, pray for each other, and figure out what it looks like to follow Jesus in normal life. We have groups in 14 neighborhoods and counting.",
    cover: u("photo-1529156069898-49953e39b3ac"),
    meets: "Weekly · 14 neighborhoods",
  },
  {
    slug: "kids",
    title: "Kindred Kids",
    summary: "Safe, fun, age-appropriate environments from infants through 6th grade.",
    description:
      "Background-checked volunteers, secure check-in, age-appropriate stories, and a whole lot of laughter. Available during both Sunday services.",
    cover: u("photo-1503454537195-1dcabb73ffb9"),
    meets: "Sundays · 9 & 11 AM",
  },
  {
    slug: "students",
    title: "Students",
    summary: "Middle and high school students gathering Wednesday nights.",
    description:
      "Honest conversations, real friendships, and a Bible we take seriously. 6:30–8:30 PM every Wednesday during the school year.",
    cover: u("photo-1529333166437-7750a6dd5a70"),
    meets: "Wednesdays · 6:30 PM",
  },
  {
    slug: "outreach",
    title: "Local Outreach",
    summary: "Tutoring, refugee resettlement, and partner schools across the city.",
    description:
      "We send teams every month into our partner schools, the resettlement office, and the food pantry on Howe. No special skills required.",
    cover: u("photo-1488521787991-ed7bbaae773c"),
    meets: "Monthly · Citywide",
  },
  {
    slug: "worship",
    title: "Worship & Arts",
    summary: "Musicians, vocalists, audio, lighting, and visual artists.",
    description:
      "If you make things — songs, sounds, images, environments — there's a place for your craft here. Auditions monthly.",
    cover: u("photo-1485579149621-3123dd979885"),
    meets: "Sundays + rehearsals",
  },
  {
    slug: "care",
    title: "Care Team",
    summary: "Meals, hospital visits, grief care, and crisis support.",
    description:
      "When life breaks down, the Care Team shows up. Cooked meals, listening ears, hospital sits, and connection to professional resources when needed.",
    cover: u("photo-1469571486292-0ba58a3f068b"),
    meets: "On call",
  },
];

export const posts: Post[] = [
  {
    slug: "what-we-mean-when-we-say-belong-before-believe",
    title: "What we mean when we say 'belong before believe'",
    excerpt:
      "It's our most-quoted line. It's also the one that confuses people the most. Here's what we actually mean — and what we don't.",
    body: "",
    author: "James Eldridge",
    authorAvatar: u("photo-1519085360753-af0119f7cbe7", 200),
    date: "Apr 18, 2026",
    readTime: "6 min",
    cover: u("photo-1529156069898-49953e39b3ac"),
    tag: "Vision",
  },
  {
    slug: "a-quarterly-budget-update",
    title: "A quarterly budget update",
    excerpt:
      "Where every dollar went between January and March, in plain English. We do this every quarter.",
    body: "",
    author: "Daniel Kim",
    authorAvatar: u("photo-1507003211169-0a1dd7228f2d", 200),
    date: "Apr 10, 2026",
    readTime: "9 min",
    cover: u("photo-1554224155-6726b3ff858f"),
    tag: "Generosity",
  },
  {
    slug: "on-the-quiet-discipline-of-paying-attention",
    title: "On the quiet discipline of paying attention",
    excerpt:
      "A short reflection on what slows us down enough to actually love the people in front of us.",
    body: "",
    author: "Priya Anand",
    authorAvatar: u("photo-1573497019940-1c28c88b4f3e", 200),
    date: "Apr 3, 2026",
    readTime: "4 min",
    cover: u("photo-1469474968028-56623f02e42e"),
    tag: "Practice",
  },
  {
    slug: "five-questions-we-keep-getting-asked",
    title: "Five questions we keep getting asked",
    excerpt:
      "Honest answers to the things people are too polite to bring up at the welcome table.",
    body: "",
    author: "James Eldridge",
    authorAvatar: u("photo-1519085360753-af0119f7cbe7", 200),
    date: "Mar 27, 2026",
    readTime: "8 min",
    cover: u("photo-1517457373958-b7bdd4587205"),
    tag: "FAQ",
  },
];

export const leaders: Leader[] = [
  {
    name: "James Eldridge",
    role: "Lead Pastor",
    bio: "James has been preaching at Kindred since the church planted in 2019. Master's from Duke Divinity. Married to Sara, dad to two.",
    avatar: u("photo-1519085360753-af0119f7cbe7", 600),
  },
  {
    name: "Daniel Kim",
    role: "Teaching Pastor",
    bio: "Daniel oversees teaching, equipping, and the membership pathway. Formerly a high school teacher; still talks like one.",
    avatar: u("photo-1507003211169-0a1dd7228f2d", 600),
  },
  {
    name: "Priya Anand",
    role: "Pastor of Care",
    bio: "Priya leads the care team and counseling network. LCSW. The person you actually want with you in a hospital waiting room.",
    avatar: u("photo-1573497019940-1c28c88b4f3e", 600),
  },
  {
    name: "Marcus Hill",
    role: "Worship Director",
    bio: "Marcus leads the music team. Songwriter, producer, and the reason our space sounds the way it does.",
    avatar: u("photo-1500648767791-00dcc994a43e", 600),
  },
  {
    name: "Hannah Brooks",
    role: "Kids Director",
    bio: "Hannah runs Kindred Kids and keeps 200 children laughing every week. Background in early childhood education.",
    avatar: u("photo-1487412720507-e7ab37603c6f", 600),
  },
  {
    name: "Owen Park",
    role: "Operations",
    bio: "Owen keeps the building, the budget, and the back office running. Former startup CFO.",
    avatar: u("photo-1472099645785-5658abf4ff4e", 600),
  },
];

export const beliefs = [
  {
    title: "Scripture",
    body: "We hold the Bible to be true, trustworthy, and the final authority for what we believe and how we live.",
  },
  {
    title: "Jesus",
    body: "We believe Jesus is fully God and fully human — that he lived, died, rose, and reigns, and that following him changes everything.",
  },
  {
    title: "The Spirit",
    body: "We believe the Holy Spirit is alive and at work — comforting, convicting, gifting, and forming the people of God.",
  },
  {
    title: "The Church",
    body: "We believe the church is a family — local, embodied, and accountable. Membership matters. Showing up matters.",
  },
  {
    title: "The Kingdom",
    body: "We believe Jesus is making all things new, and we get to participate. That shapes how we work, give, parent, and vote.",
  },
  {
    title: "Hospitality",
    body: "We believe a welcome table is the most subversive thing we can offer. Belong before you believe — we mean it.",
  },
];
