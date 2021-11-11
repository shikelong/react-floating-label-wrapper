/**
 * memoize passed function to avoid duplicate calls
 * @param func
 * @returns
 */
export function memoize<T>(func: Function) {
  const cache = new Map();
  return function (args: T) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(Function, args);
    cache.set(key, result);
    return result;
  };
}
