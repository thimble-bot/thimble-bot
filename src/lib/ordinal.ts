const ordinal = (n: number): string => {
  if (n % 100 > 10 && n % 100 < 14) {
    return `${n}th`;
  }

  if (n % 10 === 1) {
    return `${n}st`;
  }

  if (n % 10 === 2) {
    return `${n}nd`;
  }

  if (n % 10 === 3) {
    return `${n}rd`;
  }

  return `${n}th`;
};

export default ordinal;
