/* Your services throw either a string (error.message) or the
   backend's error payload (error.response.data), which may be an
   object like { message } or { error }. This normalizes all three
   into a plain string for the UI / Redux state. */
export function getErrorMessage(error, fallback = "Something went wrong") {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  return error.message || error.error || fallback;
}
