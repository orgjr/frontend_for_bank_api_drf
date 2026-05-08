export function formatIsoDateString(date) {
  return date.split('-').reverse().join('/');
}
