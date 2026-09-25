/** US cash session. CMC does not publish an "NYSE is open" flag. We compute it. */
const HOLIDAYS = new Set([
  "2026-01-01", "2026-01-19", "2026-02-16", "2026-04-03",
  "2026-05-25", "2026-06-19", "2026-07-03", "2026-09-07",
  "2026-11-26", "2026-12-25",
]);

export function nyParts(now = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, p.value]));
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    weekday: parts.weekday,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
    clock: `${parts.hour}:${parts.minute} ET`,
  };
}

export function sessionStatus(now = new Date()) {
  const p = nyParts(now);
  const weekend = p.weekday === "Sat" || p.weekday === "Sun";
  const holiday = HOLIDAYS.has(p.date);
  const openMins = 9 * 60 + 30;
  const closeMins = 16 * 60;
  const inWindow = p.minutes >= openMins && p.minutes < closeMins;
  const open = !weekend && !holiday && inWindow;
  let label = "Cash market open";
  if (weekend) label = "Weekend — cash market closed";
  else if (holiday) label = "US holiday — cash market closed";
  else if (p.minutes < openMins) label = "Pre-market — cash session not open yet";
  else if (p.minutes >= closeMins) label = "After hours — cash session closed";
  return { open, label, clock: p.clock, date: p.date };
}
