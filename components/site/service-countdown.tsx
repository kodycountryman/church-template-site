"use client";

import { useEffect, useState } from "react";

function getNextService(): Date {
  // Next Sunday at 9:00 AM local time
  const now = new Date();
  const next = new Date(now);
  const day = now.getDay(); // 0 = Sunday
  const daysUntilSunday = day === 0 ? 7 : 7 - day;
  next.setDate(now.getDate() + daysUntilSunday);
  next.setHours(9, 0, 0, 0);
  // If it's Sunday and service hasn't started yet, use today
  if (day === 0 && now.getHours() < 9) {
    next.setDate(now.getDate());
    next.setHours(9, 0, 0, 0);
  }
  return next;
}

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ServiceCountdown() {
  const [target] = useState(getNextService);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "days", value: timeLeft.days },
    { label: "hrs", value: timeLeft.hours },
    { label: "min", value: timeLeft.minutes },
    { label: "sec", value: timeLeft.seconds },
  ];

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
        Next service
      </span>
      <span className="h-3 w-px bg-white/15" />
      <div className="flex items-center gap-3">
        {units.map(({ label, value }, i) => (
          <div key={label} className="flex items-baseline gap-1">
            {i > 0 && (
              <span className="text-xs font-light text-white/25 -ml-2">:</span>
            )}
            <span className="text-sm font-semibold tabular-nums text-white">
              {pad(value)}
            </span>
            <span className="text-[10px] text-white/40">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
