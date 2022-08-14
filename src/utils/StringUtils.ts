/**
 * ex. "abcdefghi" -> "abc..."
 */
export function shortenString(value: string, maxSize: number) {
  if (value.length > maxSize) {
    return value.slice(0, maxSize) + "...";
  } else {
    return value;
  }
}
