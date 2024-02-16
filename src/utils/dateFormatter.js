export function dateFormatter(date) {
  const dateObject = new Date(date);

  const formattedDate = dateObject.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
}

export function dateFormatterForChat(date) {
  const dateObject = new Date(date);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC", // Adjust the timeZone according to your requirement
  };

  const formattedTime = dateObject.toLocaleTimeString("en-US", options);
  return formattedTime;
}
