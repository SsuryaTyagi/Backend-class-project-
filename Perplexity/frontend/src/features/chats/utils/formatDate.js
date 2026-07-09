/* ---------------------------------------------------------
   Formats ISO timestamps like "2026-07-05T19:13:22.870+00:00"
   (exactly what Mongoose/MongoDB returns for createdAt/updatedAt)
--------------------------------------------------------- */

export function formatTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDay(isoString) {
  const d = new Date(isoString);
  const today = new Date();
  const isToday = d.toDateString() === today.toDateString();
  if (isToday) return "Today";

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function formatFullDateTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
