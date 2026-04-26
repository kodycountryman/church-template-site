"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  sermons as seedSermons,
  series as seedSeries,
  events as seedEvents,
  ministries as seedMinistries,
  posts as seedPosts,
  type Sermon,
  type Series,
  type Event,
  type Ministry,
  type Post,
} from "@/lib/mock";
import {
  seedHouseholdsAndPeople,
  seedAttendance,
  seedSchedule,
  TEAMS,
  type Person,
  type Household,
  type AttendanceRecord,
  type Team,
  type ScheduleAssignment,
} from "@/lib/admin/people-seed";

export type { Person, Household, AttendanceRecord, Team, ScheduleAssignment };

export type Lead = {
  id: string;
  name: string;
  email: string;
  church: string;
  role: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  createdAt: string;
  read: boolean;
};

export type RSVP = {
  id: string;
  eventSlug: string;
  name: string;
  email: string;
  party: number;
  createdAt: string;
};

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: "image" | "audio" | "video" | "doc";
  size: string;
  createdAt: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Author";
  avatar: string;
  lastActive: string;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  serviceTimes: string[];
  instagram: string;
  youtube: string;
  spotify: string;
};

export type Donation = {
  id: string;
  amount: number;
  donor: string;
  designation: string;
  frequency: "one-time" | "monthly";
  createdAt: string;
};

type State = {
  // auth
  authed: boolean;
  user: AdminUser | null;
  // resources
  sermons: Sermon[];
  series: Series[];
  events: Event[];
  ministries: Ministry[];
  posts: Post[];
  leads: Lead[];
  messages: ContactMessage[];
  rsvps: RSVP[];
  media: MediaItem[];
  users: AdminUser[];
  donations: Donation[];
  settings: SiteSettings;
  // ChMS
  people: Person[];
  households: Household[];
  attendance: AttendanceRecord[];
  teams: Team[];
  schedule: ScheduleAssignment[];
};

type Actions = {
  // auth
  login: (email: string, name?: string) => void;
  logout: () => void;
  // generic CRUD helpers
  upsertSermon: (s: Sermon) => void;
  deleteSermon: (slug: string) => void;
  upsertEvent: (e: Event) => void;
  deleteEvent: (slug: string) => void;
  upsertMinistry: (m: Ministry) => void;
  deleteMinistry: (slug: string) => void;
  upsertPost: (p: Post) => void;
  deletePost: (slug: string) => void;
  // submissions
  addLead: (l: Omit<Lead, "id" | "createdAt" | "read">) => void;
  markLeadRead: (id: string) => void;
  deleteLead: (id: string) => void;
  addMessage: (m: Omit<ContactMessage, "id" | "createdAt" | "read">) => void;
  markMessageRead: (id: string) => void;
  // settings
  updateSettings: (patch: Partial<SiteSettings>) => void;
  // people
  upsertPerson: (p: Person) => void;
  deletePerson: (id: string) => void;
  // check-in
  checkInPerson: (personId: string, payload: { service: AttendanceRecord["service"]; eventName?: string; room?: string; checkedInBy?: string }) => void;
  checkOutPerson: (recordId: string) => void;
  // schedule
  updateAssignmentStatus: (id: string, status: ScheduleAssignment["status"]) => void;
  // demo helpers
  reset: () => void;
};

const seedMedia: MediaItem[] = [
  ...seedSermons.slice(0, 4).map((s, i) => ({
    id: `m${i}`,
    name: s.title.toLowerCase().replace(/\s+/g, "-") + ".jpg",
    url: s.cover,
    type: "image" as const,
    size: "1.2 MB",
    createdAt: s.date,
  })),
  ...seedEvents.slice(0, 3).map((e, i) => ({
    id: `me${i}`,
    name: e.slug + ".jpg",
    url: e.cover,
    type: "image" as const,
    size: "0.9 MB",
    createdAt: new Date(e.starts).toLocaleDateString(),
  })),
];

const seedUsers: AdminUser[] = [
  {
    id: "u1",
    name: "James Eldridge",
    email: "mara@kindred.church",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    lastActive: "2 minutes ago",
  },
  {
    id: "u2",
    name: "Daniel Kim",
    email: "daniel@kindred.church",
    role: "Editor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    lastActive: "1 hour ago",
  },
  {
    id: "u3",
    name: "Priya Anand",
    email: "priya@kindred.church",
    role: "Editor",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
    lastActive: "Yesterday",
  },
  {
    id: "u4",
    name: "Owen Park",
    email: "owen@kindred.church",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    lastActive: "3 days ago",
  },
];

