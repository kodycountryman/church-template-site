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
  tagline?: string;
  stats?: { label: string; value: string }[];
  steps?: { title: string; body: string }[];
  programs?: { title: string; body: string; when: string }[];
  faqs?: { q: string; a: string }[];
  leader?: { name: string; role: string; avatar: string; quote: string };
  gallery?: string[]; // Unsplash photo IDs only, no full URLs
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
  {
    slug: "uncommon-ground",
    title: "Uncommon Ground",
    description: "How to stay in the room when everything pulls us toward our corners.",
    cover: u("photo-1521737711867-e3b97375f902"),
    count: 4,
  },
];

export const sermons: Sermon[] = [
  // ── The Long Obedience ──────────────────────────────────────────────────
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
      "What does it mean to enter rest in a world that measures worth in output? James opens Hebrews 4 to look at the rhythm God built into creation — and the freedom it offers us.",
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
    slug: "the-discipline-of-beginning-again",
    title: "The discipline of beginning again",
    series: "The Long Obedience",
    speaker: "Priya Anand",
    date: "Mar 31, 2026",
    duration: "34 min",
    scripture: "Hebrews 3:12–14",
    cover: u("photo-1506905925346-21bda4d32df4"),
    excerpt:
      "Why repentance isn't a crisis moment — it's a daily practice. And why that's actually good news.",
  },
  {
    slug: "when-god-seems-slow",
    title: "When God seems slow",
    series: "The Long Obedience",
    speaker: "James Eldridge",
    date: "Mar 24, 2026",
    duration: "40 min",
    scripture: "Hebrews 6:9–12",
    cover: u("photo-1470770841072-f978cf4d019e"),
    excerpt:
      "The gap between the promise and the fulfilment is not wasted time. James walks through what faithfulness looks like in the waiting.",
  },
  {
    slug: "the-anchor-holds",
    title: "The anchor holds",
    series: "The Long Obedience",
    speaker: "Daniel Kim",
    date: "Mar 17, 2026",
    duration: "37 min",
    scripture: "Hebrews 6:13–20",
    cover: u("photo-1504701954957-2010ec3bcec1"),
    excerpt:
      "When everything else gives way, what are you actually holding onto? An honest look at the hope that doesn't move.",
  },

  // ── Rooted ──────────────────────────────────────────────────────────────
  {
    slug: "what-faith-actually-is",
    title: "What faith actually is",
    series: "Rooted",
    speaker: "Daniel Kim",
    date: "Mar 10, 2026",
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
    date: "Mar 3, 2026",
    duration: "39 min",
    scripture: "Matthew 6:19–24",
    cover: u("photo-1554224155-6726b3ff858f"),
    excerpt: "More than you might think. And more freeing than you might fear.",
  },
  {
    slug: "prayer-for-people-who-gave-up-on-it",
    title: "Prayer for people who gave up on it",
    series: "Rooted",
    speaker: "Priya Anand",
    date: "Feb 24, 2026",
    duration: "35 min",
    scripture: "Matthew 6:5–15",
    cover: u("photo-1506126613408-eca07ce68773"),
    excerpt:
      "For everyone who found prayer weird, performative, or unanswered. A fresh start with one of the oldest practices.",
  },
  {
    slug: "what-the-church-is-actually-for",
    title: "What the church is actually for",
    series: "Rooted",
    speaker: "James Eldridge",
    date: "Feb 17, 2026",
    duration: "42 min",
    scripture: "Acts 2:42–47",
    cover: u("photo-1529156069898-49953e39b3ac"),
    excerpt:
      "Not a building, not a brand. The early church gives us a picture of something stranger and better.",
  },
  {
    slug: "reading-the-bible-without-losing-your-mind",
    title: "Reading the Bible without losing your mind",
    series: "Rooted",
    speaker: "Daniel Kim",
    date: "Feb 10, 2026",
    duration: "38 min",
    scripture: "2 Timothy 3:14–17",
    cover: u("photo-1457369804613-52c61a468e7d"),
    excerpt:
      "Honest tools for approaching Scripture — context, genre, and why it matters who wrote what to whom.",
  },

  // ── Neighbor ────────────────────────────────────────────────────────────
  {
    slug: "your-actual-neighbors",
    title: "Your actual neighbors",
    series: "Neighbor",
    speaker: "Priya Anand",
    date: "Feb 3, 2026",
    duration: "31 min",
    scripture: "Luke 10:25–37",
    cover: u("photo-1488521787991-ed7bbaae773c"),
    excerpt: "The parable hits different when we slow down to ask who's actually within reach.",
  },
  {
    slug: "the-inconvenient-ones",
    title: "The inconvenient ones",
    series: "Neighbor",
    speaker: "James Eldridge",
    date: "Jan 27, 2026",
    duration: "36 min",
    scripture: "Matthew 25:31–46",
    cover: u("photo-1469571486292-0ba58a3f068b"),
    excerpt:
      "The people who interrupt our plans might be the point. A hard look at the sheep and the goats.",
  },
  {
    slug: "when-it-costs-something",
    title: "When it costs something",
    series: "Neighbor",
    speaker: "Daniel Kim",
    date: "Jan 20, 2026",
    duration: "33 min",
    scripture: "Luke 14:12–14",
    cover: u("photo-1531482615713-2afd69097998"),
    excerpt: "Generosity that expects nothing back. Why Jesus is suspicious of neat reciprocity.",
  },
  {
    slug: "nearby-and-far-away",
    title: "Nearby and far away",
    series: "Neighbor",
    speaker: "Priya Anand",
    date: "Jan 13, 2026",
    duration: "30 min",
    scripture: "Romans 15:1–7",
    cover: u("photo-1522202176988-66273c2fd55f"),
    excerpt: "How to hold local and global together without numbing out or burning out.",
  },

  // ── Uncommon Ground ─────────────────────────────────────────────────────
  {
    slug: "staying-in-the-room",
    title: "Staying in the room",
    series: "Uncommon Ground",
    speaker: "James Eldridge",
    date: "Jan 6, 2026",
    duration: "44 min",
    scripture: "Romans 12:14–21",
    cover: u("photo-1521737711867-e3b97375f902"),
    excerpt:
      "Why the hardest thing is often just not leaving. A look at Romans 12 and the call to stay.",
  },
  {
    slug: "the-art-of-disagreeing-well",
    title: "The art of disagreeing well",
    series: "Uncommon Ground",
    speaker: "Daniel Kim",
    date: "Dec 30, 2025",
    duration: "37 min",
    scripture: "Philippians 4:2–5",
    cover: u("photo-1517048676732-d65bc937f952"),
    excerpt:
      "Paul names two people in a fight — in front of the whole church. What we can learn from that kind of honesty.",
  },
  {
    slug: "when-the-table-gets-complicated",
    title: "When the table gets complicated",
    series: "Uncommon Ground",
    speaker: "Priya Anand",
    date: "Dec 23, 2025",
    duration: "32 min",
    scripture: "1 Corinthians 11:17–26",
    cover: u("photo-1414235077428-338989a2e8c0"),
    excerpt: "The early church had table problems too. Communion as the practice that keeps pulling us back.",
  },
  {
    slug: "curiosity-as-a-spiritual-practice",
    title: "Curiosity as a spiritual practice",
    series: "Uncommon Ground",
    speaker: "James Eldridge",
    date: "Dec 16, 2025",
    duration: "39 min",
    scripture: "Proverbs 18:2, 13",
    cover: u("photo-1499750310107-5fef28a66643"),
    excerpt:
      "What if the posture of the gospel is a question, not an answer? A case for holy curiosity.",
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
    tagline: "Where church gets real.",
    stats: [
      { label: "Neighborhoods", value: "14" },
      { label: "Active groups", value: "42" },
      { label: "People", value: "480+" },
      { label: "Avg group size", value: "10" },
    ],
    steps: [
      {
        title: "Find a group",
        body: "Browse by neighborhood, life stage, or topic. We'll match you if you're not sure where to start.",
      },
      {
        title: "Try it for a month",
        body: "Show up, eat food, meet people. No commitment required for the first four weeks.",
      },
      {
        title: "Belong",
        body: "Most people say the group becomes the best part of their week within the first month.",
      },
    ],
    programs: [
      {
        title: "Geographic groups",
        body: "Meet people in your actual neighborhood. 14 areas covered.",
        when: "Various nights",
      },
      {
        title: "Life-stage groups",
        body: "Young professionals, parents of young kids, empty nesters, singles.",
        when: "Various nights",
      },
      {
        title: "Topical groups",
        body: "Scripture study, book clubs, recovery, marriage.",
        when: "Various nights",
      },
    ],
    faqs: [
      {
        q: "How do I find the right group for me?",
        a: "We have groups in 14 neighborhoods, across different life stages, and focused on different topics. You can browse on this page and filter by what matters most to you — or fill out the form and we'll suggest two or three options that fit your situation.",
      },
      {
        q: "What actually happens at a small group?",
        a: "Most groups share a meal, spend some time in Scripture or a book together, and then pray for each other before heading home. The format varies by group, but that rhythm is pretty consistent. It's low-key on purpose.",
      },
      {
        q: "I'm new to Kindred — is a small group a good first step?",
        a: "It's one of the best first steps. Sunday services are great, but groups are where you actually meet people. Most folks who've been here a while will tell you the group is what made them stay.",
      },
      {
        q: "Do I have to commit to a whole year?",
        a: "No. We ask people to try a group for four weeks before deciding if it's a fit. After that, commitment is between you and the group. We're not going to guilt you about attendance — life is complicated.",
      },
    ],
    leader: {
      name: "James Eldridge",
      role: "Lead Pastor",
      avatar: "photo-1519085360753-af0119f7cbe7",
      quote:
        "The living room is where we figured out what kind of church we wanted to be. That hasn't changed.",
    },
    gallery: [
      "photo-1529156069898-49953e39b3ac",
      "photo-1543269865-cbf427effbad",
      "photo-1511988617509-a57c8a288659",
      "photo-1528605248644-14dd04022da1",
    ],
  },
  {
    slug: "kids",
    title: "Kindred Kids",
    summary: "Safe, fun, age-appropriate environments from infants through 6th grade.",
    description:
      "Background-checked volunteers, secure check-in, age-appropriate stories, and a whole lot of laughter. Available during both Sunday services.",
    cover: u("photo-1503454537195-1dcabb73ffb9"),
    meets: "Sundays · 9 & 11 AM",
    tagline: "Church for every age.",
    stats: [
      { label: "Kids weekly", value: "200+" },
      { label: "Volunteers", value: "45+" },
      { label: "Age range", value: "0–12" },
      { label: "Check-in time", value: "<2 min" },
    ],
    steps: [
      {
        title: "Check in",
        body: "Three secure kiosks at the main entrance. First visit takes 5 minutes; every week after takes under 2.",
      },
      {
        title: "Find your room",
        body: "Greeters walk your child to their room. Color-coded wristbands match parent tags for pickup.",
      },
      {
        title: "Pick up happy",
        body: "Same door, same greeter. We'll page you if anything comes up during service.",
      },
    ],
    programs: [
      {
        title: "Nursery",
        body: "Caring for infants and toddlers in a calm, clean environment.",
        when: "Sundays 9 & 11 AM · Ages 0–18 mo",
      },
      {
        title: "Toddlers",
        body: "Simple songs, short stories, and a lot of sensory play.",
        when: "Sundays 9 & 11 AM · Ages 18 mo–3",
      },
      {
        title: "Preschool",
        body: "Big truths in small words. Our preschool team is exceptional.",
        when: "Sundays 9 & 11 AM · Ages 3–5",
      },
      {
        title: "Elementary",
        body: "Active, age-appropriate Bible teaching for K–6. Kids love this room.",
        when: "Sundays 9 & 11 AM · Grades K–6",
      },
    ],
    faqs: [
      {
        q: "What's your safety policy?",
        a: "Every volunteer is background-checked and trained before working with kids. We use a secure tag-based check-in system — children are only released to the adult who checked them in. We take this seriously.",
      },
      {
        q: "My child has a food allergy. Is that okay?",
        a: "Yes. We have a nut-aware policy across all kids' rooms, and we collect allergy information at check-in. If your child has a severe allergy, let us know and we'll talk through what we can do to accommodate them.",
      },
      {
        q: "What does first-visit check-in look like?",
        a: "The first visit takes about 5 minutes. You'll enter your family info at the kiosk, print a name tag for your child and a matching claim tag for you, and a greeter will walk you to the room. Every visit after that is under 2 minutes.",
      },
      {
        q: "How can I volunteer?",
        a: "We love volunteers. Fill out the form on this page or reach out directly. You'll need to complete a background check and attend one orientation session. After that, we'll find a room that's a good fit for you.",
      },
      {
        q: "My child has special needs. Can you accommodate them?",
        a: "We want every child to feel known and included. Reach out to Hannah before your first visit and we'll have a conversation about what your child needs and how we can serve them well.",
      },
    ],
    leader: {
      name: "Hannah Brooks",
      role: "Kids Director",
      avatar: "photo-1487412720507-e7ab37603c6f",
      quote:
        "Every kid that walks in our door should leave knowing they are known, safe, and loved. That's the whole job.",
    },
    gallery: [
      "photo-1503454537195-1dcabb73ffb9",
      "photo-1472162072942-cd5147eb3902",
      "photo-1448401743979-9bef4e7a2cb6",
      "photo-1560969184-10fe8719e047",
    ],
  },
  {
    slug: "students",
    title: "Students",
    summary: "Middle and high school students gathering Wednesday nights.",
    description:
      "Honest conversations, real friendships, and a Bible we take seriously. 6:30–8:30 PM every Wednesday during the school year.",
    cover: u("photo-1529333166437-7750a6dd5a70"),
    meets: "Wednesdays · 6:30 PM",
    tagline: "A place to ask hard questions.",
    stats: [
      { label: "Students", value: "90+" },
      { label: "Leaders", value: "14" },
      { label: "Camps/yr", value: "2" },
      { label: "Years running", value: "7" },
    ],
    steps: [
      {
        title: "Wednesday nights",
        body: "Show up at 6:30. We start with food and hang time, move into worship, then a message and small groups by 7:30.",
      },
      {
        title: "Find your crew",
        body: "Small groups of 6–8 split by grade and gender. Same group all year — they become your people.",
      },
      {
        title: "Go deeper",
        body: "Leadership track, summer camp, and service trips for students who want more.",
      },
    ],
    programs: [
      {
        title: "Middle School",
        body: "6th–8th grade. A safe, energetic environment for the most chaotic years of life.",
        when: "Wednesdays 6:30–8:30 PM",
      },
      {
        title: "High School",
        body: "9th–12th grade. Deeper conversations, more responsibility, and a lot of fun.",
        when: "Wednesdays 6:30–8:30 PM",
      },
      {
        title: "Summer Camp",
        body: "Five days, deep in the woods, disconnected from everything. Transformative.",
        when: "July · Annual",
      },
      {
        title: "Senior Sendoff",
        body: "We celebrate every graduating senior and stay connected through college.",
        when: "May · Annual",
      },
    ],
    faqs: [
      {
        q: "Where do 6th graders land — kids or students?",
        a: "6th grade is the first year of middle school, so they're with Students. If your 6th grader feels more comfortable staying in Elementary for a semester, we can talk about that — we'll follow their lead.",
      },
      {
        q: "How involved are parents?",
        a: "We love engaged parents. We send a weekly update email with what was covered and a question to discuss at home. We also host two parent nights per year. You won't be in the dark about what's happening.",
      },
      {
        q: "What does a Wednesday night actually look like?",
        a: "Doors open at 6:15. Food and hang time from 6:30–7:00. Then worship together, a message (20–25 min), and small groups by grade until 8:30. It's high-energy but has real substance.",
      },
      {
        q: "How do you handle safety on Wednesday nights?",
        a: "Every leader is background-checked and trained. Students are signed in at arrival, and we have a clear sign-out process. We don't release students to anyone who isn't on their approved list.",
      },
    ],
    leader: {
      name: "Owen Park",
      role: "Students Director",
      avatar: "photo-1500648767791-00dcc994a43e",
      quote:
        "Teenagers aren't a problem to manage. They're the most interesting people in the room. We treat them that way.",
    },
    gallery: [
      "photo-1529333166437-7750a6dd5a70",
      "photo-1477346611705-65d1883cee1e",
      "photo-1511988617509-a57c8a288659",
      "photo-1523240795612-9a054b0db644",
    ],
  },
  {
    slug: "outreach",
    title: "Local Outreach",
    summary: "Tutoring, refugee resettlement, and partner schools across the city.",
    description:
      "We send teams every month into our partner schools, the resettlement office, and the food pantry on Howe. No special skills required.",
    cover: u("photo-1488521787991-ed7bbaae773c"),
    meets: "Monthly · Citywide",
    tagline: "Love your neighborhood.",
    stats: [
      { label: "Partner orgs", value: "8" },
      { label: "Families served", value: "600+" },
      { label: "Volunteer hours", value: "2,400/yr" },
      { label: "Years active", value: "5" },
    ],
    steps: [
      {
        title: "Pick a track",
        body: "Tutoring, food pantry, refugee resettlement, or school partnership. Each has different time commitments.",
      },
      {
        title: "Get oriented",
        body: "30-minute orientation the week before your first serve day. We'll tell you everything you need to know.",
      },
      {
        title: "Show up monthly",
        body: "Most tracks ask for one Saturday per month. Some are weekday afternoons. We work around your schedule.",
      },
    ],
    programs: [
      {
        title: "After-School Tutoring",
        body: "Reading and math support at two partner elementary schools on the west side.",
        when: "Tue & Thu · 3–5 PM during school year",
      },
      {
        title: "Refugee Welcome",
        body: "Partnering with local resettlement office — airport pickups, furniture, English practice.",
        when: "Ongoing · As needed",
      },
      {
        title: "Food Pantry",
        body: "Monthly packing and distribution at Howe Street. Families, friendly, no experience needed.",
        when: "First Saturday · 9 AM–12 PM",
      },
      {
        title: "School Partnership",
        body: "Mentoring, reading, and special events at two Title I schools.",
        when: "Monthly during school year",
      },
    ],
    faqs: [
      {
        q: "How much time does this actually take?",
        a: "Most tracks require one Saturday morning per month (about 3 hours). Tutoring is twice a week for 2 hours each session during the school year. We're flexible — let us know your schedule and we'll find a fit.",
      },
      {
        q: "Can I bring my family or kids?",
        a: "The food pantry is very family-friendly — we often have kids helping sort and bag. Tutoring requires volunteers to be at least 16. Refugee welcome varies by assignment. We'll let you know what makes sense.",
      },
      {
        q: "Do I need any special skills?",
        a: "No. Genuine interest and showing up consistently are the two things that matter most. We'll train you for anything else. Tutoring does ask for some comfort with reading or basic math, but nothing advanced.",
      },
      {
        q: "What if I want to give money instead of time?",
        a: "We have both. Financial gifts go directly to our partner organizations and help cover supplies, transportation, and staff. You can designate a gift to a specific program. Talk to Marcus if you want to know more.",
      },
    ],
    leader: {
      name: "Marcus Hill",
      role: "Outreach Pastor",
      avatar: "photo-1507003211169-0a1dd7228f2d",
      quote:
        "Service isn't a program we run — it's a posture we practice. The neighborhood is our congregation too.",
    },
    gallery: [
      "photo-1488521787991-ed7bbaae773c",
      "photo-1469571486292-0ba58a3f068b",
      "photo-1531482615713-2afd69097998",
      "photo-1522202176988-66273c2fd55f",
    ],
  },
  {
    slug: "worship",
    title: "Worship & Arts",
    summary: "Musicians, vocalists, audio, lighting, and visual artists.",
    description:
      "If you make things — songs, sounds, images, environments — there's a place for your craft here. Auditions monthly.",
    cover: u("photo-1485579149621-3123dd979885"),
    meets: "Sundays + rehearsals",
    tagline: "Every gift has a place here.",
    stats: [
      { label: "Team members", value: "35+" },
      { label: "Services/week", value: "2" },
      { label: "Rehearsals/mo", value: "4" },
      { label: "Roles", value: "12+" },
    ],
    steps: [
      {
        title: "Express interest",
        body: "Fill out the form below. Tell us your instrument or role, your experience, and what you're hoping for.",
      },
      {
        title: "Coffee & conversation",
        body: "We'll have a relaxed conversation — not an audition — with our worship director to learn about you.",
      },
      {
        title: "Shadow a Sunday",
        body: "Come experience a Sunday from the inside before committing. See if it feels right.",
      },
      {
        title: "Join a team",
        body: "We rotate 4 teams across 8 Sundays each. Rehearsals are Thursday evenings.",
      },
    ],
    programs: [
      {
        title: "Band & Vocals",
        body: "Guitars, keys, bass, drums, and vocalists. All styles of contemporary worship.",
        when: "Thursdays 7 PM + Sundays",
      },
      {
        title: "Audio & Lighting",
        body: "Front-of-house, monitors, and lighting for both services. Training provided.",
        when: "Sundays + tech rehearsal",
      },
      {
        title: "Creative Arts",
        body: "Graphic design, video, motion graphics, and environmental design for the worship space.",
        when: "Project-based",
      },
      {
        title: "Photography & Film",
        body: "Capturing Sunday mornings, events, and ministry moments.",
        when: "Rotating Sundays",
      },
    ],
    faqs: [
      {
        q: "Do I need to be a professional musician?",
        a: "No. We have people on the team at all levels. What we're looking for is musical competence, character, and a heart for worship — not a performance resume. If you're unsure whether you're ready, come have a conversation with Daniel.",
      },
      {
        q: "Is there an audition?",
        a: "We call it a conversation, not an audition. For instrumentalists, we may ask you to play something together in a relaxed setting — less to evaluate and more to understand where you are. The process is designed to be comfortable.",
      },
      {
        q: "What's the time commitment?",
        a: "Most team members serve two Sundays per month (one per team rotation). Add one Thursday evening rehearsal per month. For tech and creative roles, it varies by project. We'll be upfront about expectations before you commit.",
      },
      {
        q: "Does the church provide instruments and gear?",
        a: "Yes. We have a full backline — amps, drums, keys, DI boxes. Instrumentalists are welcome to bring their own gear if they prefer. Vocalists don't need to bring anything.",
      },
      {
        q: "Is there an online worship team?",
        a: "We stream both Sunday services, and our video team handles that production. If you're interested in the streaming side — camera operation, live switching, graphics — reach out and we'll connect you with that crew.",
      },
    ],
    leader: {
      name: "Daniel Kim",
      role: "Teaching & Worship Pastor",
      avatar: "photo-1507003211169-0a1dd7228f2d",
      quote:
        "We're not trying to produce a concert. We're trying to create a room where it's easy to encounter God.",
    },
    gallery: [
      "photo-1485579149621-3123dd979885",
      "photo-1470229722913-7c0e2dbbafd3",
      "photo-1501281668745-f7f57925c3b4",
      "photo-1493225457124-a3eb161ffa5f",
    ],
  },
  {
    slug: "care",
    title: "Care Team",
    summary: "Meals, hospital visits, grief care, and crisis support.",
    description:
      "When life breaks down, the Care Team shows up. Cooked meals, listening ears, hospital sits, and connection to professional resources when needed.",
    cover: u("photo-1469571486292-0ba58a3f068b"),
    meets: "On call",
    tagline: "Nobody walks through it alone.",
    stats: [
      { label: "Care volunteers", value: "22" },
      { label: "Families served", value: "120+ this year" },
      { label: "Response time", value: "<24 hours" },
      { label: "Partner counselors", value: "6" },
    ],
    steps: [
      {
        title: "Reach out",
        body: "Email care@kindred.church or fill out the form. You can also ask any pastor or greeter — we'll get you connected.",
      },
      {
        title: "Get matched",
        body: "A care volunteer will reach out within 24 hours. We try to match based on your situation and personality.",
      },
      {
        title: "Receive care",
        body: "What that looks like is up to you. A meal, a visit, a phone call, a referral. We follow your lead.",
      },
    ],
    programs: [
      {
        title: "Meal Train",
        body: "Hot meals delivered during illness, new babies, surgery, or grief. No request too small.",
        when: "Ongoing · As needed",
      },
      {
        title: "Hospital & Home Visits",
        body: "Trained volunteers who simply show up and sit with you. Sometimes that's everything.",
        when: "Ongoing · On request",
      },
      {
        title: "Grief Group",
        body: "A monthly gathering for anyone navigating loss — recent or long-standing.",
        when: "First Thursday · 6:30 PM",
      },
      {
        title: "Crisis Support",
        body: "Same-day connection to pastoral care and professional counseling referrals.",
        when: "24/7 · care@kindred.church",
      },
    ],
    faqs: [
      {
        q: "Is what I share confidential?",
        a: "Yes. Care conversations are held in confidence by our team. The only exception is if someone discloses intent to harm themselves or others — in that case we are obligated to act. Otherwise, your situation stays within our care team.",
      },
      {
        q: "How do I request care?",
        a: "Email care@kindred.church, fill out the form on this page, or speak to any pastor or greeter on Sunday. We aim to respond within 24 hours. You don't need to be a member to request care — anyone in our community is welcome.",
      },
      {
        q: "How do I join the care team as a volunteer?",
        a: "Fill out the form and let us know you're interested in serving. We have an orientation and some light training — mostly around listening well and knowing when to refer. No clinical background required, just a genuine, steady presence.",
      },
      {
        q: "Do you offer professional counseling?",
        a: "We have six licensed counselors in our network who offer sliding-scale rates for Kindred community members. We can make a referral and help you get connected. We don't provide clinical services directly, but we can get you to people who do.",
      },
      {
        q: "Someone I know is struggling. Can I request care on their behalf?",
        a: "You can reach out and let us know about someone you're concerned for. We'll advise you on how to support them and, if appropriate, reach out to them directly — though we always follow the person's lead on what they want.",
      },
    ],
    leader: {
      name: "Priya Anand",
      role: "Pastor of Care",
      avatar: "photo-1573497019940-1c28c88b4f3e",
      quote:
        "People think they're asking for too much. They never are. Asking for help is one of the most faithful things you can do.",
    },
    gallery: [
      "photo-1469571486292-0ba58a3f068b",
      "photo-1531482615713-2afd69097998",
      "photo-1528605248644-14dd04022da1",
      "photo-1491438590914-bc09fcaaf77a",
    ],
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
