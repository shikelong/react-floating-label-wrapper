/**
 * memoize passed function to avoid duplicate calls
 * @param func
 * @returns
 */
export function memoize(func: Function) {
  const cache = new Map();
  return function (...args: unknown[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(Function, args);
    cache.set(key, result);
    return result;
  };
}
