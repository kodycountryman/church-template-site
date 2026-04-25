// Seed people, households, attendance, teams, and schedule for the demo CMS.
// Realistic enough to look like a real church database.

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string; // ISO date
  photo: string;
  householdId: string;
  memberSince: string; // ISO date
  status: "Member" | "Regular" | "Guest" | "Child";
  tags: string[];
  groups: string[]; // ministry slugs
  campus: string;
  notes: string;
};

export type Household = {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  primaryEmail: string;
  primaryPhone: string;
};

export type AttendanceRecord = {
  id: string;
  personId: string;
  date: string; // ISO date (Sunday)
  service: "9 AM" | "11 AM" | "Wed Night" | "Event";
  eventName?: string;
  room?: string;
  checkedInBy?: string; // for kids
  checkedOutAt?: string;
};

export type Team = {
  id: string;
  name: string;
  description: string;
  color: string; // hex
  positions: string[];
};

export type ScheduleAssignment = {
  id: string;
  weekDate: string; // ISO date (Sunday)
  teamId: string;
  position: string;
  personId: string;
  status: "Confirmed" | "Pending" | "Declined";
};

const FIRST = ["Mara", "Daniel", "Priya", "Marcus", "Hannah", "Owen", "Sam", "Eli", "Noah", "Ava", "Liam", "Mia", "Theo", "Iris", "Jude", "Cora", "Felix", "Nora", "Levi", "Ruby", "Asher", "Lila", "Caleb", "Maya", "Silas", "Beth", "Jonah", "Esme", "Ezra", "Wren", "Otto", "Hattie", "Bennett", "Clara", "Henry", "June", "Wyatt", "Anna", "Charlie", "Eve", "Jack", "Tess", "Miles", "Lucy", "Rhys", "Ada"];
const LAST = ["Eldridge", "Kim", "Anand", "Hill", "Brooks", "Park", "Whitfield", "Mendez", "Levy", "Anderson", "Patel", "Carter", "Rivera", "Brooks", "Reyes", "Soto", "Holm", "Foster", "Webb", "Bailey", "Cole", "Doyle"];

