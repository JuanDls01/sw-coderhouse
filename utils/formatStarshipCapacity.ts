export function formatStarshipCapacity(capacity: string): string {
  if (capacity === 'unknown') return 'Unknown';
  const num = parseInt(capacity);
  if (isNaN(num)) return capacity;
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return capacity;
}
