export function formatCompactNumber(n: number): string {
  if (n < 1000) {
    return n.toString();
  } else if (n < 1000000) {
    const thousands = n / 1000;
    // Show up to 2 decimal places, but remove trailing .0
    const formatted = thousands.toFixed(2);
    return formatted.endsWith('.00') 
      ? `${Math.round(thousands)}K` 
      : formatted.endsWith('0') 
        ? `${thousands.toFixed(1)}K`
        : `${formatted}K`;
  } else {
    const millions = n / 1000000;
    // Show up to 2 decimal places, but remove trailing .0
    const formatted = millions.toFixed(2);
    return formatted.endsWith('.00') 
      ? `${Math.round(millions)}M` 
      : formatted.endsWith('0') 
        ? `${millions.toFixed(1)}M`
        : `${formatted}M`;
  }
}