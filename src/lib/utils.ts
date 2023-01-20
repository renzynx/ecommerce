export const redactEmail = (email: string) => {
  const [first, last] = email.split("@");
  const firstRedacted = first.slice(0, 2) + "****";
  return `${firstRedacted}@${last}`;
};

export const formatFirebaseError = (error: string) => {
  return (
    error
      .split(":")[1]
      .trim()
      .replace(/auth\/\w+(-\w+)?|(\(\w+\))/g, "")
      .trim()
      .replace(/(\(|\)|\.)/g, "")
      .trim() + "."
  );
};

export const fetcher = (...args: unknown[]) =>
  // @ts-ignore
  fetch(...args).then((res) => res.json());
