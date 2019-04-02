const arraySort = (lineA: string, lineB: string): number => {
  const a = lineA.trim();
  const b = lineB.trim();
  
  if (a && b) {
    return (a < b) ? -1 : 1;
  } else if (a && !b) {
    return -1;
  } else if (!a && b) {
    return 1;
  }
  return 0;
};

export const customSort = (a: string[]): string[] => {
  const b = [...a].sort(arraySort);
  const preservedNewlines: string[] = a.map((s, idx) => {
    if (s.trim() === '') {
      return '';
    }
    
    return b.shift() || '';
  });
  
  return preservedNewlines;
};

export default customSort;