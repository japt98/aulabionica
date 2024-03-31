export function sleep(seconds: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve(null), 1000 * seconds);
  });
}
