export function judgeHasValue(value: any): boolean {
  let hasValue = false;
  if (value === undefined || value === null) {
    return hasValue;
  }
  if (Array.isArray(value)) {
    hasValue = value.length > 0;
  } else if (typeof value === 'object') {
    hasValue = Object.keys(value).length > 0;
  } else {
    hasValue = value !== undefined && value !== null && value !== '';
  }
  return hasValue;
}