const PHOTOS = [
  "1494790108377-be9c29b29330", "1507003211169-0a1dd7228f2d", "1573497019940-1c28c88b4f3e", "1500648767791-00dcc994a43e", "1531746020798-e6953c6e8e04", "1472099645785-5658abf4ff4e", "1438761681033-6461ffad8d80", "1502685104226-ee32379fefbe", "1517841905240-472988babdf9", "1539571696357-5a69c17a67c6", "1554151228-14d9def656e4", "1488161628813-04466f872be2", "1512288094938-363287817259", "1568585219057-9206ee93b81a", "1521119989659-a83eee488004", "1463453091185-61582044d556", "1614289371518-722f2615943d", "1500648767791-00dcc994a43e", "1527980965255-d3b416303d12", "1542327897-d73f4005b533", "1545167622-3a6ac756afa4", "1581281863883-2469417a1668", "1499714608240-22fc6ad53fb2", "1502823403499-6ccfcf4fb453", "1488426862026-3ee34a7d66df",
];

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`;

const ALL_TAGS = ["Member", "New believer", "Volunteer", "Leadership", "First-time guest", "Newcomer class", "Baptized", "Marriage prep", "Care recipient", "Long-time member"];
const GROUPS = ["small-groups", "kids", "students", "outreach", "worship", "care"];

function rand<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function id() {
  return Math.random().toString(36).slice(2, 10);
}
function date(daysAgo: number) {
  return new Date(Date.now() - daysAgo * 86400_000).toISOString().slice(0, 10);
}

export function seedHouseholdsAndPeople(): { households: Household[]; people: Person[] } {
  const households: Household[] = [];
  const people: Person[] = [];

  // 18 households, 35-50 people total mix of singles/couples/families
  const lastNames = LAST.slice(0, 18);
  const firstNames = [...FIRST];
  let firstIdx = 0;
  let photoIdx = 0;

  lastNames.forEach((surname, i) => {
    const hid = `h${i + 1}`;
    const householdName = `The ${surname}s`;
    const street = ["Carver", "Main", "Oak", "Elm", "Cedar", "Pine", "Howe", "Maple", "Stone"][i % 9];
    const number = 100 + i * 13;
    const household: Household = {
      id: hid,
      name: householdName,
      addressLine1: `${number} ${street} Street`,
      addressLine2: "Greenville, SC 29601",
      primaryEmail: `${surname.toLowerCase()}@example.com`,
      primaryPhone: `(864) 555-0${(100 + i).toString().padStart(3, "0")}`,
    };
    households.push(household);

    const compositionRoll = Math.random();
    let composition: "single" | "couple" | "family";
    if (compositionRoll < 0.25) composition = "single";
    else if (compositionRoll < 0.5) composition = "couple";
    else composition = "family";

    const adults = composition === "single" ? 1 : 2;
    const kids = composition === "family" ? 1 + Math.floor(Math.random() * 3) : 0;

    for (let a = 0; a < adults; a++) {
      const fn = firstNames[firstIdx++ % firstNames.length];
      const dobYear = 1968 + Math.floor(Math.random() * 30);
      people.push({
        id: id(),
        firstName: fn,
        lastName: surname,
        email: `${fn.toLowerCase()}.${surname.toLowerCase()}@example.com`,
        phone: household.primaryPhone,
        dob: `${dobYear}-0${1 + Math.floor(Math.random() * 9)}-1${Math.floor(Math.random() * 9)}`,
        photo: u(PHOTOS[photoIdx++ % PHOTOS.length]),
        householdId: hid,
        memberSince: date(60 + Math.floor(Math.random() * 1500)),
        status: Math.random() > 0.2 ? "Member" : "Regular",
        tags: Math.random() > 0.5 ? [rand(ALL_TAGS)] : Math.random() > 0.3 ? [rand(ALL_TAGS), rand(ALL_TAGS)] : [],
        groups: Math.random() > 0.4 ? [rand(GROUPS)] : [],
        campus: "Greenville",
        notes: "",
      });
    }

    for (let k = 0; k < kids; k++) {
      const fn = firstNames[firstIdx++ % firstNames.length];
      const dobYear = 2014 + Math.floor(Math.random() * 11);
      people.push({
        id: id(),
        firstName: fn,
        lastName: surname,
        email: "",
        phone: "",
        dob: `${dobYear}-0${1 + Math.floor(Math.random() * 9)}-1${Math.floor(Math.random() * 9)}`,
        photo: u(PHOTOS[photoIdx++ % PHOTOS.length]),
        householdId: hid,
        memberSince: date(60 + Math.floor(Math.random() * 1500)),
        status: "Child",
        tags: ["Kindred Kids"],
        groups: ["kids"],
        campus: "Greenville",
        notes: "",
      });
    }
  });

  return { households, people };
}

export function seedAttendance(people: Person[]): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  // last 12 Sundays
  for (let week = 0; week < 12; week++) {
    const sundayOffset = week * 7;
    for (const p of people) {
      // 65% probability of attending in any given week
      if (Math.random() > 0.35) {
        const service = Math.random() > 0.5 ? "9 AM" : "11 AM";
        records.push({
          id: id(),
          personId: p.id,
          date: date(sundayOffset),
          service: service as "9 AM" | "11 AM",
          room: p.status === "Child" ? `Kids ${["Nursery", "Preschool", "K-2", "3-5"][Math.floor(Math.random() * 4)]}` : "Sanctuary",
        });
      }
    }
  }
  return records;
}

export const TEAMS: Team[] = [
  {
    id: "t1",
    name: "Worship",
    description: "Music, audio, and stage",
    color: "#7C3AED",
    positions: ["Worship leader", "Vocalist", "Guitar", "Bass", "Drums", "Keys", "Audio engineer"],
  },
  {
    id: "t2",
    name: "Hospitality",
    description: "Greeters, ushers, coffee, welcome table",
    color: "#E0744B",
    positions: ["Greeter", "Usher", "Welcome table", "Coffee", "Parking"],
  },
  {
    id: "t3",
    name: "Kindred Kids",
    description: "Children's ministry volunteers",
    color: "#10B981",
    positions: ["Nursery (0\u20132)", "Preschool (3\u20135)", "K-2", "3-5", "Check-in"],
  },
  {
    id: "t4",
    name: "Production",
    description: "Slides, livestream, lighting",
    color: "#2563EB",
    positions: ["ProPresenter", "Livestream", "Lighting", "Camera"],
  },
];

export function seedSchedule(people: Person[]): ScheduleAssignment[] {
  const out: ScheduleAssignment[] = [];
  const adults = people.filter((p) => p.status !== "Child");
  for (let week = 0; week < 4; week++) {
    const offset = -week * 7; // future Sundays
    const sundayDate = date(offset < 0 ? offset : offset);
    for (const team of TEAMS) {
      for (const pos of team.positions.slice(0, 3 + Math.floor(Math.random() * 2))) {
        const person = adults[Math.floor(Math.random() * adults.length)];
        const statusRoll = Math.random();
        const status = statusRoll > 0.85 ? "Pending" : statusRoll > 0.95 ? "Declined" : "Confirmed";
        out.push({
          id: id(),
          weekDate: sundayDate,
          teamId: team.id,
          position: pos,
          personId: person.id,
          status,
        });
      }
    }
  }
  return out;
}
