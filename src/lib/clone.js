function recurse (src) {
  if (src === null || typeof src !== 'object') {
    return src;
  }

  if (Array.isArray(src)) {
    return src.map(recurse);
  }

  const dest = {};

  for (const k in src) {
    if (src.hasOwnProperty(k)) {
      dest[k] = recurse(src[k]);
    }
  }

  return dest;
}

export default function (obj) {
  return recurse(obj);
}
