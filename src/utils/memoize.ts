/**
 * memoize passed function to avoid duplicate calls
 * only support single argument function
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
    const result = func.call(Function, args);
    cache.set(key, result);
    return result;
  };
}
