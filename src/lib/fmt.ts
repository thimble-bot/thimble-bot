const format = (formatString: string, ...opts: any[]) => {
  opts.forEach(opt => {
    formatString = formatString.replace('%%', `${opt}`);
  });

  return formatString;
};

export default format;