function generateDonations(): Donation[] {
  const donors = ["Anonymous", "Sam E.", "J. Whitfield", "Clara M.", "Anonymous", "Hadley P.", "Mike & Jen", "Anonymous", "T. Brooks", "Kennedy R."];
  const designations = ["General fund", "Local outreach", "Refugee resettlement", "Partner schools"];
  const out: Donation[] = [];
  const now = Date.now();
  for (let i = 0; i < 60; i++) {
    const days = Math.floor(Math.random() * 60);
    const date = new Date(now - days * 86400_000);
    out.push({
      id: `d${i}`,
      amount: [25, 50, 100, 100, 250, 500, 1000][Math.floor(Math.random() * 7)],
      donor: donors[Math.floor(Math.random() * donors.length)],
      designation: designations[Math.floor(Math.random() * designations.length)],
      frequency: Math.random() > 0.4 ? "monthly" : "one-time",
      createdAt: date.toISOString(),
    });
  }
  return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

const seedSettings: SiteSettings = {
  name: "Kindred",
  tagline: "A place to belong before you believe.",
  email: "hello@kindred.church",
  phone: "(864) 555-0142",
  addressLine1: "412 Carver Street",
  addressLine2: "Greenville, SC 29601",
  serviceTimes: ["Sunday · 9:00 AM", "Sunday · 11:00 AM"],
  instagram: "https://instagram.com/kindredchurch",
  youtube: "https://youtube.com/@kindredchurch",
  spotify: "https://open.spotify.com/show/kindredchurch",
};

const seedMessages: ContactMessage[] = [
  {
    id: "msg1",
    name: "Erin Park",
    email: "erin.park@example.com",
    subject: "First-time visit",
    body: "Hi! My family and I are planning to visit this Sunday. We have a 4-year-old and a 7-year-old — anything we should know about kids check-in?",
    createdAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
    read: false,
  },
  {
    id: "msg2",
    name: "Marcus Thompson",
    email: "mthompson@example.com",
    subject: "Small group inquiry",
    body: "Looking for a small group on the east side. Are there any with openings?",
    createdAt: new Date(Date.now() - 26 * 3600_000).toISOString(),
    read: false,
  },
  {
    id: "msg3",
    name: "Hannah Levy",
    email: "h.levy@example.com",
    subject: "Volunteering",
    body: "I'd love to get involved with the refugee resettlement work. I have a background in social work.",
    createdAt: new Date(Date.now() - 3 * 86400_000).toISOString(),
    read: true,
  },
  {
    id: "msg4",
    name: "Anonymous",
    email: "anon@example.com",
    subject: "Prayer request",
    body: "My dad was just diagnosed. Asking for prayer. Thanks.",
    createdAt: new Date(Date.now() - 5 * 86400_000).toISOString(),
    read: true,
  },
];

const seedRsvps: RSVP[] = [
  { id: "r1", eventSlug: "easter-sunday", name: "The Eldridge family", email: "sam.e@example.com", party: 4, createdAt: new Date(Date.now() - 86400_000).toISOString() },
  { id: "r2", eventSlug: "neighborhood-block-party", name: "James Whitfield", email: "jw@example.com", party: 2, createdAt: new Date(Date.now() - 2*86400_000).toISOString() },
  { id: "r3", eventSlug: "membership-class", name: "Clara Mendez", email: "clara.m@example.com", party: 1, createdAt: new Date(Date.now() - 3*86400_000).toISOString() },
  { id: "r4", eventSlug: "kids-summer-camp", name: "The Brooks family", email: "tbrooks@example.com", party: 3, createdAt: new Date(Date.now() - 4*86400_000).toISOString() },
];

const initial: State = {
  authed: false,
  user: null,
  sermons: seedSermons,
  series: seedSeries,
  events: seedEvents,
  ministries: seedMinistries,
  posts: seedPosts,
  leads: [],
  messages: seedMessages,
  rsvps: seedRsvps,
  media: seedMedia,
  users: seedUsers,
  donations: generateDonations(),
  settings: seedSettings,
  ...(() => {
    const { households, people } = seedHouseholdsAndPeople();
    return {
      people,
      households,
      attendance: seedAttendance(people),
      teams: TEAMS,
      schedule: seedSchedule(people),
    };
  })(),
};

const id = () => Math.random().toString(36).slice(2, 10);

export const useAdminStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initial,

      login: (email, name) =>
        set({
          authed: true,
          user: {
            id: "demo",
            name: name || email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase()) || "Demo User",
            email,
            role: "Admin",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
            lastActive: "Just now",
          },
        }),

      logout: () => set({ authed: false, user: null }),

      upsertSermon: (s) =>
        set((st) => {
          const idx = st.sermons.findIndex((x) => x.slug === s.slug);
          if (idx >= 0) {
            const next = [...st.sermons];
            next[idx] = s;
            return { sermons: next };
          }
          return { sermons: [s, ...st.sermons] };
        }),
      deleteSermon: (slug) =>
        set((st) => ({ sermons: st.sermons.filter((s) => s.slug !== slug) })),

      upsertEvent: (e) =>
        set((st) => {
          const idx = st.events.findIndex((x) => x.slug === e.slug);
          if (idx >= 0) {
            const next = [...st.events];
            next[idx] = e;
            return { events: next };
          }
          return { events: [e, ...st.events] };
        }),
      deleteEvent: (slug) =>
        set((st) => ({ events: st.events.filter((e) => e.slug !== slug) })),

      upsertMinistry: (m) =>
        set((st) => {
          const idx = st.ministries.findIndex((x) => x.slug === m.slug);
          if (idx >= 0) {
            const next = [...st.ministries];
            next[idx] = m;
            return { ministries: next };
          }
          return { ministries: [m, ...st.ministries] };
        }),
      deleteMinistry: (slug) =>
        set((st) => ({ ministries: st.ministries.filter((m) => m.slug !== slug) })),

      upsertPost: (p) =>
        set((st) => {
          const idx = st.posts.findIndex((x) => x.slug === p.slug);
          if (idx >= 0) {
            const next = [...st.posts];
            next[idx] = p;
            return { posts: next };
          }
          return { posts: [p, ...st.posts] };
        }),
      deletePost: (slug) =>
        set((st) => ({ posts: st.posts.filter((p) => p.slug !== slug) })),

      addLead: (l) =>
        set((st) => ({
          leads: [
            { ...l, id: id(), createdAt: new Date().toISOString(), read: false },
            ...st.leads,
          ],
        })),
      markLeadRead: (id) =>
        set((st) => ({ leads: st.leads.map((l) => (l.id === id ? { ...l, read: true } : l)) })),
      deleteLead: (id) =>
        set((st) => ({ leads: st.leads.filter((l) => l.id !== id) })),

      addMessage: (m) =>
        set((st) => ({
          messages: [
            { ...m, id: id(), createdAt: new Date().toISOString(), read: false },
            ...st.messages,
          ],
        })),
      markMessageRead: (id) =>
        set((st) => ({
          messages: st.messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
        })),

      updateSettings: (patch) =>
        set((st) => ({ settings: { ...st.settings, ...patch } })),

      upsertPerson: (p) =>
        set((st) => {
          const idx = st.people.findIndex((x) => x.id === p.id);
          if (idx >= 0) {
            const next = [...st.people];
            next[idx] = p;
            return { people: next };
          }
          return { people: [p, ...st.people] };
        }),
      deletePerson: (pid) =>
        set((st) => ({ people: st.people.filter((p) => p.id !== pid) })),

      checkInPerson: (personId, payload) =>
        set((st) => ({
          attendance: [
            {
              id: id(),
              personId,
              date: new Date().toISOString().slice(0, 10),
              service: payload.service,
              eventName: payload.eventName,
              room: payload.room,
              checkedInBy: payload.checkedInBy,
            },
            ...st.attendance,
          ],
        })),
      checkOutPerson: (recordId) =>
        set((st) => ({
          attendance: st.attendance.map((a) =>
            a.id === recordId ? { ...a, checkedOutAt: new Date().toISOString() } : a,
          ),
        })),

      updateAssignmentStatus: (aid, status) =>
        set((st) => ({
          schedule: st.schedule.map((a) => (a.id === aid ? { ...a, status } : a)),
        })),

      reset: () => set(initial),
    }),
    {
      name: "kindred-admin-store-v2",
      storage: createJSONStorage(() => sessionStorage),
      // session storage so refresh keeps state, new tab/session gets a fresh demo
    },
  ),
);
