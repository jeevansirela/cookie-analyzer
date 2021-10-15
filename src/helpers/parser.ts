/**
 *
 * @param dateString Query Date
 * @returns formats date first and parses it
 */
export function parseQueryDate(dateString: string): number {
  let formattedDateString = formatQueryDate(dateString);
  return parseDate(formattedDateString);
}

/**
 * Parses line
 * @param line
 * @returns  splits cookie and timestamp, converts timestamp to epoch and returns it.
 */
export function parseLine(line: string): Array<any> {
  let [word, dateString] = line.split(",").map((word) => word.trim());
  let formattedDate = parseDate(dateString);
  return [word, formattedDate];
}

/**
 * @param dateString
 * @returns adds extra padding. ex: 7 in date is converted to 07
 */
function formatQueryDate(dateString: string): string {
  return dateString
    .split("-")
    .map((string) => string.padStart(2, "0"))
    .join("-");
}

/**
 * Parses date
 * @param dateString
 * @returns time is set to 00:00:00 UTC for any day and returns epoch
 *
 */
function parseDate(dateString: string) {
  let parsedDate = new Date(dateString);
  if (JSON.stringify(parsedDate) == "null") {
    throw new Error("Invalid Query Date");
  }
  parsedDate.setUTCHours(0);
  parsedDate.setUTCMinutes(0);
  parsedDate.setUTCSeconds(0);
  parsedDate.setUTCMilliseconds(0);
  return parsedDate.getTime();
}
