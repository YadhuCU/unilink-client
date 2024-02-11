export function dateFormatter(date) {
  const dateObject = new Date(date);

  const formattedDate = dateObject.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
}
