export const warning = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(message);
  }
  console.error(message);
};
