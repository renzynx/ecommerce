export const redactEmail = (email: string) => {
  const [first, last] = email.split("@");
  const firstRedacted = first.slice(0, 2) + "****";
  return `${firstRedacted}@${last}`;
};
