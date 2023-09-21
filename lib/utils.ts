export function slash(x) {
  return x.charCodeAt(0) === 47 ? x : "/" + x;
}

export function getbase(x) {
  const y = x.indexOf("/", 1);
  return y > 1 ? x.substring(0, y) : x;
}
