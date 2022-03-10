export function currency(num) {
  return `${parseInt(num, 10).toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

export function datefilter(time) {
  return new Date(time * 1000).toLocaleDateString();
}
