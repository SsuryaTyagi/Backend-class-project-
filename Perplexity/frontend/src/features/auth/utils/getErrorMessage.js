// utils/getErrorMessage.js
export const getErrorMessages = (error, fallback = "Something went wrong") => {
  if (typeof error === "string") return [error];
  if (error?.errors?.length) return error.errors.map((e) => e.message);
  if (error?.message) return [error.message];
  return [fallback];
};