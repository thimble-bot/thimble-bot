const truncate = (str: string, length: number) => {
  return str.length - 3 > length
    ? `${str.slice(0, length)}...`
    : str;
};

export default truncate;
